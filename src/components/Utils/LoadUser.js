import firebase from 'firebase'

const LoadUser = (uid) => {
	return new Promise((resolve, reject) => {
		// Read data
		firebase
			.database()
			.ref(`/users/${uid}`)
			.once('value')
			.then((snapshot) => {
				const userData = snapshot.val()

				if (userData.avatar) {
					// load avatar url
					firebase
						.storage()
						.ref()
						.child(`/avatars/${userData.avatar}`)
						.getDownloadURL()
						.then(
							(url) => {
								userData.avatar = url
								resolve(userData)
							},
							(error) => {
								resolve(userData)
							}
						)
				} else {
					resolve(userData)
				}
			})
			.catch((error) => {
				reject(new Error("Error reading user's data"))
			})
	})
}

export default LoadUser
