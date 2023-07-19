import { makeAutoObservable, runInAction } from "mobx";
import { Goal } from "../models/Goal";
import agent from "../api/agent";
import { GoalStatus } from "../models/enums/GoalStatus";
import { Progress } from "../models/Progress";
import { Category } from "../models/Category";

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
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    get currentGoals() {
        return Array.from(this.goalsRegistry.values())
                .filter(g => g.status === GoalStatus.Current)
                .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    }

    get archivedGoals() {
        return Array.from(this.goalsRegistry.values())
                .filter(g => g.status === GoalStatus.Archvied)
                .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    }

    private setProgress = (progress: Progress) => {
        this.progresses.set(progress.id, progress);
    }

    private setGoal = (goal: Goal) => {
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
        } catch (error) {
            console.log(error);
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
        }
    }

    loadCategories = async () => {
        try {
            var categories = await agent.Categories.list();
            runInAction(() => {
                this.categories = categories
            })
        } catch (error) {
            console.log(error);
        }
    }

    createGoal = async (goal: Goal) => {
        try {
            const id = await agent.Goals.create(goal);
            goal.id = id;
            runInAction(() => {
                this.goalsRegistry.set(goal.id, goal);
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateGoal = async (id:number, goal: Goal) => {
        try {
            await agent.Goals.update(id, goal);
            runInAction(() => {
                this.setGoal(goal);
                this.selectedGoal = goal;
            })
        } catch (error) {
            console.log(error);
        }
    }

    changeStatus = async (id:number, status: GoalStatus) => {
        let goal = this.getGoal(id);
        
        if (goal) goal.status = status;

        try {
            await agent.Goals.changeStatus(id, status);
            runInAction(() => {
                this.goalsRegistry.set(id, goal as Goal);
            })
        } catch (error) {
            console.log(error);
        }
    }
}