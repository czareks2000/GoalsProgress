import { useState } from "react";
import { GoalType } from "../../../app/models/enums/GoalType";
import GoalCreateForm from "./GoalCreateForm";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";

const GoalCreate = () => {
    const [type, setType] = useState<GoalType | null>(null);

    const navigate = useNavigate();

    return (
        <>
            <div className="container shadow">
                {type
                ?  
                <>
                    <h2 className="text-center outline">{'Create ' + GoalType[type!] + ' Goal'}</h2>
                    <GoalCreateForm type={type!} setType={setType}/>
                </>
                :
                <>
                    <h2 className="text-center outline">Choose goal type</h2>
                    <div className="card-group outline">
                        <div className="card" 
                            onClick={() => setType(GoalType.Standard)}
                        >
                            <h3>Standard</h3>     
                        </div>
                        <div className="card" 
                            onClick={() => setType(GoalType.Extended)}
                        >
                            <h3>Extended</h3>          
                        </div>
                    </div>
                </>
                }
            </div>
            {!type &&
                <div className="text-center my-1">
                <Button 
                    text={'CANCEL'}
                    onClick={() => navigate(-1)}
                />
            </div>
            }   
        </>
    )
}

export default GoalCreate
