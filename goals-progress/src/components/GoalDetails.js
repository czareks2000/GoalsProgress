import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import Goal from "./Goal";
import Actions from "./Actions";
import ProgressList from "./ProgressList";
import ProgressAddForm from "./ProgressAddForm";

const GoalDetails = ({ goals }) => {
    const [goal, setGoal] = useState();
    const [showAddForm, setShowAddForm] = useState(false);
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
    };

    // add progress
    const addProgress = (progress) => {
        setProgressList([ ...progressList, progress]);
        setShowAddForm(false);
    }

    return (
        <div className="container shadow">
            {goal ?
            <>
                <Goal goal={goal}/>
                <Actions showAddForm={showAddForm} onShowAddForm={toggleAddForm}/>
                {showAddForm ? 
                <ProgressAddForm onAdd={addProgress} toggleAddForm={toggleAddForm}/> 
                :
                <ProgressList progressList={progressList}/>
                }
            </>
            :
            <p className="text-center">Loading...</p>
            }
        </div>
    )
}

export default GoalDetails
