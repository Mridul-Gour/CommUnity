
import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "./components/pages/Sidebar";

function App() {
  const location = useLocation();
  const hiddenSidebarRoutes = ["/signup", "/login", "/adminlogin", "/userlogin","/"];
  const isSidebarHidden = hiddenSidebarRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {!isSidebarHidden && <Sidebar />}
      <div className={isSidebarHidden ? "main-content no-sidebar" : "main-content"}>
        <Outlet /> 
      </div>
    </div>
  );
}

export default App;
