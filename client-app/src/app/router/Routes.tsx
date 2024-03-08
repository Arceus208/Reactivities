import {
  Navigate,
  RouteObject,
  createBrowserRouter,
} from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "",
        element: <HomePage></HomePage>,
      },
      {
        path: "activities",
        element: (
          <ActivityDashBoard></ActivityDashBoard>
        ),
      },
      {
        path: "activities/:id",
        element: (
          <ActivityDetails></ActivityDetails>
        ),
      },
      {
        path: "createActivity",
        element: (
          <ActivityForm key="create"></ActivityForm>
        ),
      },
      {
        path: "manage/:id",
        element: (
          <ActivityForm key="manage"></ActivityForm>
        ),
      },
      {
        path: "errors",
        element: <TestErrors></TestErrors>,
      },
      {
        path: "not-found",
        element: <NotFound></NotFound>,
      },
      {
        path: "server-error",
        element: <ServerError></ServerError>,
      },
      {
        path: "*",
        element: (
          <Navigate
            replace
            to="/not-found"
          ></Navigate>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
