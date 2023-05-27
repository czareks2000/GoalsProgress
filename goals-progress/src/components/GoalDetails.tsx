import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import GoalItem from "./GoalItem";
import Actions from "./Actions";
import ProgressList from "./ProgressList";
import ProgressAddForm from "./ProgressAddForm";
import GoalEditForm from "./GoalEditForm";
import { StandardProgress } from "../interfaces/Progress";
import { Goal, StandardGoal } from "../interfaces/Goal";
import axios from "axios";

interface Props {
    onDelete: (id: number) => void;  
    onArchive: (id: number) => void;  
    onRestore: (id: number) => void; 
    onUpdate: (goal: Goal) => void; 
}

const GoalDetails = ({ onDelete, onArchive, onRestore, onUpdate }: Props) => {
    const [goal, setGoal] = useState<StandardGoal>({
        id: 0,
        name: '',
        description: '',
        currentValue: 0,
        targetValue: 1,
        customUnit: false,
        unit: 'none',
        deadline: '2023-12-31',
        status: 1,
        type: 1,
        progresses: []
    });
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [showProgressList, setShowProgressList] = useState<boolean>(true);

    const param = useParams();

    useEffect(() => {
        // get goal
        const getGoal = () => {
            axios.get(`http://localhost:5000/api/goal/${param.id}`)
            .then(response => {
            setGoal(response.data);
            })
        }

        getGoal();
    }, [param.id])

    

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
        setShowProgressList(!showProgressList);
    };

    const toggleEditForm = () => {
        setShowEditForm(!showEditForm);
        setShowProgressList(!showProgressList);
    };

    // add progress
    const addProgress = (progress: StandardProgress) => {
        //setProgressList([ ...progressList, progress]);
        setShowAddForm(false);
    }

    // delete progress
    const deleteProgress = (id: number) => {
        //setProgressList(progressList.filter(x => x.id !== id));
    }

    return (
        <div className="container shadow">
            <GoalItem goal={goal}/>
            <Actions 
                showAddForm={showAddForm} 
                onShowAddForm={toggleAddForm}
                showEditForm={showEditForm}
                onShowEditForm={toggleEditForm}
                onDelete={onDelete}
                onArchive={onArchive}
                onRestore={onRestore}
                goal={goal}
            />
            {showAddForm && <ProgressAddForm onAdd={addProgress} toggleAddForm={toggleAddForm}/>}
            {showEditForm && <GoalEditForm goalToEdit={goal} toggleEditForm={toggleEditForm} onUpdate={onUpdate}/>}
            {showProgressList && <ProgressList progressList={goal.progresses} onDelete={deleteProgress} goalStatus={goal.status}/>}
        </div>
    )
}

export default GoalDetails
