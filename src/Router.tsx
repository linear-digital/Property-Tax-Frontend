import {
  createBrowserRouter,
  Outlet,
} from "react-router";
import RootLayout from "./components/Layout/RootLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import ManageProperties from "./components/Properties/ManageProperties";
import CreateProperty from "./components/Properties/CreateProperty";
import TaxInvoice from "./components/Billing/TaxInvoice";
import InvoicePayments from "./components/Billing/InvoicePayments";
import TaxSummary from "./components/Billing/TaxSummary";
import Agents from "./components/Billing/Agents";
import AgentFloat from "./components/Billing/AgentFloat";
import Commissions from "./components/Billing/Commissions";
import EditRequest from "./components/Properties/EditRequest";
import Index from "./components/Locations/State";
import Regions from "./components/Locations/Regions";
import Districts from "./components/Locations/Districts";
import Villages from "./components/Locations/Villages";
import Branches from "./components/Locations/Branches";
import AddState from "./components/Locations/Modal/AddState";
import AddRegion from "./components/Locations/Modal/AddRegion";
import AddDistrict from "./components/Locations/Modal/AddDistrict";
import AddVillage from "./components/Locations/Modal/AddVillage";
import AddBranch from "./components/Locations/Modal/AddBranch";
import Users from "./components/Users/Users";
import Roles from "./components/Roles/Roles";
import CreateRole from "./components/Roles/CreateRole";
import Login from "./components/auth/Login";
import AddPropertyFromExcel from "./components/Properties/AddPropertyFromExcel";
import Invoice from "./components/Billing/Invoice";
import AgentProfile from "./components/Billing/AgentProfile";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "property",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <ManageProperties />
          },
          {
            path: ":id",
            element: <CreateProperty />
          }, {
            path: "create",
            element: <CreateProperty />
          }, {
            path: "create-multiple",
            element: <AddPropertyFromExcel />
          },
          {
            path: "edit-request",
            element: <EditRequest />
          }
        ]
      },
      {
        path: 'billing',
        element: <Outlet />,
        children: [
          {
            path: 'invoices',
            element: <TaxInvoice />
          }, {
            path: 'invoice/:id',
            element: <Invoice />
          }, {
            path: 'payments',
            element: <InvoicePayments page="payments" />
          }, {
            path: 'unauthorized-payments',
            element: <InvoicePayments page="unauthorized" />
          }, {
            path: 'authorised',
            element: <InvoicePayments page="authorized" />
          }, {
            path: 'summarys',
            element: <TaxSummary />
          }, {
            path: 'agents',
            element: <Agents />
          }, {
            path: 'agents/:id',
            element: <AgentProfile />
          }, {
            path: 'agent-float',
            element: <AgentFloat />
          }, {
            path: 'commissions',
            element: <Commissions />
          }
        ]
      },
      {
        path: 'locations',
        element: <Outlet />,
        children: [
          {
            path: 'states',
            element: <Index />
          }, {
            path: 'add-state',
            element: <AddState />
          }, {
            path: 'states/:id',
            element: <AddState />
          },
          {
            path: 'regions',
            element: <Regions />
          },
          {
            path: 'regions/:id',
            element: <AddRegion />
          },
          {
            path: 'add-region',
            element: <AddRegion />
          }, {
            path: 'add-district',
            element: <AddDistrict />
          }, {
            path: 'districts/:id',
            element: <AddDistrict />
          }, {
            path: 'add-village',
            element: <AddVillage />
          }, {
            path: 'villages/:id',
            element: <AddVillage />
          }, {
            path: 'add-branch',
            element: <AddBranch />
          }, {
            path: 'branches/:id',
            element: <AddBranch />
          },

          {
            path: 'districts',
            element: <Districts />
          },
          {
            path: 'villages',
            element: <Villages />
          },
          {
            path: 'branches',
            element: <Branches />
          }
        ]
      },
      {
        path: 'users',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Users />
          },
          {
            path: 'list',
            element: <Users />
          }
        ]
      },
      {
        path: 'roles',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Roles />
          }, {
            path: ':id',
            element: <CreateRole />
          }, {
            path: 'create',
            element: <CreateRole />
          }
        ]
      }

    ]
  },
]);

export default router
