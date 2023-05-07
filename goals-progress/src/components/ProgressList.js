import Progress from "./Progress"

const ProgressList = ({ progressList, onDelete }) => {
  return (
    <div>
      {progressList.map((progress) => (
          <div key={progress.id}>
              <Progress progress={progress} onDelete={onDelete}/>
          </div>
        ))}
    </div>
  )
}

export default ProgressList
