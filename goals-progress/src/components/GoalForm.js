import Button from "./Button";

const GoalForm = ({ onSubmit, buttonText, goal, setGoal }) => {
    
    const handleSelectChange = (e) => {
        if (e.target.value === '1') {
          setGoal({ ...goal, unit: '' });
          setGoal({ ...goal, customUnit: true });
        } else {
          setGoal({ ...goal, unit: e.target.value });
          setGoal({ ...goal, customUnit: false });
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
            value={goal.targetValue}
            onChange={(e) => setGoal({ ...goal, targetValue: e.target.value })}
            />
        </div>
        <div className="form-control">
            <label>Unit</label>
            <select id="unitSelect" onChange={handleSelectChange}>
              <option value="">none</option>
              <option value="psc">psc</option>
              <option value="km">km</option>
              <option value="kg">kg</option>
              <option value="1" selected={goal.customUnit}>custom...</option>
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
        <input 
            type="date"
            value={goal.deadline}
            onChange={(e) => {setGoal({ ...goal, deadline: e.target.value })}}
        />
        </div>
        <div className="text-center">
          <Button text={buttonText} color={'#39a0ca'}/>
        </div>
    </form>
  )
}

export default GoalForm
