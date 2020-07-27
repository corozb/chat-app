import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import Header from './components/Layout/Header'
import User from './components/User'
import Routes from './Routes'

const App = () => {
	return (
		<Router>
			<CssBaseline />
			<Header>
				<User />
			</Header>
			<Routes />
		</Router>
	)
}

export default App
