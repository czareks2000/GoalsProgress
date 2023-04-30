import Goal from "./Goal"

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
    <div>
      {goals.map((goal) => (
        <Goal key={goal.id} goal={goal}/>
      ))}
    </div>
  )
}

export default Goals
