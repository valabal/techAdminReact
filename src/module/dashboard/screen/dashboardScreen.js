import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./dashboardScreen.css";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DashboardScreen(props) {
  const userName = localStorage.getItem("username", props.userName);
  const token = localStorage.getItem("token", props.userName);
  console.log(userName);
  console.log(token);
  const navigate = useNavigate();
  const emptyTokenAndSession = (event) => {
    event.preventDefault();
    localStorage.setItem("username", "");
    localStorage.setItem("token", "");
    props.loginReset();
    navigate(`/`);
  };
  return (
    <div class='flex flex-col h-screen'>
      <header class='font-bold text-3xl p-3'>
        <p>Dashboard Screens</p>
      </header>
      <div class='flex-1'>
        {!userName || !token ? (
          <p class='text-red-800 font-bold text-2xl align-center justify-center m-auto'>
            You must login first to used this feature!
            <br />
            <a class='text-rose-900 font-bold' href={`/`}>
              Log Out
            </a>
          </p>
        ) : (
          <div class='flex flex-row h-full'>
            <div class='bg-gray-400 flex flex-col flex-1'>
              <div class='flex flex-col pt-10'>
                <p class='font-bold text-l'>Welcome</p>
                <div class='self-center p-5'>
                  <Avatar sx={{ bgcolor: "blue", width: 100, height: 100 }}>
                    Test User
                  </Avatar>
                </div>
                <p class='font-bold text-m'>{userName}</p>
              </div>
              <nav>
                <ul class='space-y-3 pt-3'>
                  <li class='bg-red-500 py-4 font-bold rounded-xl mx-10 text-white'>
                    <Link to={``}>Dashboard</Link>
                  </li>
                  <li class='bg-green-600 py-4 font-bold rounded-xl mx-10 text-white'>
                    <Link to={`userScreen`}>User Management</Link>
                  </li>
                  <li class='text-rose-900 font-bold pt-5'>
                    <a href={`/`} onClick={emptyTokenAndSession}>
                      Log Out
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className='content'>
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
