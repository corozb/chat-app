import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import Header from './Layout/Header'

const App = () => {
	return (
		<Router>
			<CssBaseline />
			<Header />
		</Router>
	)
}

export default App
