const Progress = ({ progress }) => {
  return (
    <div className="progress">
        <div>
            {progress.value}
            {progress.description}
            {progress.date}
        </div>
    </div>
  )
}

export default Progress
