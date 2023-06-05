import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

export const DashboardCard = ({ label, users, children }) => {
  return (
    <div className='w-[320px] m-3 p-3 rounded-2xl bg-white'>
      <div className='flex items-center flex-col p-[10px]'>{children}</div>
      <CardContent>
        <Typography
          gutterBottom
          variant='h5'
          component='div'
          color='text.primary'
        >
          Total of {label}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {users?.length ?? 0} Users
        </Typography>
      </CardContent>
      <CardActions className='flex flex-col items-center'>
        <Button size='small'>Details</Button>
      </CardActions>
    </div>
  );
};
