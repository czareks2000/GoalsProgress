import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export default observer(function Settings() {
  const {themeStore: {isLight, toggleTheme}} = useStore();

  return (
    <div className="settings container shadow">
        <div className="outline outline-primary card-group">
          <h2 style={{marginLeft: 15}}>Switch Theme</h2>
          <div className="switch-wrapper">
            <input
              id="hide-checkbox" 
              type="checkbox" 
              onChange={() => toggleTheme()}
              checked={isLight}
              />
            <label htmlFor="hide-checkbox" className="toggle">
              <span className="toggle-button">
              </span>
            </label>
          </div>
        </div>
    </div>
  )
})
