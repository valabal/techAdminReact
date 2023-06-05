import { Provider } from "react-redux";
import bootstrapSagas from "bootstrap/bootstrapSaga";
import { runSaga, store } from "config/store";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import MainRoute from "navigation/router";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  runSaga(bootstrapSagas);
  return (
    <div class='text-center'>
      <head>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />
      </head>
      <Provider store={store}>
        <MainRoute />
      </Provider>
    </div>
  );
}

export default App;
