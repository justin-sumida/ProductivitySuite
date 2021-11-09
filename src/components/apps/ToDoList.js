import React from "react";
import { db } from "../firebase/firebase";
import { Icon } from 'semantic-ui-react';
import { useAuth } from '../../contexts/AuthContext';
import './ItemSegment.css';

const ToDoList = (props) => {
    const { currentUser } = useAuth();
    const convertDate = unixTime => {
        var s= new Date(unixTime).toLocaleDateString("en-us");
        return s;
    }
    const updateTodo = () => {
        db.collection('todo').doc(props.todo.id).set({
            todo: props.todo.todo.todo,
            description: props.todo.todo.description,
            dueOn: props.todo.todo.dueOn,
            userId: currentUser._delegate.uid,
            isComplete: !props.todo.todo.isComplete
        })
    }
    if(props.todo){
        return (
            <div key={props.todo.id} className="ui item segment">
                <div className="content">
                <div className="header">{props.todo.todo.todo}</div>
                <div className="description">
                    <p>{props.todo.todo.description}</p>
                </div>
                <div className="extra">
                    <Icon link onClick={updateTodo} name={`${props.todo.todo.isComplete ? 'check circle green icon': 'circle outline icon'}`}></Icon>
                    <Icon link onClick={event => {db.collection('todo').doc(props.todo.id).delete()}} name="trash alternate outline red icon"></Icon>
                    <div className="ui label">Due On: {convertDate(props.todo.todo.dueOn)} </div>
                    
                </div>
                </div>
                <div className="ui horizontal divider"></div>
            </div>
            
        );
    }
    return null;
    
};

export default ToDoList;