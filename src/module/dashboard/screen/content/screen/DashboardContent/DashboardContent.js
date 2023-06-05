import { useEffect, useReducer, useState } from "react";

import * as CONST from "./DashboardContentConstant";
import { Avatar, MenuItem } from "@mui/material";
import TextInput from "component/TextInput";
import { DashboardCard } from "./component/DashboardCard";
import { GenderBarChart, GenderPieChart } from "./component/DashboardBar";

const COLORS = ["#0088FE", "pink"];

export default function DashboardContent(props) {
  const { getContentData } = props;
  useEffect(() => {
    loadContentData();
  }, []);

  const [chartType, setChartType] = useState("Bar Chart");

  const initState = {
    isLoading: false,
    users: {},
    getErrorMsg: null,
    statistics: [],
  };

  const dashboardReducer = (state, action) => {
    switch (action.type) {
      case CONST.GET_DATA_REQ:
        return {
          ...state,
          isLoading: true,
          getErrorMsg: null,
        };
      case CONST.GET_DATA_SUCCESS:
        const userData = action.payload;
        const maleUser = userData.filter((user) => user.gender === "male");
        const femaleUser = userData.filter((user) => user.gender === "female");
        const statistics = [
          {
            name: "Male",
            count: maleUser.length,
          },
          {
            name: "Female",
            count: femaleUser.length,
          },
        ];
        return {
          ...state,
          isLoading: false,
          users: { male: maleUser, female: femaleUser },
          statistics,
        };
      case CONST.GET_DATA_FAILED:
        return {
          ...state,
          isLoading: false,
          getErrorMsg: action.payload,
        };
      default:
        return initState;
    }
  };

  const [dashboardState, dashboardDispatch] = useReducer(
    dashboardReducer,
    initState
  );

  const loadContentData = () => {
    dashboardDispatch({ type: CONST.GET_DATA_REQ });
    getContentData()
      .then((response) => {
        dashboardDispatch({
          type: CONST.GET_DATA_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dashboardDispatch({
          type: CONST.GET_DATA_FAILED,
          payload: "Failed To Fetch Data Please Refresh the Browser",
        });
      });
  };

  const getErrorMessage = () => {
    return (
      dashboardState.getErrorMsg && (
        <h2 className='text-rose-600'>{dashboardState.getErrorMsg}</h2>
      )
    );
  };

  return (
    <div className='p-3'>
      <h1 className='font-bold text-4xl p-4'>Dashboard Reports</h1>
      {dashboardState.isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className='flex flex-row mb-[20px]'>
            <DashboardCard label='Male' users={dashboardState.users.male}>
              <Avatar sx={{ bgcolor: "blue", width: 100, height: 100 }}>
                M
              </Avatar>
            </DashboardCard>
            <DashboardCard label='Female' users={dashboardState.users.female}>
              <Avatar sx={{ bgcolor: "pink", width: 100, height: 100 }}>
                F
              </Avatar>
            </DashboardCard>
          </div>
          {dashboardState.getErrorMsg ? (
            getErrorMessage()
          ) : (
            <div className='text-left'>
              <div className='bg-white ml-4 mb-3 p-2'>
                <TextInput
                  select
                  variant='standard'
                  label='Select Chart Type'
                  value={chartType}
                  onChange={(event) => {
                    setChartType(event.target.value);
                  }}
                  style={{ width: 320 }}
                >
                  {["Bar Chart", "Pie Chart"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextInput>
              </div>
              {chartType === "Bar Chart"
                ? GenderBarChart(dashboardState.statistics)
                : GenderPieChart(dashboardState.statistics)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
