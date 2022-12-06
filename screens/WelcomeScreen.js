/* eslint-disable prettier/prettier */

import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import bg1 from '../assets/bg1.jpg';

const WelcomeScreen = () => {
  return (
    <ImageBackground style={styles.container} source={bg1} resizeMode="cover">
      <Text>WelcomeScreen</Text>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
});
