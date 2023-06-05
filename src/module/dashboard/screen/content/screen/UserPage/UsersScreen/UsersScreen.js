import "../UserScreen.css";
import { UserCell } from "module/dashboard/screen/content/screen/UserPage/component/UserCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActivityLoader from "component/activityLoader";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function UserScreen(props) {
  const {
    getUserFetchStatus,
    users,
    getUserError,
    page,
    requestLoadUser,
    deleteUser,
  } = props;
  const navigate = useNavigate();

  const loadUsers = (page = 0) => {
    requestLoadUser(page);
  };
  useEffect(() => {
    if (users.length <= 0) {
      loadUsers();
    }
  }, []);

  const onLoadMore = (event) => {
    loadUsers(page);
  };

  const onUserDeleted = (user) => {
    deleteUser(user);
  };

  const onFABClick = () => {
    navigate("/dashboard/userAddScreen");
  };

  return (
    <div className='container_main_pin'>
      {getUserError && <div>{getUserError}</div>}
      {(users?.length ?? 0) > 0 && (
        <div>
          <div className='pin_container'>
            {users.map((user) => (
              <UserCell {...{ user, onUserDeleted }} />
            ))}
          </div>
          <div className='pb-5'>
            {getUserFetchStatus ? (
              <ActivityLoader />
            ) : (
              <button onClick={onLoadMore}>Load More</button>
            )}
          </div>
        </div>
      )}
      <Fab
        color='primary'
        aria-label='add'
        class='fixed right-[20px] bottom-[20px] bg-blue-500 rounded-full p-4'
        onClick={onFABClick}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
