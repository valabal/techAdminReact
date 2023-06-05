import DashboardScreen from "./dashboardScreen";
import { connect } from "react-redux";
import { loginReset } from "../../login/loginAction";
const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  userName: state.loginReducer.userName,
});

const mapDispatchToProps = { loginReset: () => loginReset() };

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
