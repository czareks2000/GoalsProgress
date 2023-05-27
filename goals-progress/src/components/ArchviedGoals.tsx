import { Link } from 'react-router-dom'

import GoalItem from "./GoalItem"
import { Goal } from '../interfaces/Goal'

interface Props {
  goals: Goal[];
}

const ArchviedGoals = ({ goals }: Props) => {
  return (
    <>
      <div className="goals container shadow">
        {goals.map((goal) => {
          if (goal.status === 2)
          {
            return(
              <div key={goal.id}>
                <Link to={`/goal/${goal.id}`}>
                  <GoalItem goal={goal}/>
                </Link>
              </div>
            )
          }
          return null;
        })}
      </div>
    </>
  )
}

export default ArchviedGoals