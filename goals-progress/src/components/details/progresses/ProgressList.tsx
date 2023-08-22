import { observer } from "mobx-react-lite";
import { Progress } from "../../../app/models/Progress"
import Loading from "../../common/Loading";
import ProgressItem from "./ProgressItem"
import { useStore } from "../../../app/stores/store";

interface Props {
  progresses: Progress[];
}

export default observer(function ProgressList({progresses}: Props) {
  const {goalStore} = useStore();
  const {initialLoading} = goalStore;

  if (initialLoading) return <Loading/>

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

