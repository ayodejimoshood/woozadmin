import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from "react-router-dom";


import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import auth from "redux/reducers/auth.js";

const App = (props) => {
  return (
    <div>
      <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Route path='/' render={() => {
            if (props.auth.user === null) {
              return <Redirect to='/auth/login' />
            } else {
              return <Redirect to='/admin/index' />
            }
          }} />
        </Switch>
    </div>
  )
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(App)
