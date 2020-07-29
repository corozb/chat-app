import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
	Container,
	Typography,
	Paper,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
} from '@material-ui/core'
import firebase from 'firebase'

const useStyles = makeStyles((theme) => ({
	text: {
		padding: theme.spacing(2, 2, 0),
	},
	paper: {
		paddingBottom: 50,
	},
	list: {
		marginBottom: theme.spacing(2),
	},
}))

const Chat = () => {
	const classes = useStyles()
	const [messages, setMessages] = useState([])

	const addMessage = (message) => {
		messages.push(message)
		setMessages([...messages])
	}

	useEffect(() => {
		const chatRef = firebase.database().ref('/chat')

		chatRef.on(
			'child_added',
			(snapshot) => {
				const messageItem = snapshot.val() //New message
				// Read user data:
				firebase
					.database()
					.ref(`/users/${messageItem.user}`)
					.once('value')
					.then((userResp) => {
						messageItem.user = userResp.val()
						addMessage(messageItem)
					})
			},
			(error) => {
				console.log(error)
			}
		)
	}, [])

	return (
		<>
			<Container>
				<Paper square className={classes.paper}>
					<Typography className={classes.text} variant='h5' gutterBottom>
						Inbox
					</Typography>
					<List className={classes.list}>
						{messages.map(({ date, user, message }) => (
							<ListItem button key={date}>
								<ListItemAvatar>
									<Avatar alt={user.name} src={user.avatar} />
								</ListItemAvatar>
								<ListItemText
									primary={user ? user.name : 'anonymous'}
									secondary={message}
								/>
							</ListItem>
						))}
					</List>
				</Paper>
				New Message
			</Container>
		</>
	)
}

export default Chat
