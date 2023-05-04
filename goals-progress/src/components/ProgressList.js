import Progress from "./Progress"

const ProgressList = ({ progressList }) => {
  return (
    <div>
      {progressList.map((progress) => (
          <div key={progress.id}>
              <Progress progress={progress}/>
          </div>
        ))}
    </div>
  )
}

export default ProgressList
