import { useEffect, useReducer, useState } from "react";
import { useQuery } from "react-query";
import * as CONST from "./DashboardContentConstant";
import { Avatar, Button, MenuItem } from "@mui/material";
import TextInput from "component/TextInput";
import { DashboardCard } from "./component/DashboardCard";
import { GenderBarChart, GenderPieChart } from "./component/DashboardBar";

const COLORS = ["#0088FE", "pink"];

export default function DashboardContent(props) {
  const { getContentData } = props;

  const { data, isLoading, isError, error, refetch } = useQuery(
    "users",
    getContentData
  );

  // useEffect(() => {
  //   loadContentData();
  // }, []);

  const [chartType, setChartType] = useState("Bar Chart");
  const [statistics, setStatistics] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const userData = data?.data;
    if (!userData) {
      return;
    }
    const maleUser = userData.filter((user) => user.gender === "male");
    const femaleUser = userData.filter((user) => user.gender === "female");
    setUsers({ male: maleUser, female: femaleUser });
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
    setStatistics(statistics);
  }, [data]);

  /*
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
*/

  const getErrorMessage = () => {
    return (
      error && (
        <h2 className='text-rose-600' data-testid='error-message'>
          Failed To Fetch Data Please Refresh the Browser
        </h2>
      )
    );
  };

  const onRefreshed = (event) => {
    console.log("REFETCHED");
    refetch();
  };

  return (
    <div className='p-3'>
      <h1 className='font-bold text-4xl p-4'>Dashboard Reports</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div data-testid='gender-detail'>
          <Button style={{ color: "white" }} onClick={onRefreshed}>
            REFRESH CONTENT
          </Button>
          <div className='flex flex-row mb-[20px]'>
            <DashboardCard label='Male' users={users.male} datatestid='Male'>
              <Avatar sx={{ bgcolor: "blue", width: 100, height: 100 }}>
                M
              </Avatar>
            </DashboardCard>
            <DashboardCard
              label='Female'
              users={users.female}
              datatestid='Female'
            >
              <Avatar sx={{ bgcolor: "pink", width: 100, height: 100 }}>
                F
              </Avatar>
            </DashboardCard>
          </div>
          {isError ? (
            getErrorMessage()
          ) : (
            <div className='text-left'>
              <div className='bg-white ml-4 mb-3 p-2 flex'>
                <TextInput
                  select
                  variant='standard'
                  label='Select Chart Type'
                  value={chartType}
                  onChange={(event) => {
                    setChartType(event.target.value);
                  }}
                  style={{ flex: 1 }}
                >
                  {["Bar Chart", "Pie Chart"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextInput>
              </div>
              {chartType === "Bar Chart"
                ? GenderBarChart(statistics)
                : GenderPieChart(statistics)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
