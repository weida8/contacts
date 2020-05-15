import React from 'react'
import { Router } from "@reach/router"
import Login from './components/login'
import Register from './components/register'
import Contacts from './components/contacts'
import {getCookie} from './util/auth'

const PrivateRoute = ({component: Component, ...rest}) => {
  if(getCookie('userToken') && getCookie('userName')) {
      return <Component {...rest}/>
  }
  return <Login />
}

const Routes = () => (
  <Router>
    <Login path='/login'/>
    <Register path='/register'/>
    <PrivateRoute component={Contacts} path='/contacts'/>
  </Router>
)

export default Routes;
