import { Progress } from "../interfaces/ProgressInterface"
import ProgressItem from "./ProgressItem"

interface Props {
  progressList: Progress[];
  onDelete: (id: number) => void ;
  goalStatus: number;
}

const ProgressList = ({ progressList, onDelete, goalStatus }: Props) => {
  return (
    <div>
      {progressList.map((progress: Progress) => (
          <div key={progress.id}>
              <ProgressItem progress={progress} onDelete={onDelete} goalStatus={goalStatus}/>
          </div>
        ))}
    </div>
  )
}

export default ProgressList
