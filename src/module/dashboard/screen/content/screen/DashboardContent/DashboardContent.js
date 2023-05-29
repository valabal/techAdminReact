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
        <h2 style={{ color: "red" }}>{dashboardState.getErrorMsg}</h2>
      )
    );
  };

  return (
    <div>
      <h1>Dashboard Report</h1>

      {dashboardState.isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div style={DashboardStyle.cardContainerStyle}>
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
            <div style={{ textAlign: "left" }}>
              <TextInput
                select
                variant='standard'
                label='Select Chart Type'
                value={chartType}
                onChange={(event) => {
                  setChartType(event.target.value);
                }}
                style={DashboardStyle.chartTypeInputStyle}
              >
                {["Bar Chart", "Pie Chart"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextInput>
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

const DashboardStyle = {
  cardContainerStyle: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
  },
  chartTypeInputStyle: {
    backgroundColor: "white",
    width: 300,
    height: 50,
    marginLeft: 15,
    marginBottom: 10,
  },
};
