import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const useValidateUserAccess = () => {
	const [userStatus, setUserStatus] = useState();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.authReducer);
	useEffect(() => {
		const userId = cookies.get('auth');
		if (user !== null && userId) {
			setUserStatus(true);
		} else {
			setUserStatus(false);
		}
	}, []);

	return { userStatus, user };
};

export default useValidateUserAccess;
