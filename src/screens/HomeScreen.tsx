import {StyleSheet, Text, View, SafeAreaView,Button} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthContext } from '../auth/AuthContext';

const HomeScreen = () => {
  const [name, setName] = useState(null);
  const {token, logout} : any = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const {name, email} : any = jwtDecode(token);
      setName(name);
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView>
        <Text>HomeScreen</Text>
        <Text>Welcome {name}</Text>
        <View style={{marginTop: 20, alignItems: 'center'}}>
            <Button title="Sign out with Google" onPress={logout} />
        </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});