import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Error } from "@mui/icons-material";
import { red } from "@mui/material/colors";

const ErrorAlert = (props) => {
  const { open, errorMessage, handleClose, alertTitle } = props;
  return (
    <Dialog
      open={open}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        <span className='flex flex-row justify-center items-center'>
          <Error sx={{ color: red[500], fontSize: 35 }} className='mr-1' />
          <p className='text-l font-bold'>{alertTitle ?? "ALERT"}</p>
        </span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {errorMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <div className='flex w-[100px] items-center justify-center bg-rose-600 mb-3'>
          <Button style={{ color: "white" }} onClick={handleClose}>
            OK
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorAlert;
