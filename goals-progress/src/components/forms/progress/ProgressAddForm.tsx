import { FormEvent, useState } from "react"

import Button from "../../common/Button";
import { Progress } from "../../../app/models/Progress";
import { useStore } from "../../../app/stores/store";
import { GoalType } from "../../../app/models/enums/GoalType";
import DatePicker from "react-datepicker"

interface Props {
  toggleAddForm: () => void;
}

const ProgressAddForm = ({ toggleAddForm }: Props) => {
    const {goalStore} = useStore();
    const {createProgress, categories, selectedGoal} = goalStore;

    const [progress, setProgress] = useState<Progress>({
      id: 0,
      value: 1,
      date: null,
      description: '',
      categoryId: categories[0].id
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createProgress(selectedGoal?.id!, progress);
        toggleAddForm();
    }

    return (
      <form className="create-form outline" onSubmit={onSubmit}>
          <div className="form-control">
            <label>Value</label>
            <input 
              type="number"
              step="any" 
              placeholder="ex. 1"
              value={progress.value}
              onChange={(e) => setProgress({...progress, value: parseFloat(e.target.value)})}
            />
          </div>
          {selectedGoal?.type === GoalType.Standard 
          ?
            <div className="form-control">
              <label>Description</label>
              <input 
                type="text" 
                placeholder="ex. title of the movie"
                value={progress.description}
                onChange={(e) => setProgress({...progress, description: e.target.value})}
              />
            </div>
          :
            <div className="form-control">
              <label>Category</label>
              <select id="categorySelect" 
                onChange={(e) => setProgress({ ...progress, categoryId: parseInt(e.target.value)})}>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{`${category.name} (x ${category.multiplier})`}</option>
                ))}
              </select>
            </div>
          }
          <div className="form-control">
            <label>Date</label>
            <DatePicker
              className="date-input"
              placeholderText="Click to select a date"
              todayButton="Today"
              selected={progress.date}
              onChange={(date) => setProgress({ ...progress, date: date})}
            />
          </div>
          <div className="text-center">
            <Button text={'ADD'} color={'#39a0ca'}/>
          </div>
        </form>
  )
}

export default ProgressAddForm
