import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState(() => {
		const storedUser = localStorage.getItem('loggedInUser');
		if (!storedUser) return null;

		try {
			return JSON.parse(storedUser);
		} catch (error) {
			console.error(
				'Error parsing loggedInUser from localStorage:',
				error
			);
			localStorage.removeItem('loggedInUser'); // Remove corrupted data
			return null;
		}
	});

	const [languages, setLanguages] = useState([]);

	useEffect(() => {
		if (loggedInUser) {
			localStorage.setItem(
				'loggedInUser',
				JSON.stringify({
					username: loggedInUser.username,
					userId: loggedInUser.userId,
					token: loggedInUser.token,
				})
			);
		} else {
			localStorage.removeItem('loggedInUser');
		}
	}, [loggedInUser]);

	return (
		<UserContext.Provider
			value={{ loggedInUser, setLoggedInUser, languages, setLanguages }}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	return useContext(UserContext);
};
