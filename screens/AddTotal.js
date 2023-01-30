/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */

import {ImageBackground, StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useEffect } from 'react';
import {SERVER_URL} from '../Constants';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectToken} from '../slices/preloginSlice';
import bg1 from '../assets/bg1.jpg';
import {TouchableOpacity} from 'react-native';
import {useState} from 'react';
import Loading from './Loading';

const AddTotal = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {type} = route.params;
  const token = useSelector(selectToken);
  const [val, setVal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const operateTotal = () => {
    var data = JSON.stringify({
      token: token,
      total_operation: type,
      value: val,
    });

    var config = {
      method: 'post',
      url: SERVER_URL.TOTAL_OPERATIONS,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    setIsLoading(true);

    axios(config)
      .then(function (response) {
        console.log(response.data.response.total_bal);
        setIsLoading(false);
        navigation.navigate('Dashboard');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (type === 'remove'){
      setVal(0);
      operateTotal();
    }
  }, [type]);

  return (
    <ImageBackground source={bg1} style={{flex: 1}} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.headTxt}>
          {type.toUpperCase()} {'\n'}
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Amount"
          placeholderTextColor="#000"
          value={val}
          onChangeText={text => setVal(parseInt(text, 10))}
        />
        <TouchableOpacity onPress={() => operateTotal()} style={styles.submit}>
          <Text style={styles.subTxt}>Submit</Text>
        </TouchableOpacity>
      </View>
      <Loading isLoading={isLoading}/>
    </ImageBackground>
  );
};

export default AddTotal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headTxt: {
    fontFamily: 'MerriweatherSans-Italic',
    fontSize: 30,
    color: '#000',
  },
  subTxt: {
    fontFamily: 'MerriweatherSans-Italic',
    fontSize: 15,
    color: '#000',
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: '#rgba(255,255,255,0.5)',
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
    color: '#000',
  },

  submit: {
    backgroundColor: '#fff',
    width: 100,
    height: 40,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});
