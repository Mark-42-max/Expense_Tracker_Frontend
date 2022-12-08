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

const SignUp = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      console.log(username, password);
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
              onPress={() => navigation.goBack()}>
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
