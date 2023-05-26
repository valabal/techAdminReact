import { connect } from "react-redux";
import {
  requestLoadUser,
  deleteUsers,
  addUsers,
  editUsers,
} from "../UserAction";
import UserScreen from "./UsersScreen";

const mapStateToProps = (state) => ({
  getUserFetchStatus: state.usersReducer.getUserFetchStatus,
  users: state.usersReducer.users,
  getUserError: state.usersReducer.getUserError,
  page: state.usersReducer.page,
});

const mapDispatchToProps = {
  requestLoadUser: (page) => requestLoadUser(page),
  deleteUser: (payload) => deleteUsers(payload),
  addUser: (payload) => addUsers(payload),
  editUser: (payload) => editUsers(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
