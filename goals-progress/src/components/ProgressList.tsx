import { StandardProgress } from "../interfaces/Progress"
import ProgressItem from "./ProgressItem"

interface Props {
  progressList: StandardProgress[];
  onDelete: (id: number) => void ;
  goalStatus: number;
}

const ProgressList = ({ progressList, onDelete, goalStatus }: Props) => {
  return (
    <div>
      {progressList.map((progress: StandardProgress) => (
          <div key={progress.id}>
              <ProgressItem progress={progress} onDelete={onDelete} goalStatus={goalStatus}/>
          </div>
        ))}
    </div>
  )
}

export default ProgressList
