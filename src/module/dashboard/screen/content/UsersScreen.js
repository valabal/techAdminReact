import "./UserScreen.css";
import { UserCell } from "./component/UserCard";
import * as CONST from "./UserScreenConstant";
import { useEffect, useReducer } from "react";
import { getUsers } from "./UserScreenApi";
import ActivityLoader from "component/activityLoader";

export default function UserScreen(props) {
  const initialState = {
    getUserFetchStatus: false,
    users: [],
    getUserError: null,
    page: 0,
  };

  const usersReducer = (state, action) => {
    switch (action.type) {
      case CONST.GET_USER_REQ:
        return {
          ...state,
          getUserFetchStatus: true,
          getUserError: null,
          page: action.payload,
        };
      case CONST.GET_USER_SUCCESS:
        return {
          ...state,
          getUserFetchStatus: false,
          users:
            state.page > 0
              ? [...state.users, ...action.payload]
              : action.payload,
          page: state.page + 1,
        };
      case CONST.GET_USER_FAILED:
        return {
          ...state,
          getUserFetchStatus: false,
          getUserError: action.payload,
        };
      case CONST.USER_DELETED:
        return {
          ...state,
          users: state.users.filter((user) => user.id !== action.payload.id),
        };
      default:
        throw new Error();
    }
  };

  const [userStates, dispatchUsers] = useReducer(usersReducer, []);

  const loadUsers = (page = 0) => {
    dispatchUsers({ type: CONST.GET_USER_REQ, payload: page });
    getUsers(page)
      .then((response) => {
        console.log("output users");
        const users = response.data?.data ?? [];
        dispatchUsers({ type: CONST.GET_USER_SUCCESS, payload: users });
      })
      .catch((error) => {
        console.log(error);
        console.log("error user");
        dispatchUsers({
          type: CONST.GET_USER_FAILED,
          payload: "User List not Found",
        });
      });
  };

  useEffect(() => {
    console.log("CALLING HELP");
    loadUsers();
  }, []);

  const onLoadMore = (event) => {
    loadUsers(userStates.page);
  };

  const onUserDeleted = (user) => {
    dispatchUsers({ type: CONST.USER_DELETED, payload: user });
  };

  return (
    <div className='container_main_pin'>
      {userStates.getUserFetchStatus && <ActivityLoader />}
      {userStates.getUserError && <div>{userStates.getUserError}</div>}
      {(userStates.users?.length ?? 0) > 0 && (
        <div>
          <div className='pin_container'>
            {userStates.users.map((user) => (
              <UserCell {...{ user, onUserDeleted }} />
            ))}
          </div>
          <button onClick={onLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
}
