import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import GoalItem from "./GoalItem";
import Actions from "./Actions";
import ProgressList from "./ProgressList";
import ProgressAddForm from "./ProgressAddForm";
import GoalEditForm from "./GoalEditForm";
import { Progress } from "../interfaces/ProgressInterface";
import { Goal } from "../interfaces/GoalInterface";

interface Props {
    goals: Goal[]; 
    onDelete: (id: number) => void;  
    onArchive: (id: number) => void;  
    onRestore: (id: number) => void; 
    onUpdate: (goal: Goal) => void; 
}

const GoalDetails = ({ goals, onDelete, onArchive, onRestore, onUpdate }: Props) => {
    const [goal, setGoal] = useState<Goal>({
        id: 0,
        name: 'Goal',
        description: 'Not found',
        currentValue: 5,
        targetValue: 10,
        customUnit: false,
        unit: 'none',
        deadline: '2023-12-31',
        status: 1,
        type: 1
    });
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [showProgressList, setShowProgressList] = useState<boolean>(true);
    const [progressList, setProgressList] = useState<Progress[]>([
    {
        id: 1,
        value: 1,
        description: 'Batman',
        date: '12-06-2022',
    },
    {
        id: 2,
        value: 1,
        description: 'Forrest Gump',
        date: '05-05-2022',
    },
    {
        id: 3,
        value: 1,
        description: 'Shrek',
        date: '25-04-2022',
    },
    {
        id: 4,
        value: 1,
        description: 'American Psycho',
        date: '30-03-2022',
    }
    ]);


    const param = useParams();

    useEffect(() => {
        const getGoal = () => {
            const goal = goals.find(x => `${x.id}` === param.id);
            if(goal)
                setGoal(goal);
        }

        getGoal();
    }, [goals, param.id])

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
        setShowProgressList(!showProgressList);
    };

    const toggleEditForm = () => {
        setShowEditForm(!showEditForm);
        setShowProgressList(!showProgressList);
    };

    // add progress
    const addProgress = (progress: Progress) => {
        setProgressList([ ...progressList, progress]);
        setShowAddForm(false);
    }

    // delete progress
    const deleteProgress = (id: number) => {
        setProgressList(progressList.filter(x => x.id !== id));
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
            {showProgressList && <ProgressList progressList={progressList} onDelete={deleteProgress} goalStatus={goal.status}/>}
        </div>
    )
}

export default GoalDetails
