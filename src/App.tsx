import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import LoginPage from "./pages/login/LoginPage";
import { routes } from "./routes";
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"; 
import PrivateRoutes from '../src/routes/PrivateRoutes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoutes />}>
        <Route path="/" element={<MainLayout />}>
          {routes}
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
