import { Progress } from "../../../app/models/Progress"
import ProgressItem from "./ProgressItem"

interface Props {
  progresses: Progress[];
}

export default function ProgressList({progresses}: Props) {
  return (
      <div>
        {progresses.map((progress: Progress) => (
            <div key={progress.id}>
                <ProgressItem progress={progress} />
            </div>
          ))}
      </div>
  )
}

