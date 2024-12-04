import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState(() => {
		return localStorage.getItem('loggedInUser') || null;
	});

	useEffect(() => {
		if (loggedInUser) {
			localStorage.setItem('loggedInUser', loggedInUser);
		} else {
			localStorage.removeItem('loggedInUser');
		}
	}, [loggedInUser]);

	return (
		<UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	return useContext(UserContext);
};
