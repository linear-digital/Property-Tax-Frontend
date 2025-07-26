import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "./components/Layout/RootLayout";
import  Dashboard from "./components/Dashboard/Dashboard";
import ManageProperties from "./components/Properties/ManageProperties";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },{
        path: "property",
        element: <ManageProperties />,
      }
    ]
  },
]);

export default router
