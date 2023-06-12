import { Provider } from "react-redux";
import bootstrapSagas from "bootstrap/bootstrapSaga";
import { runSaga, store } from "config/store";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import MainRoute from "navigation/router";
import { QueryClient, QueryClientProvider } from "react-query";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const queryClient = new QueryClient();

  runSaga(bootstrapSagas);
  return (
    <div className='text-center'>
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
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MainRoute />
          </LocalizationProvider>
        </Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
