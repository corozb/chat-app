import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Grid,
	Typography,
	Container,
	Input,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import firebase from 'firebase'

import Notification from '../Utils/Notifcation'
import LoadUser from '../Utils/LoadUser'

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
	large: {
		width: theme.spacing(15),
		height: theme.spacing(15),
	},
	space: {
		marginTop: 10,
		marginBottom: 10,
	},
	filename: {
		marginLeft: 20,
	},
	file: {
		marginTop: 20,
		marginBottom: 10,
		marginLeft: '-1px',
	},
}))

const Profile = ({ history }) => {
	const classes = useStyles()
	const [user, setUser] = useState({
		name: '',
		email: '',
		avatar: '',
	})

	const [alertMessage, setAlertMessage] = useState(null)
	const [image, setImage] = useState(null)

	const handleChange = (event) => {
		setUser({
			...user,
			[event.target.name]: event.target.value,
		})
	}

	const handleImage = (event) => {
		if (!event.target.files[0]) return
		const file = event.target.files[0]

		setImage({
			type: file.type.split('/')[1],
			file,
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		setAlertMessage(null)
		const { currentUser } = firebase.auth()

		if (image) {
			user.avatar = `${currentUser.uid}.${image.type}`
			firebase
				.storage()
				.ref(`/avatars/${user.avatar}`)
				.put(image.file)
				.then(() => {
					// Obtain URL
					firebase
						.storage()
						.ref()
						.child(`/avatars/${user.avatar}`)
						.getDownloadURL()
						.then((url) => {
							setUser({ ...user, avatar: url })
						})
				})
		}

		firebase
			.database()
			.ref(`/users/${currentUser.uid}`)
			.update(user)
			.then((response) => {
				setAlertMessage({
					message: 'Profile Updated successfully',
					severity: 'success',
				})
			})
			.catch((error) => {
				setAlertMessage({
					message: error.message,
					severity: 'error',
				})
			})
	}

	useEffect(() => {
		if (firebase.auth().currentUser) {
			// Read data
			LoadUser(firebase.auth().currentUser.uid).then(
				(data) => {
					setUser(data)
				},
				(error) => {
					setAlertMessage({
						message: error.message,
						severity: 'error',
					})
				}
			)
		} else {
			history.push('/login')
		}
	}, [])

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component='h1' variant='h5'>
					{user.name} Profile
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid
						container
						justify='center'
						alignItems='center'
						direction='column'>
						<Avatar
							alt={user.name}
							src={user.avatar}
							className={classes.large}
						/>
						<span className={classes.space}>{user.email}</span>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12}>
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
							<Input
								type='file'
								accept='image/*'
								id='avatar'
								name='avatar'
								style={{ width: '1px' }}
								onChange={handleImage}
							/>
							<label htmlFor='avatar'>
								<Button
									className={classes.file}
									variant='contained'
									component='span'>
									Avatar Image
								</Button>
								{image && (
									<span className={classes.filename}>{image.file.name}</span>
								)}
							</label>
						</Grid>
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						Update Profile
					</Button>
					<Grid container justify='flex-end'>
						<Grid item>
							<Link to='/'>Go to Chat</Link>
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

export default withRouter(Profile)
