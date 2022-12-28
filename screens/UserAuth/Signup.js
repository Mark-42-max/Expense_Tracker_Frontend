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
import { SERVER_URL } from '../../Constants';
import axios from 'axios';
import LoadingAnim from '../../components/LoadingAnim';

const SignUp = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const usernameSet = text => {
    setUsername(text);
  };
  const passSet = text => {
    setPassword(text);
  };

  const signup = () => {
    if (!username || !password) {
      Alert.alert('Please enter username and password');
      return;
    } else {
      setLoading(true);
      console.log(username, password);
      var data = JSON.stringify({
        username: username,
        password: password,
      });

      var config = {
        method: 'post',
        url: SERVER_URL.APP_SIGNUP,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setLoading(false);
          console.log(response.data.exists);
          if (response.data.exists === 'exists'){
            Alert.alert(
              'OOPS!',
              'Username already exists',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('Login'),
                  style: 'OK',
                },
              ]
            );
          } else if (response.data.exists === 'otp'){
            Alert.alert(
              'OOPS!',
              'Otp already sent. Please verify your email',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('Otp', {
                    email: username,
                  }),
                  style: 'OK',
                },
              ]
            );
          } else if (response.data.exists === 'none'){
            Alert.alert('Congrats!!', 'Signup successful, Please enter OTP', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Otp', {
                  email: username,
                }),
                style: 'OK',
              },
            ]);
            navigation.navigate('Intro');
          }
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
            <Text style={styles.headingText}>SignUp</Text>
          </View>

          <View style={styles.formCont}>
            <View style={styles.txtFormCont}>
              <Text style={styles.subHeadTxt}>
                New here? Just signup to get started
              </Text>
              <TextInput
                placeholderTextColor="#000" // this is the color of the placeholder text
                value={username}
                placeholder="Username"
                style={styles.txtInput}
                onChangeText={usernameSet}
              />
              <TextInput
                placeholderTextColor="#000" // this is the color of the placeholder text
                value={password}
                placeholder="Password"
                style={styles.txtInput}
                onChangeText={passSet}
              />
            </View>
          </View>
          <View style={styles.btnCont}>
            <View style={styles.buttonsCont}>
              <TouchableOpacity style={styles.button} onPress={() => signup()}>
                <Text style={styles.buttonTxt}>SignUp</Text>
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
              <Text style={styles.subHeadTxt}>Got an account?</Text>
            </View>

            <View style={styles.signupBtn}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonTxt}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>

      <LoadingAnim isActive={loading}/>
    </ImageBackground>
  );
};

export default SignUp;

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
