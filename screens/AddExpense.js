/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {Alert, ImageBackground, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import bg1 from '../assets/bg1.jpg';
import {TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {selectToken} from '../slices/preloginSlice';
import {useSelector} from 'react-redux';
import axios from 'axios';
import { SERVER_URL } from './../Constants';
import { useNavigation } from '@react-navigation/native';

const AddExpense = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(selectToken);
  const navigation = useNavigation();

  const onSubmit = () => {

    if (!title || !amount || title === '' || amount === 0) {
        Alert.alert('Please enter title and amount');
        return;
    }

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const seconds = new Date().getSeconds();

    console.log(year, month, day, hour, minute, seconds);

    var data = JSON.stringify({
      token: token,
      amount: amount,
      type: 'debit',
      title: title,
      dateTime: {
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds,
      },
    });

    var config = {
      method: 'post',
      url: SERVER_URL.ADD_EXPENSES,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    setIsLoading(true);
    axios(config)
      .then(function (response) {
        console.log('Successfully posted');
        setIsLoading(false);
        navigation.navigate('Dashboard');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ImageBackground source={bg1} style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.contents}>
          <View style={styles.heading}>
            <Text style={styles.headTxt}>Add Expenses</Text>
          </View>
          <View style={styles.addTitle}>
            <Text style={styles.addTitleLabel}>Add Title</Text>
            <TextInput
              placeholder="Title"
              placeholderTextColor="#A1A1A1"
              style={styles.addTitleInput}
              value={title}
              onChangeText={text => setTitle(text)}
            />
          </View>
          <View style={styles.addTitle}>
            <Text style={styles.addTitleLabel}>Add Amount</Text>
            <TextInput
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor="#A1A1A1"
              style={styles.addTitleInput}
              value={amount}
              onChangeText={text => setAmount(parseInt(text, 10))}
            />
          </View>
          <View style={styles.submitBtn}>
            <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
              <Text style={styles.buttonTxt}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isLoading && <View style={styles.loader}>
        <Text style={{
          color: '#fff',
          fontSize: 20,
          fontFamily: 'MerriweatherSans-Medium',
        }}>Loading...</Text>
      </View>}
    </ImageBackground>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contents: {
    width: '80%',
    height: '80%',
    paddingHorizontal: 20,
  },

  heading: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addTitle: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  addAmount: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  submitBtn: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headTxt: {
    fontFamily: 'MerriweatherSans-MediumItalic',
    fontSize: 30,
    color: '#000',
  },

  addTitleLabel: {
    fontFamily: 'MerriweatherSans-Regular',
    fontSize: 20,
    color: '#000',
  },

  addTitleInput: {
    width: '100%',
    height: 40,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 32,
    color: '#000',
    marginTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },

  button: {
    backgroundColor: '#89cedb',
    width: '50%',
    height: 30,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonTxt: {
    fontFamily: 'MerriweatherSans-Regular',
    fontSize: 15,
    color: '#000',
  },

  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
