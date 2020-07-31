import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Chat from './components/Chat/Chat'
import Login from './components/Register/Login'
import SignUp from './components/Register/SignUp'
import Profile from './components/User/Profile'

const Routes = () => {
	return (
		<Switch>
			<Route exact path='/' component={Chat} />
			<Route exact path='/login' component={Login} />
			<Route exact path='/signup' component={SignUp} />
			<Route exact path='/profile' component={Profile} />
		</Switch>
	)
}

export default Routes
