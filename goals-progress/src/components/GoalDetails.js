import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import Goal from "./Goal";
import Actions from "./Actions";
import ProgressList from "./ProgressList";
import ProgressAddForm from "./ProgressAddForm";
import GoalEditForm from "./GoalEditForm";

const GoalDetails = ({ goals, onDelete, onArchive, onRestore, onUpdate }) => {
    const [goal, setGoal] = useState();
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showProgressList, setShowProgressList] = useState(true);
    const [progressList, setProgressList] = useState([
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

    const placeholderGoal = {
        id: 0,
        name: 'Name',
        description: 'Description',
        currentValue: 5,
        targetValue: 10,
        customUnit: false,
        unit: 'none',
        progress: 50,
        deadline: '2023-12-31',
        status: 1
    }

    const param = useParams();

    useEffect(() => {
        const getGoal = () => {
            const goal = goals.find(x => `${x.id}` === param.id);
            setGoal(goal);
        }

        getGoal();
    })

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
        setShowProgressList(!showProgressList);
    };

    const toggleEditForm = () => {
        setShowEditForm(!showEditForm);
        setShowProgressList(!showProgressList);
    };

    // add progress
    const addProgress = (progress) => {
        setProgressList([ ...progressList, progress]);
        setShowAddForm(false);
    }

    // delete progress
    const deleteProgress = (id) => {
        setProgressList(progressList.filter(x => x.id !== id));
    }

    return (
        <div className="container shadow">
            <Goal goal={goal ? goal : placeholderGoal}/>
            <Actions 
                showAddForm={showAddForm} 
                onShowAddForm={toggleAddForm}
                showEditForm={showEditForm}
                onShowEditForm={toggleEditForm}
                onDelete={onDelete}
                onArchive={onArchive}
                onRestore={onRestore}
                goal={goal ? goal : placeholderGoal}
            />
            {showAddForm && <ProgressAddForm onAdd={addProgress} toggleAddForm={toggleAddForm}/>}
            {showEditForm && <GoalEditForm goalToEdit={goal} toggleEditForm={toggleEditForm} onUpdate={onUpdate}/>}
            {showProgressList && <ProgressList progressList={progressList} onDelete={deleteProgress} goalStatus={goal ? goal.status : 1}/>}
        </div>
    )
}

export default GoalDetails
