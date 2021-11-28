import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase/firebase';
import { Icon } from 'semantic-ui-react';
import { useAuth } from '../../contexts/AuthContext';
import ToDoList from './ToDoList';
import moment from 'moment';

const ToDo = () => {
    const { currentUser } = useAuth();
    const todoRef = useRef();
    const descriptionRef = useRef();
    const dateRef = useRef();
    const [todos, setTodos] = useState([]);
    const [todoId, setTodoId] = useState("");
    var isComplete = false;
    useEffect(() => {
        var query = db.collection('todo');
        query = query.where('userId', "==", currentUser._delegate.uid);
        query = query.orderBy('dueOn', 'asc');
        const unsubscribe = query.onSnapshot(snapshot => {
            setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data()})));
        });
        return () => unsubscribe();
    }, []);

    const convertDate = unixTime => {
        var s= new Date(unixTime).toLocaleDateString("en-us",{
            day: 'numeric',
            year: 'numeric',
            month: 'numeric'
        });
        return s;
    }

    const addTodo = event => {
        event.preventDefault();
        var due = new Date(dateRef.current.value);
        var timestamp = due.getTime() + (due.getTimezoneOffset() * 60000);
        if (todoId === ""){
            db.collection('todo').add({
                description: descriptionRef.current.value,
                dueOn: Number.isNaN(timestamp) ? 0 : timestamp,
                todo: todoRef.current.value,
                userId: currentUser._delegate.uid,
                isComplete: false
            });
        }
        else {
            var due = new Date(dateRef.current.value);
            var timestamp = due.getTime() + (due.getTimezoneOffset() * 60000);
            db.collection('todo').doc(todoId).set({
                todo: todoRef.current.value,
                description: descriptionRef.current.value,
                dueOn: timestamp,
                userId: currentUser._delegate.uid,
                isComplete: isComplete
            });
        }
        todoRef.current.value = "";
        dateRef.current.value="";
        descriptionRef.current.value="";
        setTodoId("");
    }

    const editMode = (todo) => {
        todoRef.current.value = todo.todo.todo;
        var date = convertDate(todo.todo.dueOn);
        dateRef.current.value = moment(date).format('YYYY-MM-DD');
        descriptionRef.current.value = todo.todo.description;
        setTodoId(todo.id);
        isComplete = todo.todo.isComplete;
    }

    const clearValues = () => {
        todoRef.current.value = "";
        dateRef.current.value="";
        descriptionRef.current.value="";
        setTodoId("");
        isComplete = false;
    }
   
    return (
        <div className="form element">
            <div className="ui form segment">
                <label>To Do Title</label>
                <input ref={todoRef} type="text" />
                <label>Description (optional)</label>
                <input ref={descriptionRef} type="text" />
                <label>Due On</label>
                <input ref={dateRef} onChange={() => console.log(dateRef)} type="date"></input>
                <button className="ui button grey" style={{marginTop: 10}} onClick={addTodo}>{todoId !== "" ? 'Update' : 'Add'} Todo</button>
                <Icon link title="Remove updated values" onClick={clearValues} name={todoId !== "" ? 'ban' : ''}></Icon>
            </div>
                <div className="ui items">
                {todos.map(todo => (
                    <ToDoList todo={todo} editMode={editMode}/>
                ))}
            </div>
        </div>
    );
}
export default ToDo;