import React, { useState } from 'react'
import { Paper, Button, Grid, Box, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SendIcon from '@material-ui/icons/Send'
import firebase from 'firebase'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		paddingTop: 15,
		paddingBottom: 20,
	},
	message: {
		border: '1px solid #ccc',
		borderRadius: 8,
		padding: '0 20px',
	},
	box: {
		height: '100%',
		paddingLeft: 20,
	},
}))

const NewMessage = () => {
	const classes = useStyles()
	const [message, setMessage] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()

		const { currentUser } = firebase.auth()
		if (!currentUser) return

		const newMessage = {
			user: currentUser.uid,
			message,
			date: firebase.database.ServerValue.TIMESTAMP,
		}

		firebase
			.database()
			.ref('/chat')
			.push(newMessage)
			.then((res) => {
				setMessage('') // Clean up state
			})
			.catch((error) => {
				console.log(error)
				alert(error.message)
			})
	}

	return (
		<Paper square className={classes.paper}>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={0} direction='row' className={classes.message}>
					<Grid item xs={10}>
						<TextField
							margin='normal'
							name='message'
							required
							fullWidth
							id='message'
							label='Message'
							autoFocus
							value={message}
							onChange={(event) => setMessage(event.target.value)}
						/>
					</Grid>
					<Grid item xs={2}>
						<Box display='flex' alignItems='center' className={classes.box}>
							<Button
								variant='contained'
								color='primary'
								endIcon={<SendIcon />}
								fullWidth
								type='submit'
								disabled={!message.length}>
								Send
							</Button>
						</Box>
					</Grid>
				</Grid>
			</form>
		</Paper>
	)
}

export default NewMessage
