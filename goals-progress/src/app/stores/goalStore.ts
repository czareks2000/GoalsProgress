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

    loading = false;
    initialLoading = true;
    
    constructor() {
        makeAutoObservable(this);
    }

    clearStore = () => {
        this.goalsRegistry.clear();
        this.selectedGoal = undefined;
    }

    get sortedProgresses() {
        if (this.selectedGoal)
            return this.selectedGoal.progresses!.slice().sort((a, b) => b.date!.getTime() - a.date!.getTime());

        return [];
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


    private setLoading = (state: boolean) => {
        this.loading = state;
    }

    private setInitialLoading = (state: boolean) => {
        this.initialLoading = state;
    } 

    private setGoal = (goal: Goal) => {
        goal.deadline = this.convertToLocalTimezone(goal.deadline!);
        goal.modificationDate = this.convertToLocalTimezone(goal.modificationDate!);
        goal.completedDate = this.convertToLocalTimezone(goal.completedDate!);

        goal.progresses?.map(progress => {
            progress.date = this.convertToLocalTimezone(progress.date!);
            return progress;
        }) 

        this.goalsRegistry.set(goal.id, goal);
    }

    private getGoal = (id: number) => {
        return this.goalsRegistry.get(id);
    }

    loadGoal = async (id: number) => {
        this.setInitialLoading(true);
        
        let goal = this.getGoal(id);

        if (goal) {
            this.selectedGoal = goal;
            this.setInitialLoading(false); 
            return goal;
        } else {
            try {
                goal = await agent.Goals.details(id);
                this.setGoal(goal);
                runInAction(() => this.selectedGoal = goal)
                return goal;
            } catch (error) {
                console.log(error);
                store.commonStore.setError("Failed to load goal");
            } finally {
                runInAction(() => this.setInitialLoading(false)); 
            }
        }
    }

    loadGoals = async () => {
        this.setInitialLoading(true);
        try {
            const goals = await agent.Goals.list();
            goals.forEach(goal => this.setGoal(goal))     
        } catch (error) {
            console.log(error);
            store.commonStore.setError("Failed to load goals");
        } finally {
            runInAction(() => this.setInitialLoading(false)); 
        }
    }

    createGoal = async (goal: Goal) => {
        try {
            const id = await agent.Goals.create(goal);
            goal.id = id;
            goal.modificationDate = new Date();
            goal.categories = [];
            goal.progresses = [];
            runInAction(() => { 
                //not using this.setGoal(goal) on purpose
                //goal object is not from db so dont need 
                //to deal w date and time
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
            const updatedGoal = await agent.Goals.update(id, goal);
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
        this.setLoading(true);
        if (this.selectedGoal)
        {
            this.selectedGoal.status = status;
            this.selectedGoal.modificationDate = new Date();
        }
        try {
            await agent.Goals.changeStatus(id, status);
            runInAction(() => {
                if (status === GoalStatus.Deleted)
                {
                    this.goalsRegistry.delete(id);
                    store.commonStore.setSuccess(`Goal deleted successfuly`);
                }
                else
                {
                    //not using this.setGoal(goal) on purpose
                    //goal object is not from db so dont need 
                    //to deal w date and time
                    this.goalsRegistry.set(id, this.selectedGoal as Goal);
                }
            })                
        } catch (error) {
            console.log(error);
            store.commonStore.setError(`Failed to change goal status`);
        } finally {
            runInAction(() => this.setLoading(false));
        }
    }

    createProgress = async (goalId: number, progress: Progress) => {
        try {
            const goal = await agent.Progresses.create(goalId, progress);
            runInAction(() => {
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

    updateProgress = async (goalId: number, progress: Progress) => {
        try {
            const updatedGoal = await agent.Progresses.update(progress.id, progress);
            runInAction(() => {
                this.setGoal(updatedGoal);
                this.selectedGoal = updatedGoal;
            })
        } catch (error) {
            console.log(error);
            store.commonStore.setError("Failed to update progress");
        }
    }

    deleteProgress = async (id: number, goalId: number) => {
        try {
            const goal = await agent.Progresses.delete(id);
            runInAction(() => {
                this.setGoal(goal);
                this.selectedGoal = goal;
            })
        } catch (error) {
            console.log(error);
            store.commonStore.setError("Failed to delete progress");
        }
    }

    createCategory = async (goalId: number, category: Category) => {
        try {
            const id = await agent.Categories.create(goalId, category);
            category.id = id;
            runInAction(() => {
                this.selectedGoal?.categories?.push(category);
                this.goalsRegistry.set(goalId, this.selectedGoal!);
                store.detailsPageStore.idOfLastCreatedCategory = category.id;
            })
        } catch (error) {
            console.log(error);
            store.commonStore.setError("Failed to add category");
        }
    }

    private convertToLocalTimezone(date: Date) {
        const result = new Date(date);
        const timezoneOffsetMinutes = result.getTimezoneOffset();
        result.setMinutes(result.getMinutes() - timezoneOffsetMinutes);

        return result;
    }
}