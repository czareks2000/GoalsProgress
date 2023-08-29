import { Category } from "./Category";
import { Progress } from "./Progress";
import { GoalStatus } from "./enums/GoalStatus";
import { GoalType } from "./enums/GoalType";

export interface Goal {
    id: number,
    name: string,
    description: string,
    currentValue: number,
    targetValue: number | null,
    customUnit: boolean,
    unit: string,
    deadline: Date | null,
    status: GoalStatus,
    type: GoalType,
    modificationDate?: Date,
    completedDate?: Date,
    progresses?: Progress[],
    categories?: Category[]
}