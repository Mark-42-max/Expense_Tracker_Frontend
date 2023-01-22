/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {selectToken, setToken} from '../slices/preloginSlice';
import bg1 from '../assets/bg1.jpg';
import CustomTabs from '../components/CustomTabs';
import TabBody from './../components/TabBody';
import {useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { SERVER_URL } from './../Constants';

const Dashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const token = useSelector(selectToken);
  const[isLoading, setIsLoading] = useState(false);

  async function deleteTokens() {
    try {
      await EncryptedStorage.removeItem('user_session');
      // Congrats! You've just removed your first value!
    } catch (error) {
      // There was an error on the native side
    }
  }

  const requestLogout = () => {
    deleteTokens().then(() => {
      dispatch(setToken(''));
      console.log('Logout');
      navigation.navigate('Splash');
    });
  };

  const getExpenses = () => {
    var data = JSON.stringify({
      token: token,
    });

    var config = {
      method: 'post',
      url: SERVER_URL.GET_EXPENSES,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    setIsLoading(true);
    axios(config)
      .then(function (response) {
        setIsLoading(false);
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <ImageBackground source={bg1} resizeMode="cover" style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.topCont}>
          <View style={styles.topHead}>
            <Text style={styles.nameTxt}>Soham Das</Text>
          </View>
          <View style={styles.bottomHead}>
            <TouchableOpacity style={styles.logoutBtn} onPress={requestLogout}>
              <Text style={styles.botTxt}>Log out</Text>
            </TouchableOpacity>
            <Text style={styles.botTxt}>
              Total Balance:{' '}
              <Text style={{color: 'green', backgroundColor: '#fff'}}>
                15000
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.bottomCont}>
          <CustomTabs
            isBg={false}
            isOverlay={false}
            contentBg={true}
            bgColor="transparent"
            tabTitles={['expense', 'settings', 'savings']}
            onIndexChange={index => setCurrentIndex(index)}
            children={<TabBody currentIndex={currentIndex} />}
          />
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

export default Dashboard;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  container: {
    flex: 1,
  },
  topCont: {
    flex: 1,
  },

  bottomCont: {
    flex: 4,
  },

  topHead: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },

  bottomHead: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },

  nameTxt: {
    fontFamily: 'MerriweatherSans-Medium',
    fontSize: 30,
    color: '#000',
  },

  logoutBtn: {
    backgroundColor: '#fff',
    width: 100,
    height: 30,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eb0c95',
  },

  botTxt: {
    fontFamily: 'MerriweatherSans-Medium',
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
