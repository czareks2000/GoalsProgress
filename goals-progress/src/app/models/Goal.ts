import { GoalStatus } from "./enums/GoalStatus";
import { GoalType } from "./enums/GoalType";

export interface Goal {
    id: number,
    name: string,
    description: string,
    currentValue: number,
    targetValue: number,
    customUnit: boolean,
    unit: string,
    deadline: string,
    status: GoalStatus,
    type: GoalType
}