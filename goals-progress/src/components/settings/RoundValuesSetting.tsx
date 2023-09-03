import { useState } from "react";
import { useStore } from "../../app/stores/store";
import Button from "../common/Button";

export default function RoundValuesSetting() {
    const {commonStore: {digits, setNumberOfDigits, setSuccess}} = useStore();
    const [digitsNumber, setDigitsNumber] = useState(digits);

    return (
        <div className="form-group-inline round-values-setting">
            <h2>Round values to</h2>
            <div className="form-control">
              <input
                  type="number"
                  autoComplete='off'
                  value={digitsNumber}
                  onChange={e => setDigitsNumber(parseInt(e.target.value))}
              />
            </div>
            <h2>digit{digitsNumber > 1 && 's'}</h2>           
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
    )
}