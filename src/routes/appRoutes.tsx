import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import RobotPage from "../pages/dashboard/RobotPage";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import HomeIcon from '@mui/icons-material/Home';
import TaskPage from "../pages/configuracao/TaskPage";
import DadosPage from "../pages/configuracao/DadosPage";
import ComponentPageLayout from "../pages/configuracao/ComponentPageLayout";


const appRoutes: RouteType[] = [
  {
    index: true,
    path: "/",
    element: <HomePage />,
    state: "home",
    sidebarProps: {
      displayText: "HomePage",
      icon: <HomeIcon />
    }
  },
  {
    element:<RobotPage />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardOutlinedIcon />
    },
    child: [
      {
        path: "/dashboard/robot",
        element: <RobotPage />,
        state: "dashboard.robot",
        sidebarProps: {
          displayText: "Robot"
        },
      }/*,
      {
        path: "/dashboard/grafana",
        element: <AnalyticsPage />,
        state: "dashboard.grafana",
        sidebarProps: {
          displayText: "Grafana"
        }
      }*/
    ]
  },
  {
    element: <ComponentPageLayout />,
    state: "configuration",
    sidebarProps: {
      displayText: "Configuration",
      icon: <AppsOutlinedIcon />
    },
    child: [
      {
        path: "/configuration/task",
        element: <TaskPage />,
        state: "configuration.task",
        sidebarProps: {
          displayText: "Task"
        },
      },
      {
        path: "/configuration/dados",
        element: <DadosPage />,
        state: "configuration.dados",
        sidebarProps: {
          displayText: "Dados"
        }
      }
    ]
  }
];

export default appRoutes;