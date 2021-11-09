import React, {useEffect, useState, useRef} from 'react';
import Header from "./Header";
import { useAuth } from "../../contexts/AuthContext";
import { db } from '../firebase/firebase';
import GoalList from './GoalList';
const Goals = () => {
    const { currentUser } = useAuth();
    const [goals, setGoals] = useState([]);
    const goalRef = useRef();
    const descriptionRef = useRef();
    const priorityRef = useRef();

    useEffect(() => {
        var query = db.collection('goals');
        query = query.where('userId', "==", currentUser._delegate.uid);
        query = query.orderBy('priority', 'asc');
        const unsubscribe = query.onSnapshot(snapshot => {
            console.log((snapshot.docs.map(doc => ({id: doc.id, goals: doc.data()}))));
            setGoals(snapshot.docs.map(doc => ({id: doc.id, goals: doc.data()})));
        });
        return () => unsubscribe();
    },[])

    const addGoal = (e) => {
        e.preventDefault();
        db.collection('goals').add({
            description: descriptionRef.current.value,
            goal: goalRef.current.value,
            priority: priorityRef.current.value === '' ? 0 : priorityRef.current.value,
            userId : currentUser._delegate.uid
        });
        goalRef.current.value = "";
        priorityRef.current.value = "";
        descriptionRef.current.value = "";
    }

    return(
        <div className="ui container">
                <Header link="goals"></Header>
                <div className="ui form segment">
                    <label>Goal</label>
                    <input ref={goalRef} type="text"></input>
                    <label>Description</label>
                    <input ref={descriptionRef} type="text"></input>
                    <label>Priority</label>
                    <input ref={priorityRef} type="number"></input>
                    <button className="ui button grey" style={{marginTop: 10}} onClick={addGoal}>Add Goal</button>
                </div>
                <div className="ui items">
                    {goals.map(goal => (
                        <GoalList goal={goal} />
                    ))}
                </div>
        </div>
    );
}

export default Goals;