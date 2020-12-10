import axios from 'axios';
import { Auth } from "aws-amplify";

import { VoteDispatchTypes, DELETE_VOTE, GET_USER_VOTES, GET_TOTAL_VOTES, SET_VOTE, Entities, Entity, LOAD_VOTE } from '../types';
import { Dispatch } from "redux";

//voting on type
type votingOn = {
    category: string
    entity: string
}

//check users vote on list of items
export const checkVotes = (votingList: Array<votingOn>,dispatch: Dispatch<VoteDispatchTypes>) => {
    console.log(votingList);
    try {
        //if user is logged in
        Auth.currentSession().then(async(res)=>{
            let accessToken = res.getAccessToken()

            //get list of user votes
            let headers = {
                params: {
                    votingList: JSON.stringify(votingList)
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JSON.stringify(accessToken)
                }
            }

            const resp = await axios.get('https://4hrtvswcwc.execute-api.us-east-1.amazonaws.com/stage/vote',headers);
            const listRes = JSON.parse(resp.data.body);

            //if list of user votes is not empty add data to existing vote store data
            if(listRes[0].length != 0)
            {
                console.log(41);
                for(let x of listRes)
                {
                    if(x[0])
                    {
                        dispatch({
                            type: GET_USER_VOTES,
                            payload: {
                                entity: {entityKey: x[0].entity['S'], categoryKey: x[0].category['S'] ,vote: x[0].vote['BOOL'], vote_id: x[0].vote_id['S'], isloading: false}        
                            }
                        });
                    }
                    
                }
            }
            else
            {
                console.log(42);
                //stop loading vote field
                for(let x of votingList)
                {
                    dispatch({
                        type: LOAD_VOTE,
                        payload: {
                            entity: {entityKey: x.entity, categoryKey: x.category, isloading: false}        
                        }
                    });
                }
            }
        });
    }
    catch(err) 
    {
        console.log(err);
    }
}

// get total votes for list of items
export const getVotes = (votingList: Array<votingOn>) => async(dispatch: Dispatch<VoteDispatchTypes>) => {
    //start vote loading
    for(let x of votingList)
    {
        dispatch({
            type: LOAD_VOTE,
            payload: {
                entity: {entityKey: x.entity, categoryKey: x.category, isloading: true}
            }
        });
    }
    try {
        //get list of votes for entities
        let headers = {
            params: {
                votingList: JSON.stringify(votingList)
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const resp = await axios.get('https://4hrtvswcwc.execute-api.us-east-1.amazonaws.com/stage/votes',headers);
        const listRes = JSON.parse(resp.data.body);
        const allVotes:Entities = {}

        //format returned data
        for(let x of listRes)
        {
            if (!(x.category in allVotes))
            {
                allVotes[x.category] = {}
            }
            allVotes[x.category][x.entity] = {votes: x.Count, isloading: true}
        }

        //get users votes after storing returned data
        getVotesDisp(allVotes, dispatch).then(() => {
            checkVotes(votingList, dispatch);
        });
    }
    catch(err) 
    {
        //if error and loading
        for(let x of votingList)
        {
            dispatch({
                type: LOAD_VOTE,
                payload: {
                    entity: {categoryKey: x.category, entityKey: x.entity, isloading: false}
                }
            });
        }

        console.log(err);
    }
}

//store list of votes for entities and resolve when done
const getVotesDisp = (allVotes: Entities, dispatch: Dispatch<VoteDispatchTypes>) => new Promise((resolve, reject) => {
    dispatch({
        type: GET_TOTAL_VOTES,
        payload: {
            entities: allVotes
        }
    });
    resolve();
});


// set users vote on item
export const setVote = (vote: boolean, category: string, entity: string) => async(dispatch: Dispatch<VoteDispatchTypes>) => {
    //start vote loading
    dispatch({
        type: LOAD_VOTE,
        payload: {
            entity: {entityKey: entity, categoryKey: category, isloading: true}
        }
    });
    
    try {
        //send user vote to database
        let data = {
            vote: vote,
            entity: entity,
            category: category
        }

        Auth.currentSession().then(async(res)=>{
            let accessToken = res.getAccessToken()

            let headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JSON.stringify(accessToken)
                }
            }

            const resp = await axios.post('https://4hrtvswcwc.execute-api.us-east-1.amazonaws.com/stage/vote',data,headers);            

            const results = JSON.parse(resp.data.body);

            //if vote is deleted in database reflect changes in redux store
            if(resp.data.statusCode === 204)
            {
                const retVote:Entity = {
                    categoryKey: category,
                    entityKey: entity,
                    isloading: false
                }

                dispatch({
                    type: DELETE_VOTE,
                    payload: {
                        entity: retVote
                    }
                });
            }
            //if user vote successfully store in database reflect changes in redux store
            else
            {
                const retVote:Entity = {
                    vote: results.vote.BOOL, 
                    vote_id: results.vote_id.S,
                    categoryKey: results.category.S,
                    entityKey: results.entity.S,
                    isloading: false
                }


                dispatch({
                    type: SET_VOTE,
                    payload: {
                        entity: retVote
                    }
                });
            }
        })
    }
    catch(err) 
    {
        console.log(err);
    }
}