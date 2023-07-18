import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import GoalItem from "./GoalItem"
import Button from '../common/Button'
import { observer } from "mobx-react-lite";
import { useStore } from '../../app/stores/store'
import { useEffect } from 'react';


export default observer(function Goals (){
  const {goalStore} = useStore();
  const {currentGoals, loadGoals} = goalStore;

  useEffect(() => {
    loadGoals();
  }, [loadGoals]);

  return (
    <>
      <div className="goals container shadow">
        {currentGoals.map((goal) => {
          return(
            <div key={`${goal.id}-${goal.type}`}>
              <Link to={`/goal/${goal.id}`}>
                <GoalItem goal={goal}/>
              </Link>
            </div>
          )
        })}
      </div>
      <div className="text-center">
        <Link to="/goal/create">
          <Button text={<FaPlus/>} color={'#39a0ca'}/>
        </Link>
      </div>
    </>
  )
})


