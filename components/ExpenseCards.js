/* eslint-disable prettier/prettier */

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ExpenseCard from './ExpenseCard';

const ExpenseCards = () => {
  return (
    <View style={styles.container}>
      <ExpenseCard />
    </View>
  );
};

export default ExpenseCards;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'red',
        padding: 10,
    },
});