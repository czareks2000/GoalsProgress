import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import CurrentGoals from "../../components/goals/CurrentGoals";
import GoalDetails from "../../components/details/GoalDetails";
import GoalCreate from "../../components/forms/goal/GoalCreate";
import ArchviedGoals from "../../components/goals/ArchviedGoals";
import Settings from "../../components/settings/Settings";
import NotFound from "../../components/errors/NotFound";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {path: 'goals', element: <CurrentGoals />},
            {path: 'goal/:id', element: <GoalDetails />},
            {path: 'goal/create', element: <GoalCreate />},
            {path: 'archived', element: <ArchviedGoals />},
            {path: 'settings', element: <Settings />},
            {path: '*', element: <NotFound />}
        ]
    }
]

export const router = createBrowserRouter(routes);