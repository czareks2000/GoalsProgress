import { FaPlus } from 'react-icons/fa'

import Goal from "./Goal"
import Button from './Button'

const Goals = () => {
  const goals = [
    {
      id: 1,
      name: 'Filmy',
      description: 'Obejrzeć 20 filmów',
      currentValue: 4,
      targetValue: 20,
      progress: 20,
      daysLeft: 230
    },
    {
      id: 2,
      name: 'Przepisy',
      description: 'Wypróbować 10 nowych przepisów',
      currentValue: 5,
      targetValue: 10,
      progress: 50,
      daysLeft: 230
    },
    {
      id: 3,
      name: 'Książki',
      description: 'Przeczytać 10 książek',
      currentValue: 3,
      targetValue: 10,
      progress: 30,
      daysLeft: 230
    },
    {
      id: 4,
      name: 'Badanie krwi',
      description: 'Zrobić morfologie krwi 2 razy',
      currentValue: 1,
      targetValue: 2,
      progress: 50,
      daysLeft: 230
    }
  ]

  return (
    <>
      <div className="goals container shadow">
        {goals.map((goal) => (
          <Goal key={goal.id} goal={goal}/>
        ))}
      </div>
      <div className="text-center">
        <Button text={<FaPlus className='icon'/>} color={'#39a0ca'}/>
      </div>
    </>
  )
}

export default Goals
