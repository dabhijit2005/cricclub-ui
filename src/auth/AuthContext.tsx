import { useEffect } from "react";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const AuthContext = createContext({});

const AuthProvider = ({ children, ...props } : any) => {
    const [token, setToken] = useState<{ [key: string]: any } | null>(null);
    useEffect(() => {
        const token : any = '';//AsyncStorage.getItem('authToken');
        if (token) {
            const checkForExistingUser = async () => {
                        const storedToken = '';//await AsyncStorage.getItem('authToken');
                        if (storedToken) {
                            try {
                                console.log('Sign In Silently' + storedToken);
                                await GoogleSignin.signInSilently();
                            } catch (error) {
                                console.error('Error signing in silently', error);
                            }
                        }
                    };
                    checkForExistingUser();
            setToken(token);
        }
    }, []);

    const login = async () => {
        try {
            console.log('Sign in with Google');
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            console.log("Google signIn == ",JSON.stringify(response));

            const {data} : any = response;
            //await AsyncStorage.setItem('authToken', data.idToken);

            setToken(data.idToken);
            console.log('user', data.user);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
              try {
                    setToken(null);
                  await GoogleSignin.revokeAccess();
                  await GoogleSignin.signOut();
                  //await AsyncStorage.removeItem('authToken'); 
              } catch (error) {
                  console.error(error);
              }
          };

    return (
        <AuthContext.Provider {...props} value={{ token, setToken, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
