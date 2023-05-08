import Progress from "./Progress"

const ProgressList = ({ progressList, onDelete, goalStatus }) => {
  return (
    <div>
      {progressList.map((progress) => (
          <div key={progress.id}>
              <Progress progress={progress} onDelete={onDelete} goalStatus={goalStatus}/>
          </div>
        ))}
    </div>
  )
}

export default ProgressList
