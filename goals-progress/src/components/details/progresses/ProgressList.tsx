import { observer } from "mobx-react-lite";
import { Progress } from "../../../app/models/Progress"
import { useStore } from "../../../app/stores/store";
import ProgressItem from "./ProgressItem"

export default observer(function ProgressList() {
  const {goalStore} = useStore();
  const {selectedProgresses: progresses} = goalStore;

  return (
    <div>
      {progresses.map((progress: Progress) => (
          <div key={progress.id}>
              <ProgressItem progress={progress} />
          </div>
        ))}
    </div>
  )
})

