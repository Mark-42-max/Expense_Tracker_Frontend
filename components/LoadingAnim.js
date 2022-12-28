/* eslint-disable prettier/prettier */

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const LoadingAnim = ({isActive}) => {
  return (
    <>
        {isActive && <View style={styles.container}>
        <Text style={styles.loadTxt}>Loading...</Text>
        </View>}
    </>
  );
};

export default LoadingAnim;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadTxt: {
        fontFamily: 'MerriweatherSans-Bold',
        fontSize: 20,
        color: 'white',
    },
});
