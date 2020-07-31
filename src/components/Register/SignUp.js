import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Grid,
	Typography,
	Container,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import firebase from 'firebase'

import Notification from '../Utils/Notifcation'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

const SignUp = ({ history }) => {
	const classes = useStyles()
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		avatar: '',
	})

	const [alertMessage, setAlertMessage] = useState({
		message: 'Welcome to ChatApp',
		severity: 'success',
	})

	const handleChange = (event) => {
		setUser({
			...user,
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		setAlertMessage(null)

		firebase
			.auth()
			.createUserWithEmailAndPassword(user.email, user.password)
			.then((response) => {
				delete user.password
				firebase.database().ref(`/users/${response.user.uid}`).set(user)
				setAlertMessage({
					message: 'Welcome to ChatApp',
					severity: 'success',
				})
				history.push('/')
			})
			.catch((error) => {
				console.log(error)
				setAlertMessage({
					message: error.message,
					severity: 'error',
				})
			})
	}

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete='fname'
								name='name'
								variant='outlined'
								required
								fullWidth
								id='name'
								label='Name'
								autoFocus
								value={user.name}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='avatar'
								label='Avatar URL'
								name='avatar'
								value={user.avatar}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								type='email'
								autoComplete='email'
								value={user.email}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								value={user.password}
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						Sign Up
					</Button>
					<Grid container justify='flex-end'>
						<Grid item>
							<Link to='/login'>Already have an account? Sign in</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			{alertMessage && (
				<Notification
					message={alertMessage.message}
					severity={alertMessage.severity}
				/>
			)}
		</Container>
	)
}

export default withRouter(SignUp)
