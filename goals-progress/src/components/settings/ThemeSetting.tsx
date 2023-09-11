import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export default observer(function ThemeSetting() {
    const {themeStore: {isLight, toggleTheme}} = useStore();

    return (
        <div className="card-group">
            <h2 style={{marginLeft: 10}}>Switch Theme</h2>
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
    )
})