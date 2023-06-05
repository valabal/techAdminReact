import LoginScreen from "module/login/screen/index";
import DashboardScreen from "module/dashboard/screen/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardWrapper } from "module/dashboard/screen/content/screen/DashboardContent/index";
import UsersScreen from "module/dashboard/screen/content/screen/UserPage/UsersScreen/index";
import UserEditScreen from "module/dashboard/screen/content/screen/UserPage/UserEditScreen/index";
import UserAddScreen from "module/dashboard/screen/content/screen/UserPage/UserAddScreen/index";

export default function MainRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginScreen />}></Route>
        <Route path='dashboard' element={<DashboardScreen />}>
          <Route index element={<DashboardWrapper />} />
          <Route path='userScreen' element={<UsersScreen />} />
          <Route path='userEditScreen/:id' element={<UserEditScreen />} />
          <Route path='userAddScreen' element={<UserAddScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
