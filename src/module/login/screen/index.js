import { connect } from "react-redux";
import { requestLogin, requestRegister } from "../loginAction";

import LoginScreen from "./LoginScreen";

const mapStateToProps = (state) => ({
  isLoginLoading: state.loginReducer.getLoginFetchStatus,
  token: state.loginReducer.token,
  isLogin: state.loginReducer.isLogin,
  loginError: state.loginReducer.getLoginError,
  isRegisterLoading: state.loginReducer.getRegisterFetchStatus,
  registerError: state.loginReducer.getRegisterError,
});

const mapDispatchToProps = {
  requestLogin: (payload) => requestLogin(payload),
  requestRegister: (payload) => requestRegister(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
