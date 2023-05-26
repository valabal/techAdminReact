import { useState } from "react";
import "../UserScreen.css";
import { deleteUsers } from "../UserScreenApi";
import ActivityLoader from "component/activityLoader";

export const UserDeleteButton = (props) => {
  const { user, onUserDeleted } = props;
  const [loading, setLoading] = useState(false);

  const deleteUser = () => {
    setLoading(true);
    deleteUsers(user.id)
      .then((response) => {
        setLoading(false);
        onUserDeleted(user);
      })
      .catch((error) => {
        setLoading(false);
        window.alert("USER DELETION FAILED");
      });
  };

  const onDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser();
    }
  };
  return (
    <>
      {loading ? (
        <ActivityLoader size='10px' />
      ) : (
        <button onClick={onDeleteClick}>Delete</button>
      )}
    </>
  );
};
