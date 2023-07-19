import { Link } from "react-router-dom";
import { Goal } from "../../app/models/Goal";
import GoalItem from "./GoalItem";

interface Props {
    goals: Goal[];
}

export default function GoalList({goals}: Props) {
    return (
        <>
        {goals.map((goal) => {
          return(
            <div key={goal.id}>
              <Link to={`/goal/${goal.id}`}>
                <GoalItem goal={goal}/>
              </Link>
            </div>
          )
        })}
        </>
    )
}