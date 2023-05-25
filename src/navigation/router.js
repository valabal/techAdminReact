import LoginScreen from "module/login/screen/index";
import DashboardScreen from "module/dashboard/screen/dashboardScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardContent from "module/dashboard/screen/content/DashboardContent";
import UsersScreen from "module/dashboard/screen/content/UsersScreen";
import UserEditScreen from "module/dashboard/screen/content/UserEditScreen";

export default function MainRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginScreen />}></Route>
        <Route path='dashboard' element={<DashboardScreen />}>
          <Route index element={<DashboardContent />} />
          <Route path='userScreen' element={<UsersScreen />} />
          <Route path='userEditScreen/:id' element={<UserEditScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
