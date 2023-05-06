import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import Goal from "./Goal";
import Actions from "./Actions";
import ProgressList from "./ProgressList";
import ProgressAddForm from "./ProgressAddForm";
import GoalEditForm from "./GoalEditForm";

const GoalDetails = ({ goals }) => {
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
        unit: 'none',
        progress: 0,
        daysLeft: 240
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

    // updateGoal
    const updateGoal = (goal) => {
        setGoal(goal);
    }

    return (
        <div className="container shadow">
            {goal ?
                <Goal goal={goal}/>
            :
                <Goal goal={placeholderGoal}/>
            }
            <Actions 
                    showAddForm={showAddForm} 
                    onShowAddForm={toggleAddForm}
                    showEditForm={showEditForm}
                    onShowEditForm={toggleEditForm}
                />
                {showAddForm && <ProgressAddForm onAdd={addProgress} toggleAddForm={toggleAddForm}/>}
                {showEditForm && <GoalEditForm goal={goal} toggleEditForm={toggleEditForm} onEdit={updateGoal}/>}
                {showProgressList && <ProgressList progressList={progressList}/>}
        </div>
    )
}

export default GoalDetails
