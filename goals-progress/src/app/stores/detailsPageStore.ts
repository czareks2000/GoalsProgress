import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import { Progress } from "../models/Progress";
import { GoalType } from "../models/enums/GoalType";
import { GoalStatus } from "../models/enums/GoalStatus";

export default class DetailsPageStore {
    selectedProgress: Progress | undefined = undefined;
    idOfLastCreatedCategory: number | undefined = undefined;

    visibleAddProgressForm = false;
    visibleEditProgressForm = false;
    visibleEditGoalForm = false;
    visibleProgressList = true;

    constructor() {
        makeAutoObservable(this);
    }

    setInitialValues = async() => {
        runInAction(() => {
            this.visibleAddProgressForm = false;
            this.visibleEditProgressForm = false;
            this.visibleEditGoalForm = false;
            this.visibleProgressList = true;
            this.idOfLastCreatedCategory = undefined;
        })
    }

    toggleAddProgressForm = async () => {
        runInAction(() => {
            this.visibleAddProgressForm = !this.visibleAddProgressForm;
            this.visibleProgressList = !this.visibleProgressList;
        })
    }

    toggleEditGoalForm = async () => {
        runInAction(() => {
            this.visibleEditGoalForm = !this.visibleEditGoalForm;
            this.visibleProgressList = !this.visibleProgressList;
        })
    }

    toggleEditProgressForm = async () => {
        runInAction(() => {
            this.visibleEditProgressForm = !this.visibleEditProgressForm;
            this.visibleProgressList = !this.visibleProgressList;
        })
    }

    showEditProgressForm = async (progress: Progress) => {
        runInAction(() => {
            this.selectedProgress = progress;
            this.toggleEditProgressForm();
        })
    }

    get showProgressAddForm() {
        if(store.goalStore.selectedGoal)
            return ((store.goalStore.selectedGoal.type === GoalType.Extended && store.goalStore.selectedGoal.categories!.length > 0 ) 
                ||  (store.goalStore.selectedGoal.type === GoalType.Standard)) && this.visibleAddProgressForm
        
        return false;
    }

    get showCategoryAddForm() {
        if(store.goalStore.selectedGoal)
            return (store.goalStore.selectedGoal.type === GoalType.Extended && this.visibleAddProgressForm) 
                ||  (store.goalStore.selectedGoal.type === GoalType.Extended && this.visibleEditProgressForm)
        
        return false;
    }

    get addProgressActionStatus() {
        if(store.goalStore.selectedGoal)
            return store.goalStore.selectedGoal.status !== GoalStatus.Current 
                || this.visibleEditGoalForm 
                || this.visibleEditProgressForm
        
        return false;
    }

    get editGoalActionStatus() {
        if(store.goalStore.selectedGoal)
            return store.goalStore.selectedGoal.status === GoalStatus.Archvied 
                || this.visibleAddProgressForm 
                || this.visibleEditProgressForm
        
        return false;
    }

    get archiveGoalActionStatus() {
        if(store.goalStore.selectedGoal)
            return !this.visibleProgressList || store.goalStore.selectedGoal.status === GoalStatus.Completed
        
        return false;
    }
}