import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./dashboardScreen.css";

export default function DashboardScreen(props) {
  return (
    <div className='mainContainer'>
      <header>
        <p>Dashboard Screen</p>
      </header>
      <div>
        <div className='container'>
          <div className='sideBar'>
            <nav>
              <ul>
                <li>
                  <Link to={``}>Dashboard</Link>
                </li>
                <li>
                  <Link to={`userScreen`}>Users</Link>
                </li>
                <li>
                  <a href={`/`}>Log Out</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className='content'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
