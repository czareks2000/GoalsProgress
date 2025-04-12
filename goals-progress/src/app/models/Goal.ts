import dayjs from "dayjs";
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
    deadline: dayjs.Dayjs | Date;
    status: GoalStatus,
    type: GoalType,
    modificationDate?: dayjs.Dayjs | Date,
    completedDate?: dayjs.Dayjs | Date,
    progresses?: Progress[],
    categories?: Category[]
}