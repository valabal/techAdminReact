import { connect } from "react-redux";
import {
  requestLoginSuccess,
  requestRegisterSuccess,
  loginReset,
} from "../loginAction";

import LoginScreen from "./LoginScreen";

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  userName: state.loginReducer.userName,
  isLogin: state.loginReducer.isLogin,
});

const mapDispatchToProps = {
  requestLoginSuccess: (payload) => requestLoginSuccess(payload),
  requestRegisterSuccess: (payload) => requestRegisterSuccess(payload),
  loginReset: () => loginReset(),
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
