import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import Goal from "./Goal"
import Button from './Button'

const Goals = ({ goals }) => {
  return (
    <>
      <div className="goals container shadow">
        {goals.map((goal) => (
          <div key={goal.id}>
            <Link to={`/goal/${goal.id}`}>
              <Goal goal={goal}/>
            </Link>
          </div>
        ))}
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
