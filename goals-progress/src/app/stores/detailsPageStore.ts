import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import { Progress } from "../models/Progress";
import { GoalStatus } from "../models/enums/GoalStatus";
import { GoalType } from "../models/enums/GoalType";

export default class DetailsPageStore {
    selectedProgress: Progress | undefined = undefined;
    idOfLastCreatedCategory: number | undefined = undefined;
    
    visibleStats = false;
    visibleAddProgressForm = false;
    visibleEditProgressForm = false;
    visibleEditGoalForm = false;
    visibleProgressList = true;

    constructor() {
        makeAutoObservable(this);
    }

    setInitialValues = async() => {
        runInAction(() => {
            this.visibleStats = false;
            this.visibleAddProgressForm = false;
            this.visibleEditProgressForm = false;
            this.visibleEditGoalForm = false;
            this.visibleProgressList = true;
            this.idOfLastCreatedCategory = undefined;
        })
    }

    toggleAddProgressForm = () => {
        this.visibleAddProgressForm = !this.visibleAddProgressForm;
        this.visibleProgressList = !this.visibleProgressList;
    }

    toggleEditGoalForm = () => {
        this.visibleEditGoalForm = !this.visibleEditGoalForm;
        this.visibleProgressList = !this.visibleProgressList;
    }
    toggleStats = () => {
        this.visibleStats = !this.visibleStats;
        this.visibleProgressList = !this.visibleProgressList;
    }

    toggleEditProgressForm = () => {
        this.visibleEditProgressForm = !this.visibleEditProgressForm;
        this.visibleProgressList = !this.visibleProgressList;
    }

    showEditProgressForm = (progress: Progress) => {
        this.selectedProgress = progress;
        this.toggleEditProgressForm();
    }

    get showProgressAddForm() {
        const hasCategories = (store.goalStore.hasType(GoalType.Extended) && !!store.goalStore.selectedGoal?.categories?.length)

        return this.visibleAddProgressForm && (hasCategories || store.goalStore.hasType(GoalType.Standard))
    }

    get showCategoryAddForm() {
        return store.goalStore.hasType(GoalType.Extended) && 
                (this.visibleAddProgressForm || this.visibleEditProgressForm)
    }

    get disableAddProgressButton() {
        return !store.goalStore.hasStatus(GoalStatus.Current)
            || this.visibleEditGoalForm 
            || this.visibleEditProgressForm
            || this.visibleStats
    }

    get disableEditButton() {
        return store.goalStore.hasStatus(GoalStatus.Archvied)
            || this.visibleAddProgressForm 
            || this.visibleEditProgressForm
            || this.visibleStats
    }

    get disableStatsButton() {
        return this.visibleAddProgressForm 
            || this.visibleEditProgressForm 
            || this.visibleEditGoalForm 
    }

    get disableArchiveRestoreButton() {
        return store.goalStore.hasStatus(GoalStatus.Completed) || !this.visibleProgressList
    }
}