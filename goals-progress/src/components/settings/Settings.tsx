import { observer } from "mobx-react-lite";
import ChangePasswordForm from "./ChangePasswordForm";
import RoundValuesSetting from "./RoundValuesSetting";
import ThemeSetting from "./ThemeSetting";

export default observer(function Settings() {
  return (
    <div className="settings container shadow">
        <div className="outline outline-primary">
          <ThemeSetting/>
        </div>
        <div className="outline outline-primary">
          <RoundValuesSetting/>
        </div>
        <div className="outline outline-primary">
          <ChangePasswordForm/>
        </div>
    </div>
  )
})
