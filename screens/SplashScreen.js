/* eslint-disable prettier/prettier */

import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import bg1 from '../assets/bg1.jpg';
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {

  const navigation = useNavigation();


  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
          index: 0,
          routes: [{name: 'Welcome'}],
        });
    }, 3000);
  }, [navigation]);
  return (
    <ImageBackground style={styles.container} source={bg1} resizeMode="cover">
      <View style={styles.alignCont}/>
      <View style={styles.textCont}>
        <Text style={styles.headText}>Expense Tracker</Text>
        <Text style={styles.subHeadTxt}>Your one time solution to track expenditures</Text>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    alignCont: {
        flex: 1,
    },

    textCont: {
        flex: 1,
        //backgroundColor: 'red',
        paddingHorizontal: 20,
    },

    headText: {
        fontFamily: 'MerriweatherSans-BoldItalic',
        fontSize: 40,
        width: '50%',
        color: 'white',
    },

    subHeadTxt: {
        fontFamily: 'MerriweatherSans-Italic',
        fontSize: 20,
        width: '100%',
        color: 'white',
    },
});
