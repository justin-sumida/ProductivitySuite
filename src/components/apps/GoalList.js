import React from 'react';
import { Icon } from 'semantic-ui-react';
import { db } from '../firebase/firebase';
import { useAuth } from '../../contexts/AuthContext';
import './ItemSegment.css';

const GoalList = (props) => {
    if(props.goal){
        return (
            <div key={props.goal.id} className="ui item segment">
                <div className="content">
                    <div className="header">{props.goal.goals.goal}</div>
                    <div className="description">{props.goal.goals.description}</div>
                    <div className="extra">
                        <Icon link onClick={e => {db.collection('goals').doc(props.goal.id).delete()}} name="red trash alternate outline" />
                        <div className="ui label blue">Priority Level {props.goal.goals.priority}</div>
                    </div>
                </div>
            </div>
        )
    }
    return null;
};

export default GoalList;