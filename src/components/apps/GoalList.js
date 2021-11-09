import React from 'react';
import { db } from '../firebase/firebase';
import { useAuth } from '../../contexts/AuthContext';
import './ItemSegment.css';

const GoalList = (props) => {
    console.log("hi!");
    if(props.goal){
        return (
            <div key={props.goal.id} className="ui item segment">
                <div className="content">
                    <div className="header">{props.goal.goals.goal}</div>
                    <div className="description">{props.goal.goals.description}</div>
                    <div className="extra">
                        <div className="ui label blue">Priority Level {props.goal.goals.priority}</div>
                    </div>
                </div>
            </div>
        )
    }
    return <div>testing</div>;
};

export default GoalList;