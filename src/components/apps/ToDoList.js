import React from "react";
import { db } from "../firebase/firebase";
import { List } from 'semantic-ui-react';
import { useAuth } from '../../contexts/AuthContext';

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
            <List>
            <List.Item key={props.todo.id}>
                <List.Icon link onClick={updateTodo} name={`${props.todo.todo.isComplete ? 'check circle green' : 'circle outline'} `} />
                <List.Icon link onClick={event => {db.collection('todo').doc(props.todo.id).delete()}} name='trash alternate outline red' />
                <List.Content>
                    <List.Header>{props.todo.todo.todo}</List.Header>
                </List.Content>
                <List.Description>
                    {props.todo.todo.description} 
                    Due On: {convertDate(props.todo.todo.dueOn)}
                </List.Description>
                <List.Icon name="edit outline icon" />
            </List.Item>
            </List>
        );
    }
    return null;
    
};

export default ToDoList;