import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
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

import NewMessage from './NewMessage'

const useStyles = makeStyles((theme) => ({
	text: {
		padding: theme.spacing(2, 2, 0),
	},
	paper: {
		paddingBottom: 50,
		height: '70vh',
	},
	list: {
		marginBottom: theme.spacing(3),
		maxHeight: '100%',
		overflow: 'auto',
	},
}))

const Chat = ({ history }) => {
	const classes = useStyles()
	const [messages, setMessages] = useState([])
	const scrollRef = useRef()

	const addMessage = (message) => {
		messages.push(message)
		setMessages([...messages.sort((a, b) => a.date - b.date)])

		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight
		}
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
				if (error.message.includes('permission_denied')) {
					history.push('/login')
				}
			}
		)
	}, [])

	return (
		<>
			<Container>
				<Paper square className={classes.paper}>
					<Typography className={classes.text} variant='h5' gutterBottom>
						Chating...
					</Typography>
					<List className={classes.list} ref={scrollRef}>
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
				<NewMessage />
			</Container>
		</>
	)
}

export default withRouter(Chat)
