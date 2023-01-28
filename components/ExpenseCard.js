/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Calendar from '../CalendarReferrence';

const ExpenseCard = ({transaction}) => {

  const getPostFix = (day) => {
    if (day === 1 || day === 21 || day === 31) {
      return 'st';
    } else if (day === 2 || day === 22) {
      return 'nd';
    } else if (day === 3 || day === 23) {
      return 'rd';
    } else {
      return 'th';
    }
  };

  const getTime = (hour, minute) => {

    if (typeof hour === 'undefined' || typeof minute === 'undefined') {
      return '10:00 AM';
    }

    if (hour === 0) {
      return '12:' + minute + ' AM';
    } else if (hour === 12) {
      return '12:' + minute + ' PM';
    } else if (hour > 12) {
      return hour - 12 + ':' + minute + ' PM';
    } else {
      return hour + ':' + minute + ' AM';
    }
  };

  return (
    <View style={styles.cardBody}>
      <View style={styles.topCont}>
        <Text style={styles.date}>
          {
            typeof transaction.dateTime.day !== 'undefined'
            ? transaction.dateTime.day + getPostFix(transaction.dateTime.day) + ' '
            : '1st '
          }
          {
            Calendar[
              typeof transaction.dateTime.month !== 'undefined'
                ? transaction.dateTime.month
                : 1
            ] + ' '
          }
          {
            typeof transaction.dateTime.year !== 'undefined'
              ? '' +  transaction.dateTime.year
              : ' 2021'
          }
        </Text>
        <Text style={styles.time}>{getTime(transaction.dateTime.hour, transaction.dateTime.minute)}</Text>
      </View>
      <View style={styles.midCont}>
        <Text style={styles.title}>Topic: {'\b\b'}{typeof transaction.title !== 'undefined' ? transaction.title : 'nothing'}</Text>
        <Text style={styles.title}>
          type: {'\b\b'}
          <Text style={{color: 'red'}}>debit</Text>
        </Text>
        <Text style={styles.title}>amount: {'\b\b'} {typeof transaction.amount !== 'undefined' ? transaction.amount : 100}</Text>
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
