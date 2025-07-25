import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "./components/Layout/RootLayout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
  },
]);

export default router
