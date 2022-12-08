/* eslint-disable prettier/prettier */
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import bg1 from '../assets/bg1.jpg';
import { useNavigation } from '@react-navigation/native';

const Intro = () => {

  const navigation = useNavigation();

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
      duration: 2000,
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
        <View style={styles.txtCont}>
          <Animated.Text style={[styles.introText, {opacity: opacityAnim}]}>Apart from keeping log of your expenses...</Animated.Text>
        </View>
        <View style={styles.cardCont}>
          <Animated.View
            style={[
              styles.introCont,
              {
                opacity: fadeAnim,
                transform: [{translateY: translateAnim}, {rotate: rotateLeft}],
              },
            ]}>
            <Text style={styles.cardTxt}>We also offer a log book to keep track of split bills and cheques.</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.introCont,
              {
                opacity: fadeAnim,
                transform: [{translateY: translateAnim}, {rotate: rotateRight}],
              },
            ]}>
            <Text style={styles.cardTxt}>Keep track of advance expenses which are to be done in future, if you plan to do so and let us know about the same</Text>
          </Animated.View>
        </View>

        <View style={styles.txtCont}>
          <Animated.Text style={[styles.introText, {opacity: opacityAnim}]}>So what are you waiting for? Let's get started...</Animated.Text>
        </View>
      </View>
      <Animated.View style={[styles.buttonCont, {opacity: opacityAnim}]}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonTxt}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
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

    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
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

  cardCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  introText: {
    fontFamily: 'MerriweatherSans-BoldItalic',
    fontSize: 30,
    color: 'white',
    whiteSpace: 'nowrap',
  },

  txtCont: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  cardTxt: {
    fontFamily: 'MerriweatherSans-MediumItalic',
    fontSize: 13,
    color: '#70cfc8',
  },
});
