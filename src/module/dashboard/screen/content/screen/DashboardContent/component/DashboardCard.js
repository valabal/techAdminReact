import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

export const DashboardCard = ({ label, users, children }) => {
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
