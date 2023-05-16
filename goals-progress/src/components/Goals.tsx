import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import GoalItem from "./GoalItem"
import Button from './Button'
import { Goal } from '../interfaces/GoalInterface'

interface Props {
  goals: Goal[];
}

const Goals = ({ goals }: Props) => {
  return (
    <>
      <div className="goals container shadow">
        {goals.map((goal) => {
          if (goal.status === 1)
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
      <div className="text-center">
        <Link to="/goals/create">
          <Button text={<FaPlus/>} color={'#39a0ca'}/>
        </Link>
      </div>
    </>
  )
}

export default Goals
