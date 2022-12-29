/* eslint-disable prettier/prettier */

import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setToken } from '../slices/preloginSlice';
import bg1 from '../assets/bg1.jpg';
import CustomTabs from '../components/CustomTabs';

const Dashboard = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    async function deleteTokens() {
        try {
            await EncryptedStorage.removeItem('user_session');
            // Congrats! You've just removed your first value!
        } catch (error) {
            // There was an error on the native side
        }
    }

    const requestLogout = () => {
      deleteTokens().then(() => {
        dispatch(setToken(''));
        console.log('Logout');
        navigation.navigate('Splash');
      });
    };

  return (
    <ImageBackground source={bg1} resizeMode="cover" style={styles.bg}>
      <View style={styles.container}>
        <CustomTabs />
      </View>
    </ImageBackground>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  container: {
    flex: 1,
  },
});
