import { FormEvent, useState } from "react"

import Button from "../../common/Button";
import { Progress } from "../../../app/models/Progress";

interface Props {
  onAdd: (progress: Progress) => void;
  toggleAddForm: () => void;
}

const ProgressAddForm = ({ onAdd, toggleAddForm }: Props) => {
    const [value, setValue] = useState<number>(1);
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const id = Math.floor(Math.random() * (100 - 10 + 1)) + 10 // tylko do testowania

        onAdd({ id, value, description, date });
        toggleAddForm();
    }

    return (
      <form className="create-form outline " onSubmit={onSubmit}>
          <div className="form-control">
            <label>Value</label>
            <input 
              type="number" 
              placeholder="ex. 1"
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value))}
            />
          </div>
          <div className="form-control">
            <label>Description</label>
            <input 
              type="text" 
              placeholder="ex. title of the movie"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Date</label>
            <input 
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="text-center">
            <Button text={'ADD'} color={'#39a0ca'}/>
          </div>
        </form>
  )
}

export default ProgressAddForm
