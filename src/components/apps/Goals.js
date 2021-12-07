import React, {useEffect, useState, useRef} from 'react';
import Header from "./Header";
import { Icon } from 'semantic-ui-react';
import { useAuth } from "../../contexts/AuthContext";
import { db } from '../firebase/firebase';
import GoalList from './GoalList';
const Goals = () => {
    const { currentUser } = useAuth();
    const [goals, setGoals] = useState([]);
    const goalRef = useRef();
    const descriptionRef = useRef();
    const priorityRef = useRef();
    const [goalId, setGoalId] = useState("");

    useEffect(() => {
        var query = db.collection('goals');
        query = query.where('userId', "==", currentUser);
        query = query.orderBy('priority', 'asc');
        const unsubscribe = query.onSnapshot(snapshot => {
            setGoals(snapshot.docs.map(doc => ({id: doc.id, goals: doc.data()})));
        });
        return () => unsubscribe();
    },[])

    const addGoal = (e) => {
        e.preventDefault();
        if(goalId === ""){
            db.collection('goals').add({
                description: descriptionRef.current.value,
                goal: goalRef.current.value,
                priority: priorityRef.current.value === '' ? 0 : priorityRef.current.value,
                userId : currentUser
            });
        } else {
            db.collection('goals').doc(goalId).set({
                description: descriptionRef.current.value,
                goal: goalRef.current.value,
                priority: priorityRef.current.value === '' ? 0 : priorityRef.current.value,
                userId : currentUser
            });
        }
        clearValues();
    }

    const editMode = (goal) => {
        goalRef.current.value = goal.goals.goal;
        priorityRef.current.value = goal.goals.priority;
        descriptionRef.current.value = goal.goals.description;
        setGoalId(goal.id);
    }

    const clearValues = () =>{
        goalRef.current.value = "";
        priorityRef.current.value = "";
        descriptionRef.current.value = "";
        setGoalId("");
    }

    return(
        <div className="ui container">
                <Header link="goals"></Header>
                <div className="ui form segment">
                    <label>Goal</label>
                    <input ref={goalRef} type="text"></input>
                    <label>Description</label>
                    <input ref={descriptionRef} placeholder="Optional" type="text"></input>
                    <label>Priority</label>
                    <input ref={priorityRef} placeholder="1 is highest priority" min="0" max="10" type="number"></input>
                    <button className="ui button grey" style={{marginTop: 10}} onClick={addGoal}>{goalId !== "" ? 'Update' : 'Add'} Goal</button>
                    <Icon link title="Remove updated values" onClick={clearValues} name={goalId !== "" ? 'ban' : ''}></Icon>
                </div>
                <div className="ui items">
                    {goals.map(goal => (
                        <GoalList goal={goal} editMode={editMode}/>
                    ))}
                </div>
        </div>
    );
}

export default Goals;