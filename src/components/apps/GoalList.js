import React from 'react';
import { Icon } from 'semantic-ui-react';
import { db } from '../firebase/firebase';
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
                        <Icon link onClick={() => props.editMode(props.goal)} name="edit icon"></Icon>
                        <div className="ui label blue">{props.goal.goals.priority !== '0' ? 'Priority Level ' + props.goal.goals.priority : ''}</div>
                    </div>
                </div>
            </div>
        )
    }
    return null;
};

export default GoalList;