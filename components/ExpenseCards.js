/* eslint-disable prettier/prettier */

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ExpenseCard from './ExpenseCard';
import { useSelector } from 'react-redux';
import { selectExpenses } from '../slices/dashSlice';

const ExpenseCards = () => {

  const expenses = useSelector(selectExpenses);

  // React.useEffect(() => {
  //   let added = expenses.reduce((acc, item) => acc + item.amount, 0);
  //   console.log(added);
  // }, [expenses]);

  return (
    <View style={styles.container}>
      {expenses.map(item =>
        <View key={item.transaction_id} style={styles.cardCont}>
          <ExpenseCard transaction={item}/>
        </View>
      )}
    </View>
  );
};

export default ExpenseCards;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    cardCont: {
      padding: 10,
    },
});