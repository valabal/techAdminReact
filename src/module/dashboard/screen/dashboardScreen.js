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
    <div className='flex flex-col h-screen'>
      <header className='font-bold text-3xl p-3'>
        <p>Dashboard Screens</p>
      </header>
      <div className='flex-1'>
        {!userName || !token ? (
          <p className='text-red-800 font-bold text-2xl align-center justify-center m-auto'>
            You must login first to used this feature!
            <br />
            <a className='text-rose-900 font-bold' href={`/`}>
              Log Out
            </a>
          </p>
        ) : (
          <div className='flex flex-row h-full'>
            <div className='bg-gray-400 flex flex-col flex-1'>
              <div className='flex flex-col pt-10'>
                <p className='font-bold text-l'>Welcome</p>
                <div className='self-center p-5'>
                  <Avatar sx={{ bgcolor: "blue", width: 100, height: 100 }}>
                    Test User
                  </Avatar>
                </div>
                <p className='font-bold text-m'>{userName}</p>
              </div>
              <nav>
                <ul className='space-y-3 pt-3'>
                  <li className='bg-red-500 py-4 font-bold rounded-xl mx-10 text-white'>
                    <Link to={``}>Dashboard</Link>
                  </li>
                  <li className='bg-green-600 py-4 font-bold rounded-xl mx-10 text-white'>
                    <Link to={`userScreen`}>User Management</Link>
                  </li>
                  <li className='text-rose-900 font-bold pt-5'>
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
