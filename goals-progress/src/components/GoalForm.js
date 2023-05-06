import Button from "./Button";

const GoalForm = ({ 
    name, description, goalValue, unit, customUnit, deadline,
    setName, setDescription, setGoalValue, setUnit, setCustomUnit, setDeadline,
    onSubmit, buttonText }) => {
    
    const handleSelectChange = (e) => {
        if (e.target.value === '1') {
          setUnit('');
          setCustomUnit(true);
        } else {
          setUnit(e.target.value);
          setCustomUnit(false);
        }
      };

    return (
    <div className="container shadow">
        <form className="create-form outline " onSubmit={onSubmit}>
          <div className="form-control">
            <label>Name</label>
            <input 
              type="text" 
              placeholder="ex. Reading Books"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Description</label>
            <input 
              type="text" 
              placeholder="ex. Read 10 books"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group-inline">
            <div className="form-control w-100">
              <label>Goal Value</label>
              <input 
                type="number" 
                placeholder="ex. 10"
                value={goalValue}
                onChange={(e) => setGoalValue(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>Unit</label>
              <select id="unitSelect" onChange={handleSelectChange}>
                <option value="">none</option>
                <option value="psc">psc</option>
                <option value="km">km</option>
                <option value="kg">kg</option>
                <option value="1">custom...</option>
              </select>
            </div>
          </div>
          {
            customUnit &&
            <div className="form-control">
              <label>Custom Unit</label>
              <input 
                type="text" 
                placeholder="ex. meters or m"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
          }
          <div className="form-control">
            <label>Deadline</label>
            <input 
              type="date"
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div className="text-center">
            <Button text={buttonText} color={'#39a0ca'}/>
          </div>
        </form>
    </div>
  )
}

export default GoalForm