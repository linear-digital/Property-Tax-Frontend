import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "./components/Layout/RootLayout";
import  Dashboard from "./components/Dashboard/Dashboard";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      }
    ]
  },
]);

export default router
