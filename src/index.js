import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store.js'
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/woozeee-admin-dashboard.scss";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import AdminLayout from 'layouts/Admin'
import AuthLayout from 'layouts/Auth'
import App from "components/App.js";




ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="top-center"
      getState={(state) => state.toastr} // This is the default
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick/>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="/" to="/auth/login" />
        </Switch>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
