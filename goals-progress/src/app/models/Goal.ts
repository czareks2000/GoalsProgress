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
    deadline: Date | null,
    status: GoalStatus,
    type: GoalType
}