import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase/firebase';
import { useAuth } from '../../contexts/AuthContext';
import ToDoList from './ToDoList';
import './ToDo.css'

const ToDo = () => {
    const { currentUser } = useAuth();
    const todoRef = useRef();
    const descriptionRef = useRef();
    const dateRef = useRef();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        var query = db.collection('todo');
        query = query.where('userId', "==", currentUser._delegate.uid);
        query = query.orderBy('dueOn', 'asc');
        const unsubscribe = query.onSnapshot(snapshot => {
            console.log(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data()})));
            setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data()})));
        });
        return () => unsubscribe();
    }, []);

    const addTodo = event => {
        event.preventDefault();
        var due = new Date(dateRef.current.value);
        var timestamp = due.getTime() + (due.getTimezoneOffset() * 60000);
        db.collection('todo').add({
            description: descriptionRef.current.value,
            dueOn: timestamp,
            todo: todoRef.current.value,
            userId: currentUser._delegate.uid,
            isComplete: false
        });
        todoRef.current.value = "";
        dateRef.current.value="";
        descriptionRef.current.value="";
    }
   
    return (
        <div className="form element">
            <div className="ui form">
                <label>To Do Title</label>
                <input ref={todoRef} type="text" />
                <label>Description (optional)</label>
                <input ref={descriptionRef} type="text" />
                <label>Due On</label>
                <input ref={dateRef} type="date"></input>
                <button className="ui button primary" onClick={addTodo}>Add Todo</button>
            </div>
            {todos.map(todo => (
                <ToDoList todo={todo} />
            ))}
        </div>
    );
}
export default ToDo;