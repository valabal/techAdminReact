import { Provider } from "react-redux";
import bootstrapSagas from "bootstrap/bootstrapSaga";
import { runSaga, store } from "config/store";
import "./App.css";
import LoginScreen from "module/login/screen/index";
export { default as LoginScreen } from "module/login/screen";
function App() {
  runSaga(bootstrapSagas);
  return (
    <div className='App'>
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    </div>
  );
}

export default App;
