import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import Goal from "./Goal";
import Actions from "./Actions";
import ProgressList from "./ProgressList";

const GoalDetails = ({ goals }) => {
    const [goal, setGoal] = useState();

    const param = useParams();

    useEffect(() => {
        const getGoal = () => {
            const goal = goals.find(x => `${x.id}` === param.id);
            setGoal(goal);
        }

        getGoal();
    })

    const progressList = [
        {
          id: 1,
          value: 1,
          description: 'Batman',
          date: 4,
        },
        {
            id: 2,
            value: 1,
            description: 'Forrest Gump',
            date: 4,
        },
        {
            id: 3,
            value: 1,
            description: 'Shrek',
            date: 4,
        },
        {
            id: 4,
            value: 1,
            description: 'American Psycho',
            date: 4,
        }
      ]

    return (
        <div className="container shadow">
            {goal ?
            <>
                <Goal goal={goal}/>
                <Actions/>
                <ProgressList progressList={progressList}/>
            </>
            :
            <p className="text-center">Loading...</p>
            }
        </div>
    )
}

export default GoalDetails
