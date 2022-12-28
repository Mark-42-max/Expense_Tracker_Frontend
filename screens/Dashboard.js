/* eslint-disable prettier/prettier */

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {

    const navigation = useNavigation();

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
