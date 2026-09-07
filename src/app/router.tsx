import { createBrowserRouter, Navigate } from "react-router-dom";

import Users from "../pages/Users/Users";
import Tasks from "../pages/Tasks/Tasks";
import Projects from "../pages/Projects/Projects";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "projects",
            element: <Projects />,
          },
          {
            path: "tasks",
            element: <Tasks />,
          },
          {
            path: "users",
            element: <Users />,
          },
        ],
      },
    ],
  },
]);
