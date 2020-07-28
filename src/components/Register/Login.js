import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'

import {
	Avatar,
	CssBaseline,
	TextField,
	Grid,
	Typography,
	Container,
	Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import firebase from 'firebase'

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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

const Login = ({ history }) => {
	const classes = useStyles()
	const [user, setUser] = useState({
		email: '',
		password: '',
	})

	const handleChange = (event) => {
		setUser({
			...user,
			[event.target.name]: event.target.value,
		})
	}

	const handleLogin = (event) => {
		event.preventDefault()
		firebase
			.auth()
			.signInWithEmailAndPassword(user.email, user.password)
			.then((response) => {
				history.push('/')
			})
			.catch((error) => {
				console.log(error)
				alert(error.message)
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
					Sign in
				</Typography>
				<form className={classes.form} onSubmit={handleLogin}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						autoFocus
						defaultValue={user.email}
						onChange={handleChange}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						defaultValue={user.password}
						onChange={handleChange}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						Sign In
					</Button>
					<Grid container>
						<Grid item>
							<Link to='/signup'>{"Don't have an account? Sign Up"}</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	)
}

export default withRouter(Login)
