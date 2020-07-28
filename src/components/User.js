import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { IconButton, MenuItem, Menu } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import firebase from 'firebase'

const User = ({ user, onLogout, history }) => {
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
				<AccountCircle />
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
