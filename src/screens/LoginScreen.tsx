import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button, SafeAreaView, Image } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthContext } from '../auth/AuthContext';

import {
    GOOGLE_WEB_CLIENT_ID,
    GOOGLE_ANDROID_CLIENT_ID,
    GOOGLE_IOS_CLIENT_ID,
} from '@env';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = (  ) => {
    const {token, setToken, login} : any = useContext(AuthContext);
    const navigation = useNavigation();
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: GOOGLE_WEB_CLIENT_ID,
            iosClientId: GOOGLE_IOS_CLIENT_ID,
            offlineAccess: true,
            scopes: ['profile', 'email', 'openid'],
        });
        
    }, []);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);    


    return (
        <SafeAreaView>
            <View style={{marginTop:30, alignItems: 'center'}}>
                
            </View>
            <View style={{marginTop: 20, alignItems: 'center'}}>
                <View style={{marginTop: 20, alignItems: 'center'}}>
                    <Button title="Sign in with Google" onPress={login} />
                </View>
            </View>            
        </SafeAreaView>
    )
}

export default SignInScreen;
