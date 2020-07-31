import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import firebase from 'firebase'

import Header from './components/Layout/Header'
import User from './components/User/User'
import Routes from './Routes'
import { firebaseConfig } from './config/firebaseConfig'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const App = () => {
	const [user, setUser] = useState(null)

	const onLogout = () => {
		setUser(null)
	}

	useEffect(() => {
		firebase.auth().onAuthStateChanged((response) => {
			if (response) {
				firebase
					.database()
					.ref(`/users/${response.uid}`)
					.once('value')
					.then((snapshot) => {
						setUser(snapshot.val())
					})
			}
		})
	}, [])

	return (
		<Router>
			<CssBaseline />
			<Header>{user && <User user={user} onLogout={onLogout} />}</Header>
			<Routes />
		</Router>
	)
}

export default App
