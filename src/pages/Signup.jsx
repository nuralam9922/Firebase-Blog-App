import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton, SecondaryButton } from '../components';
import { auth } from '../firebase/firebaseConfig';
import authService from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import useValidateUserAccess from '../hooks/useValidateUserAccess';
import { useEffect } from 'react';

function Signup() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { userStatus } = useValidateUserAccess();
	if (userStatus) {
		navigate('/');
	}

	const handleGoogleSignup = async () => {
		const response = await authService.signInWithGoogle();
		if (response) {
			dispatch(login(response));

			navigate('/');
		} else setError('Something went wrong');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		// Validate email and password
		if (!email || !password) {
			setError('Email and password are required.');
			return;
		}
		setLoading(true);
		try {
			const response = await authService.signUp(name, email, password);
			if (response) {
				dispatch(login(response));

				navigate('/');
			} else setError('Something went wrong');
		} catch (error) {
			setError(error.message);
			console.log(error);
		}

		// setEmail('');
		setPassword('');
		setLoading(false);
	};

	return (
		<div className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<h2 className='mt-6 text-center text-3xl font-[500] text-gray-900'>
					Create an account
				</h2>
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<div className='flex justify-center mb-4'>
						<button
							onClick={handleGoogleSignup}
							className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
							Sign up with Google
						</button>
					</div>

					<div className='mt-6 relative'>
						<div
							className='absolute inset-0 flex items-center'
							aria-hidden='true'>
							<div className='w-full border-t border-gray-300'></div>
						</div>
						<div className='relative flex justify-center text-sm'>
							<span className='px-2 bg-white text-gray-500'>
								Or
							</span>
						</div>
					</div>

					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label
								htmlFor='name'
								className='block text-sm font-medium text-gray-700'>
								Enter Your Name
							</label>
							<div className='mt-1'>
								<input
									id='name'
									name='name'
									type='name'
									autoComplete='name'
									required
									value={name}
									onChange={(e) =>
										setName(e.target.value)
									}
									className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-700'>
								Email address
							</label>
							<div className='mt-1'>
								<input
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									required
									value={email}
									onChange={(e) =>
										setEmail(e.target.value)
									}
									className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-gray-700'>
								Password
							</label>
							<div className='mt-1'>
								<input
									id='password'
									name='password'
									type='password'
									autoComplete='new-password'
									required
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
								/>
							</div>
						</div>
						{error && (
							<p className='text-red-500 text-xs mb-4'>
								{error}
							</p>
						)}
						<div>
							{loading ? (
								<LoadingButton
									disabled={loading}
									label={'Login In'}
									className={'w-full'}
									type={'submit'}
								/>
							) : (
								<SecondaryButton
									label={'Sign up'}
									className={'w-full'}
									type={'submit'}
								/>
							)}
						</div>
					</form>
					<p className='mt-5'>
						Already have an account?{' '}
						<Link to={'/auth/login'}>Login up</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;
