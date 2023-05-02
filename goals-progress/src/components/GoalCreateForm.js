import Button from "./Button"

const GoalCreateForm = () => {
  return (
    <div className="container shadow" style={{color: 'white'}}>
        <form className="create-form">
          <div className="form-control">
            <label>Name</label>
            <input type="text"/>
          </div>
          <div className="form-control">
            <label>Description</label>
            <input type="text"/>
          </div>
          <div className="form-group-inline">
            <div className="form-control w-100">
              <label>Goal Value</label>
              <input type="number"/>
            </div>
            <div className="form-control">
              <label>Unit</label>
              <select>
                <option value="">psc</option>
                <option value="">km</option>
                <option value="">kg</option>
                <option value="">custom...</option>
              </select>
            </div>
          </div>
          <div className="form-control">
            <label>Deadline</label>
            <input type="date"/>
          </div>
          <div className="text-center">
            <Button text={<>Submit</>} color={'#39a0ca'}/>
          </div>
        </form>
    </div>
  )
}

export default GoalCreateForm
