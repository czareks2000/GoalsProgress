import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

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

    return (
        <div className="container shadow">
            {goal ?
            <div>
                {goal.id}
                {goal.name}
                {goal.description}
                {goal.currentValue}
                {goal.targetValue}
                {goal.progress}
                {goal.daysLeft}
            </div>
            :
            <p className="text-center">Loading...</p>
            }
        </div>
    )
}

export default GoalDetails
