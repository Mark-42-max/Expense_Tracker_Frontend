/* eslint-disable prettier/prettier */

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setToken } from '../slices/preloginSlice';

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

  return (
    <View>
      <Text>Dashboard</Text>
      <TouchableOpacity onPress={() => {

        deleteTokens().then(() => {
            dispatch(setToken(''));
            console.log('Logout');
            navigation.navigate('Splash');
        });
      }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
