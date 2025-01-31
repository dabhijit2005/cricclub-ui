import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {
	GOOGLE_WEB_CLIENT_ID,
	GOOGLE_ANDROID_CLIENT_ID,
	GOOGLE_IOS_CLIENT_ID,
} from '@env';

const SignInScreen = () => {
	useEffect(() => {
		console.log('GOOGLE_ANDROID_CLIENT_ID', GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID);
		GoogleSignin.configure({
			webClientId: GOOGLE_WEB_CLIENT_ID,
			iosClientId: GOOGLE_IOS_CLIENT_ID,
			offlineAccess: true,
			scopes: ['profile', 'email', 'openid'],
		});
		
		const GoogleLogin = async () => {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			return userInfo;
		};
		
	}, []);

    const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	let user = undefined;
	
	const handleGoogleLogin = async () => {
		setLoading(true);

		console.log('Sign in with Google');
		const userInfo = await GoogleSignin.signIn();
		console.log("Google signIn == ",JSON.stringify(userInfo));

		user = JSON.stringify(userInfo);
		console.log('user', user);
		setLoading(false);
		/*try {
			const response = await GoogleLogin();
			const { idToken, user } = response;

			if (idToken) {
				const resp = await authAPI.validateToken({
					token: idToken,
					email: user.email,
				});
				await handlePostLoginData(resp.data);
			}
		} catch (apiError) {
			setError(
				apiError?.response?.data?.error?.message || 'Something went wrong'
			);
		} finally {
			setLoading(false);
		}*/
	};

	const handleGoogleLogout = async () => {
		try {
			await GoogleSignin.revokeAccess();
			await GoogleSignin.signOut();
		} catch (error) {
			console.error(error);
		}
	};

    return (
        <View>
            <Text>SignIn Screen 2</Text>
			 <Text>User : {user !== undefined ? user : 'No User'}</Text>
			<Button title="Sign in with Google" onPress={handleGoogleLogin} />
			<Button title="Sign out with Google" onPress={handleGoogleLogout} />
        </View>
    )
}

export default SignInScreen;
