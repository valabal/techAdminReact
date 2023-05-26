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
    addUser,
    editUser,
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

  const onUserEdit = (user) => {
    editUser(user);
  };

  const onFABClick = () => {
    navigate("/dashboard/userAddScreen");
  };

  return (
    <div className='container_main_pin'>
      {getUserFetchStatus && <ActivityLoader />}
      {getUserError && <div>{getUserError}</div>}
      {(users?.length ?? 0) > 0 && (
        <div>
          <div className='pin_container'>
            {users.map((user) => (
              <UserCell {...{ user, onUserDeleted }} />
            ))}
          </div>
          <button onClick={onLoadMore}>Load More</button>
        </div>
      )}
      <Fab
        color='primary'
        aria-label='add'
        style={{ position: "absolute", right: 20, bottom: 20 }}
        onClick={onFABClick}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
