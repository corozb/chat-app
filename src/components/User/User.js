import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { IconButton, MenuItem, Menu, Avatar } from '@material-ui/core'
import { lightBlue } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import firebase from 'firebase'

const useStyles = makeStyles((theme) => ({
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	blue: {
		color: theme.palette.getContrastText(lightBlue[600]),
		backgroundColor: lightBlue[400],
	},
}))

const User = ({ user, onLogout, history }) => {
	const classes = useStyles()

	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleLogout = () => {
		setAnchorEl(null)
		firebase
			.auth()
			.signOut()
			.then(() => {
				if (onLogout) onLogout()
				history.push('/login')
			})
	}

	return (
		<>
			<IconButton
				aria-label='account of current user'
				aria-controls='menu-appbar'
				aria-haspopup='true'
				onClick={handleMenu}
				color='inherit'>
				<Avatar
					alt={user.name}
					src={user.avatar}
					className={(classes.small, classes.blue)}
				/>
			</IconButton>
			<Menu
				id='menu-appbar'
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={open}
				onClose={handleClose}>
				<MenuItem>{user.name}</MenuItem>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</>
	)
}

export default withRouter(User)
