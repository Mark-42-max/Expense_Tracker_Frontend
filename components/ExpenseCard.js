/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ExpenseCard = () => {
  return (
    <View style={styles.cardBody}>
      <View style={styles.topCont}>
        <Text style={styles.date}>10th November 2021</Text>
        <Text style={styles.time}>10:00 AM</Text>
      </View>
      <View style={styles.midCont}>
        <Text style={styles.title}>Topic: {'\b\b'}Food</Text>
        <Text style={styles.title}>type: {'\b\b'}<Text style={{color: true ? 'green' : 'red'}}>debit</Text></Text>
        <Text style={styles.title}>amount: {'\b\b'} 100</Text>
      </View>
    </View>
  );
};

export default ExpenseCard;

const styles = StyleSheet.create({
    cardBody: {
        width: '100%',
        height: 150,
        backgroundColor: '#fff',
        borderColor: '#eb0c95',
        borderWidth: 1.5,
        borderRadius: 25,
    },

    topCont: {
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },

    date: {
        fontFamily: 'MerriweatherSans-Medium',
        fontSize: 15,
        color: '#000',
    },

    time: {
        fontFamily: 'MerriweatherSans-Medium',
        fontSize: 15,
        color: '#000',
    },

    midCont: {
        height: '70%',
        paddingHorizontal: 30,
    },

    title: {
        fontFamily: 'MerriweatherSans-Medium',
        fontSize: 15,
        color: '#000',
        lineHeight: 30,
    },
});
