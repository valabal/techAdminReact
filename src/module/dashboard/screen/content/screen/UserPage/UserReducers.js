import { initialState } from "./UserState";
import * as CONST from "./UserScreenConstant";

export const usersReducer = (state = initialState, action) => {
  console.log(action.payload);
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
          state.page > 0 ? [...state.users, ...action.payload] : action.payload,
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
    case CONST.USER_ADD:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case CONST.USER_CHANGED:
      const arr = state.users;
      const item = arr.find((item) => {
        return item.id === action.payload.id;
      });
      if (item) {
        const index = arr.indexOf(item);
        arr[index] = action.payload;
      } else {
        arr.push(action.payload);
      }
      return {
        ...state,
        users: arr,
      };
    default:
      return state;
  }
};
