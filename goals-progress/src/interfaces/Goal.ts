import { ExtendedProgress, StandardProgress } from "./Progress"

export interface Goal {
    id: number,
    name: string,
    description: string,
    currentValue: number,
    targetValue: number,
    customUnit: boolean,
    unit: string,
    deadline: string,
    status: number,
    type: number
}

export interface StandardGoal extends Goal{
    progresses: StandardProgress[]
}

export interface ExtendedGoal extends Goal {
    progresses: ExtendedProgress[]
}