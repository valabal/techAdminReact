import { connect } from "react-redux";
import { addUsers } from "../UserAction";
import UserAddScreen from "./UserAddScreen";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  addUserAction: (payload) => addUsers(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAddScreen);
