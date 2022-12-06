/* eslint-disable prettier/prettier */
import {ImageBackground, StyleSheet, Text, View, Animated, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import bg1 from '../assets/bg1.jpg';

const Intro = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(200)).current;
  const rotateLeftAnim = useRef(new Animated.Value(0)).current;
  const rotateRightAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeUp = () => {
    Animated.timing(translateAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const rotateLeftFunc = () => {
    Animated.timing(rotateLeftAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const rotateRightFunc = () => {
    Animated.timing(rotateRightAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const rotateLeft = rotateLeftAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '10deg'],
  });

  const rotateRight = rotateRightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '350deg'],
  });

  const opacity = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
    fadeUp();
    rotateLeftFunc();
    rotateRightFunc();
    opacity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ImageBackground style={styles.container} source={bg1} resizeMode="cover">
      <View style={styles.introContainer}>
        <Animated.View
          style={[
            styles.introCont,
            {
              opacity: fadeAnim,
              transform: [{translateY: translateAnim}, {rotate: rotateLeft}],
            },
          ]}>
          <Text>1</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.introCont,
            {
              opacity: fadeAnim,
              transform: [{translateY: translateAnim}, {rotate: rotateRight}],
            },
          ]}>
          <Text>2</Text>
        </Animated.View>
      </View>
      <Animated.View style={[styles.buttonCont, {opacity: opacityAnim}]}>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTxt}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTxt}>SignUp</Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  introContainer: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  buttonCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  introCont: {
    width: 120,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },

  button: {
    width: '40%',
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    borderColor: '#70cfc8',
    borderWidth: 2.5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },

  buttonTxt: {
    color: '#70cfc8',
    fontSize: 15,
    fontFamily: 'MerriweatherSans-Italic',
  },
});
