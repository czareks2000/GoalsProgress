import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import Button from "../common/Button";
import { useState } from "react";
import ChangePasswordForm from "../forms/user/ChangePasswordForm";

export default observer(function Settings() {
  const {
    themeStore: {isLight, toggleTheme},
    commonStore: {digits, setNumberOfDigits, setSuccess}
  } = useStore();

  const [digitsNumber, setDigitsNumber] = useState(digits);

  return (
    <div className="settings container shadow">
        <div className="outline outline-primary">
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
        </div>
        <div className="outline outline-primary">
          <div className="form-group-inline settings-item">
            <h2>Round values to</h2>
            <div className="form-control">
              <input
                  type="number"
                  autoComplete='off'
                  value={digitsNumber}
                  onChange={e => setDigitsNumber(parseInt(e.target.value))}
              />
            </div>
            <h2>digits</h2>
            <div className="form-control">
              <Button
                text="Save" 
                onClick={e => {
                  setNumberOfDigits(digitsNumber);
                  setSuccess(`Values will be rounded to ${digitsNumber} digits`);
                  e.currentTarget.blur();
                }}/>
            </div>
          </div>
        </div>
        <div className="outline outline-primary">
          <ChangePasswordForm/>
        </div>
    </div>
  )
})
