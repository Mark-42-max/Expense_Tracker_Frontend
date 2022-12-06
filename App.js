/* eslint-disable prettier/prettier */

import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={
          'radial-gradient(50% 50% at 50% 50%, rgba(63,174,251,0.5) 0%, rgba(rgba(252,70,107,0.7) 100%)'
        }
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">

        <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
        />

          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
