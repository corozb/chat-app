import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Chat from './components/Chat'
import Login from './components/Register/Login'
import SignUp from './components/Register/SignUp'

const Routes = () => {
	return (
		<Switch>
			<Route exact path='/' component={Chat} />
			<Route exact path='/login' component={Login} />
			<Route exact path='/signup' component={SignUp} />
		</Switch>
	)
}

export default Routes
