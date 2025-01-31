import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AuthContext} from '../auth/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();

    const {token} = useContext(AuthContext);

    const AuthStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen}
                options={{headerShown: false}} />
            </Stack.Navigator>
        );
    };

    const MainStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        );
    };

    return (
        <NavigationContainer>
            {token ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default StackNavigator;

const styles = StyleSheet.create({});
