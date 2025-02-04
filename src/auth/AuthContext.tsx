import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from "axios";

const AuthContext = createContext({});

const AuthProvider = ({ children, ...props } : any) => {
    const [token, setToken] = useState<{ [key: string]: any } | null>(null);
    const [error, setError] = useState('');
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
            GoogleSignin.hasPlayServices();
                const response = await GoogleSignin.signIn();
                const {data} : any = response;

                console.log("Google signIn == ",JSON.stringify(data));
                const email = data.user.email;
                axios
                    .get(`http://localhost:8080/validateEmail?email=${email}`)
                    .then((res) => {
                        setToken(data.idToken);
                        AsyncStorage.setItem('authToken', data.idToken);
                        console.log('user', data.user);
                    })
                    .catch((err) => setError(err));   
                
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
              try {
                    setToken(null);
                  await GoogleSignin.revokeAccess();
                  await GoogleSignin.signOut();
                  setError('');
                  await AsyncStorage.removeItem('authToken'); 
              } catch (error) {
                  console.error(error);
              }
          };

    return (
        <AuthContext.Provider {...props} value={{ token, setToken, logout, login, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
