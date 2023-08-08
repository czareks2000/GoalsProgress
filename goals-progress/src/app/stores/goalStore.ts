import { makeAutoObservable, runInAction } from "mobx";
import { Goal } from "../models/Goal";
import agent from "../api/agent";
import { GoalStatus } from "../models/enums/GoalStatus";
import { Progress } from "../models/Progress";
import { Category } from "../models/Category";
import { store } from "./store";

export default class GoalStore {
    goalsRegistry = new Map<number, Goal>();
    selectedGoal: Goal | undefined = undefined;
    progresses = new Map<number, Progress>();
    categories: Category[] = [];
    
    constructor() {
        makeAutoObservable(this);
    }

    get selectedProgresses() {
        return Array.from(this.progresses.values())
            .sort((a, b) => b.date!.getTime() - a.date!.getTime());
    }

    get currentGoals() {
        return Array.from(this.goalsRegistry.values())
                .filter(g => g.status === GoalStatus.Current)
                .sort((a, b) => a.deadline!.getTime() - b.deadline!.getTime());
    }

    get archivedGoals() {
        return Array.from(this.goalsRegistry.values())
                .filter(g => g.status === GoalStatus.Archvied || g.status === GoalStatus.Completed)
                .sort((a, b) => a.deadline!.getTime() - b.deadline!.getTime());
    }

    private setProgress = (progress: Progress) => {
        progress.date = this.convertToLocalTimezone(progress.date!);

        this.progresses.set(progress.id, progress);
    }

    private setGoal = (goal: Goal) => {
        goal.deadline = this.convertToLocalTimezone(goal.deadline!);
        goal.modificationDate = this.convertToLocalTimezone(goal.modificationDate!);

        this.goalsRegistry.set(goal.id, goal);
    }

    private getGoal = (id: number) => {
        return this.goalsRegistry.get(id);
    }

    loadGoals = async () => {
        try {
            const goals = await agent.Goals.list();
            goals.forEach(goal => {
                this.setGoal(goal);
            })
        } catch (error) {
            console.log(error);
            store.commonStore.setError("Failed to load goals");
        }
    }

    loadGoal = async (id: number) => {
        let goal = this.getGoal(id);

        if (goal) {
            this.selectedGoal = goal;
            try {
                await this.loadProgresses(goal.id);
            } catch (error) {
                console.log(error);
            }
            return goal;
        } else {
            try {
                goal = await agent.Goals.details(id);
                this.setGoal(goal);
                runInAction(() => {
                    this.selectedGoal = goal;
                })
                await this.loadProgresses(goal.id);
                return goal;
            } catch (error) {
                console.log(error);
            }
        }
        store.commonStore.setError("Failed to load goal");
    }

    loadProgresses = async (goalId: number) => {
        try {
            this.progresses.clear();
            const progresses = await agent.Goals.progresses(goalId);
            progresses.forEach(progress => {
                this.setProgress(progress);
            })
        } catch (error) {
            console.log(error);
            store.commonStore.setError("Failed to load progresses");
        }
    }

    createProgress = async (goalId: number, progress: Progress) => {
        try {
            const id = await agent.Progresses.create(goalId, progress);
            progress.id = id;
            let goal = await agent.Goals.details(goalId);
            runInAction(() => {
                this.setProgress(progress);
                this.setGoal(goal);
                this.selectedGoal = goal;
            })
            if (goal.status === GoalStatus.Completed)
                store.commonStore.setSuccess(`Goal completed!`);
        } catch (error) {
            console.log(error);
            store.commonStore.setError("Failed to add progress");
        }
    }

    deleteProgress = async (id: number, goalId: number) => {
        try {
            await agent.Progresses.delete(id);
            let goal = await agent.Goals.details(goalId);
            runInAction(() => {
                this.progresses.delete(id);
                this.setGoal(goal);
                this.selectedGoal = goal;
            })
        } catch (error) {
            console.log(error);
            store.commonStore.setError("Failed to delete progress");
        }
    }

    loadCategories = async (goalId: number) => {
        try {
            var categories = await agent.Goals.categories(goalId);
            runInAction(() => {
                this.categories = categories
            })
        } catch (error) {
            console.log(error);
            store.commonStore.setError("Failed to load categories");
        }
    }

    createGoal = async (goal: Goal) => {
        try {
            const id = await agent.Goals.create(goal);
            goal.id = id;
            goal.modificationDate = new Date();
            runInAction(() => {
                this.goalsRegistry.set(goal.id, goal);
            })
            store.commonStore.setSuccess(`Goal "${goal.name}" created successfuly`);
        } catch (error) {
            console.log(error);
            store.commonStore.setError("Failed to delete goal");
        }
    }

    updateGoal = async (id:number, goal: Goal) => {
        try {
            await agent.Goals.update(id, goal);
            let updatedGoal = await agent.Goals.details(id);
            runInAction(() => {
                this.setGoal(updatedGoal);
                this.selectedGoal = updatedGoal;
            })
        } catch (error) {
            console.log(error);
            store.commonStore.setError("Failed to update goal");
        }
    }

    changeStatus = async (id:number, status: GoalStatus) => {
        let goal = this.getGoal(id);
        
        if (goal)
        {
            goal.status = status;
            goal.modificationDate = new Date();
        }

        try {
            await agent.Goals.changeStatus(id, status);
            runInAction(() => {
                this.goalsRegistry.set(id, goal as Goal);
            })
            if(status === GoalStatus.Deleted)
                store.commonStore.setSuccess(`Goal deleted successfuly`);
        } catch (error) {
            console.log(error);
            store.commonStore.setError(`Failed to change goal status`);
        }
    }

    private convertToLocalTimezone(date: Date) {
        const result = new Date(date);
        const timezoneOffsetMinutes = result.getTimezoneOffset();
        result.setMinutes(result.getMinutes() - timezoneOffsetMinutes);

        return result;
    }
}