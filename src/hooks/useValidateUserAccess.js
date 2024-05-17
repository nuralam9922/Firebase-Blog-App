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
		if (user == null || user == undefined) {
			setUserStatus(false);
		} else {
			setUserStatus(true);
		}
	}, []);

	return { userStatus, user };
};

export default useValidateUserAccess;
