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
                    <h2 className="text-center">{'Create ' + GoalType[type!] + ' Goal'}</h2>
                    <GoalCreateForm type={type!}/>
                </>
                :
                <>
                    <h2 className="text-center">Choose goal type</h2>
                    <div className="card-group">
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
            <div className="text-center my-1">
                <Button text={'CANCEL'} color={'#39a0ca'} onClick={() => navigate(-1)}/>
            </div>
        </>
    )
}

export default GoalCreate
