import { GET_USER_VOTES,
    GET_TOTAL_VOTES,
    CLEAR_VOTES,
    SET_VOTE,
    Entity,
    Entities,
    VoteDispatchTypes,
    DELETE_VOTE,
    LOAD_VOTE
    } from '../types';

export interface VoteState {
    entities: Entities
}

const initialState: VoteState = {
    entities: {}
}

//variables to store values
let currEntities:Entities = {};
let currentVotes:number;
let categoryKey:string;
let entityKey: string;
let votechange: number;
let payload: Entity;

export const voteReducer = (state:VoteState = initialState, action: VoteDispatchTypes) : VoteState => {
    switch(action.type) {
        //Store users votes
        case GET_USER_VOTES:
            payload = action.payload.entity; 
            categoryKey = payload.categoryKey;
            entityKey = payload.entityKey;
            currEntities = state.entities;

            if(currEntities[categoryKey])
            {
                currentVotes  = currEntities[categoryKey][entityKey].votes;
                currEntities[categoryKey][entityKey] = {vote: payload.vote, vote_id: payload.vote_id, votes: currentVotes, isloading: payload.isloading}
                console.log(currEntities);
            }
            return{
                ...state,
                entities: currEntities
            }
        //store total votes of entity
        case GET_TOTAL_VOTES:
            return{
                ...state,
                entities: action.payload.entities
            }
        //Store user new vote
        case SET_VOTE:
            payload = action.payload.entity; 
            categoryKey = payload.categoryKey;
            entityKey = payload.entityKey;
            currEntities = state.entities;
            votechange = 0;

            if(currEntities[categoryKey])
            {
                console.log(5);
                currentVotes  = currEntities[categoryKey][entityKey].votes;
                if(currEntities[categoryKey][entityKey].vote !== undefined)
                {
                    console.log(6)
                    if(currEntities[categoryKey][entityKey].vote !== payload.vote)
                    {
                        votechange = payload.vote ? 2 : -2
                        console.log(7)
                    }
                }
                else
                {
                    votechange = payload.vote ? 1 : -1
                }
                currEntities[categoryKey][entityKey] = {vote: payload.vote, vote_id: payload.vote_id, votes: currentVotes+votechange, isloading: payload.isloading}
            }

            return{
                ...state,
                entities: currEntities
            }
        //Delete users vote from entity list
        case DELETE_VOTE:
            payload = action.payload.entity; 
            categoryKey = payload.categoryKey;
            entityKey = payload.entityKey;
            currEntities = state.entities;

            if(currEntities[categoryKey])
            {
                currentVotes  = currEntities[categoryKey][entityKey].votes;
                if(currEntities[categoryKey][entityKey].vote !== undefined)
                {
                    votechange = currEntities[categoryKey][entityKey].vote ? -1 : 1
                }
                currEntities[categoryKey][entityKey] = {votes: currentVotes+votechange, isloading: false}
            }

            return{
                ...state,
                entities: currEntities
            }
        //Start load of entity
        case LOAD_VOTE:
            payload = action.payload.entity; 
            categoryKey = payload.categoryKey;
            entityKey = payload.entityKey;
            currEntities = state.entities;

            if(currEntities[categoryKey])
            {
                currEntities[categoryKey][entityKey] = {...currEntities[categoryKey][entityKey], isloading: payload.isloading}
            }

            return{
                ...state,
                entities: currEntities
            }
        //clear all users votes    
        case CLEAR_VOTES:
            return {
                ...state,
                entities: {}
            }
        default:
            return state;
    }
}