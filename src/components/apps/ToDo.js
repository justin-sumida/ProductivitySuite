import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase/firebase';
import { useAuth } from '../../contexts/AuthContext';

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
            console.log(snapshot.docs.map(doc => doc.data()));
            setTodos(snapshot.docs.map(doc => doc.data()))
        });
        return () => unsubscribe();
    }, []);

    const addTodo = event => {
        event.preventDefault();
        var due = new Date(dateRef.current.value);
        var timestamp = due.getTime()
        db.collection('todo').add({
            description: descriptionRef.current.value,
            dueOn: timestamp,
            todo: todoRef.current.value,
            userId: currentUser._delegate.uid
        })
    }

    return (
        <div>
            <label>To Do Title</label>
            <input ref={todoRef} type="text" />
            <label>Description (optional)</label>
            <input ref={descriptionRef} type="text" />
            <label>Due On</label>
            <input ref={dateRef} type="date"></input>
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {todos.map(todo => (
                    <li>{todo.todo}{todo.dueOn}</li>
                ))}
            </ul>
        </div>
    );
}
export default ToDo;