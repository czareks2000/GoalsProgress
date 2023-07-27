import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import CurrentGoals from "../../components/goals/CurrentGoals";
import GoalDetails from "../../components/details/GoalDetails";
import GoalCreate from "../../components/forms/goal/GoalCreate";
import ArchviedGoals from "../../components/goals/ArchviedGoals";
import Settings from "../../components/settings/Settings";
import NotFound from "../../components/errors/NotFound";
import Unauthorised from "../../components/errors/Unauthorised";
import Forbidden from "../../components/errors/Forbidden";
import ServerError from "../../components/errors/ServerError";

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
            {path: 'not-found', element: <NotFound />},
            {path: 'unauthorised', element: <Unauthorised />},
            {path: 'forbidden', element: <Forbidden />},
            {path: 'server-error', element: <ServerError />},
            {path: '*', element: <NotFound />}
        ]
    }
]

export const router = createBrowserRouter(routes);