import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./hooks/useAuth";
import "./index.css";
import Root from "./layouts/Root";
import store from "./redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="seasonal-work-frontend">
        <Root>
          <AuthProvider>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <App />
          </AuthProvider>
        </Root>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
