/* eslint-disable prettier/prettier */

import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import bg1 from '../assets/bg1.jpg';
import TypeWriter from 'react-native-typewriter';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {

  const navigation = useNavigation();

  const endTextTyped = () => {
    setTimeout(() => {
      //console.log('endTextTyped');
      navigation.navigate('Intro');
    }, 700);
  };

  return (
    <ImageBackground style={styles.container} source={bg1} resizeMode="cover">
      <View style={styles.welcoTxt}>
        <TypeWriter minDelay={10} typing={1} style={styles.welcoTxtHead}>Confused where your salary's getting squandered?</TypeWriter>
        <Text>{'\n'}</Text>
        <TypeWriter minDelay={10} initialDelay={5000} typing={1} style={styles.welcoTxtHead}>We got you covered!</TypeWriter>
        <Text>{'\n'}</Text>
        <TypeWriter minDelay={10} initialDelay={7000}  typing={1} style={styles.welcoTxtHead} onTypingEnd={() => endTextTyped()}>Introducing the digital handbook to keep record of your expenses</TypeWriter>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcoTxt: {
    width: '100%',
    height: '70%',
    paddingHorizontal: 20,
    //backgroundColor: 'red',
  },

  welcoTxtHead: {
    fontFamily: 'MerriweatherSans-BoldItalic',
    fontSize: 30,
    color: 'white',
    whiteSpace: 'nowrap',
  },
});
