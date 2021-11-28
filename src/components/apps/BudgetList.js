import React, {useState, useRef} from 'react';
import { Icon } from 'semantic-ui-react';
import { db } from '../firebase/firebase';
import './ItemSegment.css';
import { currencyInput } from '../helpers/HelperFunctions';
import { useAuth } from "../../contexts/AuthContext";

const BudgetList = (props) => {
    const [budgetEdit, setBudgetEdit] = useState(false);
    const budgetValue = useRef();
    const { currentUser } = useAuth();

    const setProgress = () => {
        budgetValue.current.value = currencyInput(budgetValue.current.value);
    }

    const renderBudgetValue = () =>{
        if(budgetEdit){
            return (
                <div className="ui input">
                    <input type="text" ref={budgetValue} onChange={setProgress} placeholder={'Current: ' + props.budget.budgets.budgetProgress}/>
                </div>
            )
        }
        else{
            return <div className="ui label">Budget Progress: {props.budget.budgets.budgetProgress === '0' ? '$0' : props.budget.budgets.budgetProgress}</div>;
        }
    }

    const updateBudgetEdit = () =>{
        if (budgetEdit) {
            db.collection('budget').doc(props.budget.id).set({
                description: props.budget.budgets.description,
                budget: props.budget.budgets.budget,
                budgetValue: props.budget.budgets.budgetValue,
                budgetProgress: budgetValue.current.value === '' ? props.budget.budgets.budgetProgress : budgetValue.current.value,
                userId : currentUser._delegate.uid
            });
        }
        setBudgetEdit(!budgetEdit);
    }

    if(props.budget){
        return (
            <div key={props.budget.id} className="ui item segment">
                <div className="content">
                    <div className="header">{props.budget.budgets.budget}</div>
                    <div className="description">{props.budget.budgets.description} <br /> Budget: {props.budget.budgets.budgetValue}</div>
                    {renderBudgetValue()}
                    <Icon onClick={() => updateBudgetEdit()} link name={budgetEdit ? "save outline" : "dollar sign"} title={budgetEdit? "Save budget progress." : "Click to edit progress"}/>
                    <div className="extra">
                        <Icon link onClick={e => {db.collection('budget').doc(props.budget.id).delete()}} name="red trash alternate outline" />
                        <Icon link onClick={() => props.editMode(props.budget)} name="edit icon"></Icon>
                    </div>
                </div>
            </div>
        )
    }
    return null;
};

export default BudgetList;