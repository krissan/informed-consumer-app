import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { setVote } from "../../store/vote/vote";

import { RootStore } from '../../store/store';

import './Misc.css';

type VoteButton = {
    icon?: string
    imgAltText?: string
    entityKey: string
    categoryKey: string
    vote: boolean | undefined
    vote_id: string | undefined
    isloading: boolean
}

const VoteButton: React.FC<VoteButton> = ({isloading, vote, vote_id, entityKey, categoryKey, icon, imgAltText}) => {
    //Hooks
    const dispatch = useDispatch();
    const voteState = useSelector((state: RootStore) => state.vote);

    //up vote or down vote entity
    const setVoteClick = (votePress:boolean) => {
        dispatch(setVote(votePress, categoryKey, entityKey));
    }

    return (
        <div className="voteButton">
                {
                !isloading ?
                    <div className="votePointers" id={vote_id}>
                        {/* Total votes */}
                        <div className="voteCount">{voteState.entities[categoryKey][entityKey].votes}</div>
                        {/* Up vote and down vote buttons */}
                        <div className="voteIcon">
                            <i onClick={() => setVoteClick(true)} className={"far fa-arrow-alt-circle-up " + ((typeof vote !== 'undefined' && vote === true) ? 'selectedUp' : 'up')}></i>
                            <i onClick={() => setVoteClick(false)} className={"far fa-arrow-alt-circle-down " + ((typeof vote !== 'undefined' && vote === false) ? 'selectedDown' : 'down')}></i>
                        </div>
                    </div>
                :
                    <div className="voteRefresh">
                        <i className="fa fa-refresh fa-spin"></i>
                    </div>
                }
                {/* Vote entity image */}
                {icon ? 
                    <div className = 'voteImgHolder'>
                        <img src={icon} alt={imgAltText} className="voteImg"></img>
                    </div>
                    :
                    ''
                }
        </div>
    );
}

export default VoteButton;