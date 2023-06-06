import { useState } from "react";
import "../UserScreen.css";
import { deleteUsers } from "../UserScreenApi";
import ActivityLoader from "component/activityLoader";
import ErrorAlert from "component/errorAlert";

export const UserDeleteButton = (props) => {
  const { user, onUserDeleted } = props;
  const [loading, setLoading] = useState(false);

  const [errorDialogMsg, setErrorDialogMsg] = useState("");
  const [displayError, setDisplayError] = useState(false);

  const deleteUser = () => {
    setLoading(true);
    deleteUsers(user.id)
      .then((response) => {
        setLoading(false);
        onUserDeleted(user);
      })
      .catch((error) => {
        setLoading(false);
        setErrorDialogMsg("USER DELETION FAILED");
        setDisplayError(true);
      });
  };

  const onDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser();
    }
  };
  return (
    <div className='bg-red-800 text-white font-bold mb-2 rounded p-1 h-8 flex flex-col justify-center'>
      {loading ? (
        <ActivityLoader size='10px' />
      ) : (
        <button onClick={onDeleteClick}>Delete</button>
      )}
      <ErrorAlert
        open={displayError}
        errorMessage={errorDialogMsg}
        handleClose={() => {
          setDisplayError(false);
        }}
      />
    </div>
  );
};
