import { connect } from "react-redux";
import { editUsers } from "../UserAction";
import UserEditScreen from "./UserEditScreen";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  editUserAction: (payload) => editUsers(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditScreen);
