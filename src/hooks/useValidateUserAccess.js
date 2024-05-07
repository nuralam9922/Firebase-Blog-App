import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const useValidateUserAccess = () => {
	const [userStatus, setUserStatus] = useState();
	const { user } = useSelector((state) => state.authReducer);
	useEffect(() => {
		const userId = cookies.get('auth');
		if (user && userId) {
			setUserStatus(true);
		} else {
			setUserStatus(false);
		}
	}, []);

	return { userStatus, user };
};

export default useValidateUserAccess;
