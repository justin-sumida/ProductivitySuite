import React, {useEffect, useState, useRef} from 'react';
import Header from "./Header";
import { Icon } from 'semantic-ui-react';
import { useAuth } from "../../contexts/AuthContext";
import { db } from '../firebase/firebase';
import BudgetList from './BudgetList';
import { currencyInput } from '../helpers/HelperFunctions';
const Budget = () => {
    const { currentUser } = useAuth();
    const [budgets, setBudgets] = useState([]);
    const budgetRef = useRef();
    const descriptionRef = useRef();
    const budgetValue = useRef();
    const [budget, setBudget] = useState();

    useEffect(() => {
        var query = db.collection('budget');
        query = query.where('userId', "==", currentUser);
        query = query.orderBy('budgetValue', 'asc');
        const unsubscribe = query.onSnapshot(snapshot => {
            setBudgets(snapshot.docs.map(doc => ({id: doc.id, budgets: doc.data()})));
        });
        console.log(budget);
        return () => unsubscribe();
    },[])

    const addGoal = (e) => {
        e.preventDefault();
        if(!budget){
            db.collection('budget').add({
                description: descriptionRef.current.value,
                budget: budgetRef.current.value,
                budgetValue: budgetValue.current.value ? budgetValue.current.value : '0',
                budgetProgress: 0,
                userId : currentUser
            });
        } else {
            db.collection('budget').doc(budget.id).set({
                description: descriptionRef.current.value,
                budget: budgetRef.current.value,
                budgetValue: budgetValue.current.value,
                budgetProgress: budget.budgets.budgetProgress,
                userId : currentUser
            });
        }
        clearValues();
    }

    const editMode = (budget) => {
        budgetRef.current.value = budget.budgets.budget;
        budgetValue.current.value = budget.budgets.budgetValue;
        descriptionRef.current.value = budget.budgets.description;
        setBudget(budget);
    }

    const clearValues = () =>{
        budgetRef.current.value = "";
        budgetValue.current.value = "";
        descriptionRef.current.value = "";
        setBudget("");
    }

    const setProgress = () => {
        budgetValue.current.value = currencyInput(budgetValue.current.value);
    }

    return(
        <div className="ui container">
                <Header link="budget"></Header>
                <div className="ui form segment">
                    <label>Budget Item</label>
                    <input ref={budgetRef} type="text"></input>
                    <label>Description</label>
                    <input ref={descriptionRef} placeholder="Optional" type="text"></input>
                    <label>Budget Amount</label>
                    <input type="text" ref={budgetValue} onChange={setProgress}/>
                    <button className="ui button grey" style={{marginTop: 10}} onClick={addGoal}>{budget ? 'Update' : 'Add'} Budget</button>
                    <Icon link title="Remove updated values" onClick={clearValues} name={budget ? 'ban' : ''}></Icon>
                </div>
                <div className="ui items">
                    {budgets.map(budget => (
                        <BudgetList budget={budget} editMode={editMode}/>
                    ))}
                </div>
        </div>
    );
};

export default Budget;