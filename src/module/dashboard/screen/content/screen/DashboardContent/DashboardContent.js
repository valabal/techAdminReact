import { useEffect, useReducer, useState } from "react";
import { getContentData } from "./DashboardContentApi";
import * as CONST from "./DashboardContentConstant";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Male from "@mui/icons-material/Male";
import Female from "@mui/icons-material/Female";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import TextInput from "component/TextInput";
import MenuItem from "@mui/material/MenuItem";

const DashboardContent = () => {
  useEffect(() => {
    loadContentData();
  }, []);

  const [chartType, setChartType] = useState("Bar");

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

  const UserCard = ({ label, users, children }) => {
    return (
      <Card sx={{ width: 320, margin: "10px", padding: "10px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "10px",
          }}
        >
          {children}
        </div>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Total of {label}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {users?.length ?? 0} Users
          </Typography>
        </CardContent>
        <CardActions
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button size='small'>Details</Button>
        </CardActions>
      </Card>
    );
  };

  const barChart = () => {
    return (
      <BarChart width={300} height={300} data={dashboardState.statistics}>
        <Tooltip />
        <XAxis
          dataKey='name'
          style={{ fill: "white" }}
          axisLine={{ stroke: "#EAF0F4" }}
          tickLine={{ stroke: "#EAF0F4" }}
        />
        <YAxis
          style={{ fill: "white" }}
          axisLine={{ stroke: "#EAF0F4" }}
          tickLine={{ stroke: "#EAF0F4" }}
        />
        <Bar dataKey='count'>
          {dashboardState.statistics.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    );
  };

  const getErrorMessage = () => {
    return (
      dashboardState.getErrorMsg && (
        <h2 style={{ color: "red" }}>{dashboardState.getErrorMsg}</h2>
      )
    );
  };

  const COLORS = ["#0088FE", "pink"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline='central'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const pieChart = () => {
    return (
      <PieChart width={300} height={300}>
        <Tooltip />
        <Legend />
        <Pie
          data={dashboardState.statistics}
          cx='50%'
          cy='50%'
          labelLine={false}
          label
          outerRadius={80}
          fill='#8884d8'
          dataKey='count'
        >
          {dashboardState.statistics.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  };

  return (
    <div>
      <h1>Dashboard Report</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 20,
        }}
      >
        <UserCard label='Male' users={dashboardState.users.male}>
          <Avatar sx={{ bgcolor: "blue", width: 100, height: 100 }}>
            <Male sx={{ width: 50, height: 50 }} />
          </Avatar>
        </UserCard>
        <UserCard label='Female' users={dashboardState.users.female}>
          <Avatar sx={{ bgcolor: "pink", width: 100, height: 100 }}>
            <Female sx={{ width: 50, height: 50 }} />
          </Avatar>
        </UserCard>
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
            style={{
              backgroundColor: "white",
              width: 300,
              height: 50,
              marginLeft: 15,
              marginBottom: 10,
            }}
          >
            {["Bar", "Pie"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextInput>
          {chartType === "Bar" ? barChart() : pieChart()}
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
