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
import React, {useEffect, useState} from 'react';
import bg1 from '../../assets/bg1.jpg';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {SERVER_URL} from './../../Constants';
import { selectToken, setToken } from '../../slices/preloginSlice';
import { useDispatch, useSelector } from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import LoadingAnim from '../../components/LoadingAnim';

const Login = () => {
  const navigation = useNavigation();
  const token = useSelector(selectToken);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const usernameSet = text => {
    setUsername(text);
  };
  const passSet = text => {
    setPassword(text);
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

  const login = () => {
    if (!username || !password) {
      Alert.alert('Please enter username and password');
      return;
    } else {
      setLoading(true);
      console.log('username: ', username);
      var data = JSON.stringify({
        username: username,
        password: password,
      });

      var config = {
        method: 'post',
        url: SERVER_URL.APP_LOGIN,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setLoading(false);
          if (response.data.success === true) {
            console.log(JSON.stringify(response.data.token));
            dispatch(setToken(response.data.token));
            storeToken(response.data.token).then(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
              });
            });
          } else if (response.data.success === false) {
            Alert.alert('OOPS!!!',  response.data.message + '. Please try again');
          }
        })
        .catch(function (error) {
          console.log(error);
          navigation.reset('Intro');
        });
    }
  };

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <ImageBackground style={styles.container} source={bg1} resizeMode="cover">
      <View style={styles.loginCont}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Login</Text>
        </View>

        <View style={styles.formCont}>
          <View style={styles.txtFormCont}>
            <Text style={styles.subHeadTxt}>Already a user? Let's sign in</Text>
            <TextInput
              value={username}
              placeholder="Username"
              style={styles.txtInput}
              onChangeText={usernameSet}
            />
            <TextInput
              value={password}
              placeholder="Password"
              style={styles.txtInput}
              onChangeText={passSet}
            />
          </View>
        </View>
        <View style={styles.btnCont}>
          <View style={styles.buttonsCont}>
            <TouchableOpacity style={styles.button} onPress={() => login()}>
              <Text style={styles.buttonTxt}>Login</Text>
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
        <View style={styles.signupCont}>
          <View style={styles.discTxt}>
            <Text style={styles.subHeadTxt}>Don't have an account?</Text>
          </View>

          <View style={styles.signupBtn}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.buttonTxt}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <LoadingAnim isActive={loading}/>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginCont: {
    width: '90%',
    height: '90%',
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
    flex: 1,
    flexDirection: 'row',
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
