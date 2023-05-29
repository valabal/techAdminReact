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

const COLORS = ["#0088FE", "pink"];

export const GenderBarChart = (statistics) => {
  return (
    <div data-testid='user-bar'>
      <BarChart width={300} height={300} data={statistics}>
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
          {statistics.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export const GenderPieChart = (statistics) => {
  return (
    <div data-testid='user-pie'>
      <PieChart width={300} height={300}>
        <Tooltip />
        <Legend />
        <Pie
          data={statistics}
          cx='50%'
          cy='50%'
          labelLine={false}
          label
          outerRadius={80}
          fill='#8884d8'
          dataKey='count'
        >
          {statistics.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};
