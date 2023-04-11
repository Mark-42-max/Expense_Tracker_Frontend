/* eslint-disable prettier/prettier */

import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import bg1 from '../../assets/bg1.jpg';
import {useNavigation} from '@react-navigation/native';
import {SERVER_URL} from '../../Constants';
import axios from 'axios';
import { setToken } from '../../slices/preloginSlice';
import { useDispatch } from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import LoadingAnim from '../../components/LoadingAnim';

const Otp = ({route}) => {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {email} = route.params;

  const changeOtpTxt = text => {
    setOtp(text);
  };

  const storeToken = async (tokenReceived) => {
    try {
      await EncryptedStorage.setItem(
          'user_session',
          JSON.stringify({
              token : tokenReceived,
          })
      );

      // Congrats! You've just stored your first value!
  } catch (error) {
      // There was an error on the native side
  }
  };

  const verifySignup = () => {
    if (!otp) {
      Alert.alert('Please enter otp');
      return;
    } else {
      setLoading(true);
      var data = JSON.stringify({
        email: email,
        otp: otp,
      });

      var config = {
        method: 'post',
        url: SERVER_URL.USER_VERIFY,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setLoading(false);
          dispatch(setToken(response.data.token));
          storeToken(response.data.token).then(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <ImageBackground style={styles.container} source={bg1} resizeMode="cover">
      <View style={styles.loginCont}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Verify</Text>
        </View>

        <View style={styles.formCont}>
          <View style={styles.txtFormCont}>
            <Text style={styles.subHeadTxt}>
              Please verify the otp sent to you
            </Text>
            <TextInput
              placeholderTextColor="#000" // this is the color of the placeholder text
              value={otp}
              placeholder="Enter OTP"
              style={styles.txtInput}
              onChangeText={changeOtpTxt}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.btnCont}>
          <View style={styles.buttonsCont}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => verifySignup()}>
              <Text style={styles.buttonTxt}>Verify</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonsCont}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Intro')}>
              <Text style={styles.buttonTxt}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <LoadingAnim isActive={loading} />
    </ImageBackground>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginCont: {
    width: '90%',
    height: '60%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 25,
    borderColor: '#70cfc8',
    borderWidth: 4,
  },

  heading: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  formCont: {
    flex: 5,
  },

  signupCont: {
    flex: 2,
    flexDirection: 'row',
    paddingHorizontal: 5,
  },

  btnCont: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  buttonsCont: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headingText: {
    fontFamily: 'MerriweatherSans-BoldItalic',
    fontSize: 40,
    color: '#000',
  },

  subHeadTxt: {
    fontFamily: 'MerriweatherSans-BoldItalic',
    fontSize: 20,
    color: '#000',
    width: '80%',
  },

  txtFormCont: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  txtInput: {
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderColor: '#70cfc8',
    borderRadius: 32,
    paddingHorizontal: 20,
  },

  discTxt: {
    width: '60%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  signupBtn: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    width: '80%',
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
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    elevation: 11,
  },

  buttonTxt: {
    color: '#70cfc8',
    fontSize: 15,
    fontFamily: 'MerriweatherSans-Italic',
  },
});
