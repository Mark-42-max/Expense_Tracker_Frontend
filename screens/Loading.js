/* eslint-disable prettier/prettier */

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Loading = ({isLoading}) => {
  return (
    <>
        {isLoading &&
        <View style={styles.container}>
            <Text style={styles.loadingTxt}>Loading...</Text>
        </View>}
    </>
  );
};

export default Loading;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingTxt: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'MerriweatherSans-Medium',
    },
});