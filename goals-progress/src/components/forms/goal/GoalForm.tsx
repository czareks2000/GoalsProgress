import { ChangeEvent, FormEvent } from "react";
import { Goal } from "../../../app/models/Goal";
import Button from "../../common/Button";
import DatePicker from "react-datepicker"

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  buttonText: string;
  goal: Goal;
  setGoal: (goal: Goal) => void;
  cancelButton?: boolean;
  cancelButtonAction?: any;
}

const GoalForm = ({ onSubmit, buttonText, goal, setGoal, cancelButton = false, cancelButtonAction }: Props) => {
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === '1') {
          setGoal({ ...goal, unit: '', customUnit: true });
        } else {
          setGoal({ ...goal, unit: e.target.value, customUnit: false });
        }
      };

    return (
    <form className="goal-form outline" onSubmit={onSubmit}>
        <div className="form-control">
        <label>Name</label>
        <input 
            type="text" 
            placeholder="ex. Reading Books"
            value={goal.name}
            onChange={(e) => setGoal({ ...goal, name: e.target.value })}
        />
        </div>
        <div className="form-control">
        <label>Description</label>
        <input 
            type="text" 
            placeholder="ex. Read 10 books"
            value={goal.description}
            onChange={(e) => setGoal({ ...goal, description: e.target.value })}
        />
        </div>
        <div className="form-group-inline">
          <div className="form-control w-100">
              <label>Goal Value</label>
              <input 
              type="number" 
              placeholder="ex. 10"
              value={goal.targetValue || ''}
              onChange={(e) => setGoal({ ...goal, targetValue: parseInt(e.target.value)})}
              />
          </div>
          <div className="form-control">
              <label>Unit</label>
              <select id="unitSelect" value={goal.customUnit ? "1" : goal.unit} onChange={handleSelectChange}>
                <option value="none">none</option>
                <option value="1">custom</option>
              </select>
          </div>
        </div>
        {
        goal.customUnit &&
        <div className="form-control">
            <label>Custom Unit</label>
            <input 
            type="text" 
            placeholder="ex. meters or m"
            value={goal.unit !== 'none' ? goal.unit : ''}
            onChange={(e) => setGoal({ ...goal, unit: e.target.value })}
            />
        </div>
        }
        <div className="form-control">
        <label>Deadline</label>
        <DatePicker
          className="date-input"
          placeholderText="Click to select a date"
          todayButton="Today"
          calendarStartDay={1}
          dateFormat="dd MMM yyyy"
          selected={goal.deadline}
          onChange={(date) => setGoal({ ...goal, deadline: date})}
        />
        </div>
        <div className="text-center">
            <Button text={buttonText} color={'#39a0ca'}/>
            {cancelButton &&
            <div
              className="btn"
              style={{backgroundColor: '#39a0ca'}}
              onClick={cancelButtonAction}
            >
              CANCEL
            </div> 
            }
        </div>
    </form>
  )
}

export default GoalForm
