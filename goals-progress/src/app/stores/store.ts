import { createContext, useContext } from "react";
import GoalStore from "./goalStore";
import CommonStore from "./commonStore";

interface Store {
    goalStore: GoalStore;
    commonStore: CommonStore;
}

export const store: Store = {
    goalStore: new GoalStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}