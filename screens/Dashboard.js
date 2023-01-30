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
import {useSelector} from 'react-redux';
import {SERVER_URL} from './../Constants';
import {
  selectName,
  selectTotal,
  setExpenses,
  setName,
  setTotal,
  setTotalExpenses,
} from '../slices/dashSlice';
import {selectTotalExpenses} from './../slices/dashSlice';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import Option from '../assets/svg/Option';

const Dashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const token = useSelector(selectToken);
  const [isLoading, setIsLoading] = useState(false);
  const totalBalance = useSelector(selectTotal);
  const totalExp = useSelector(selectTotalExpenses);
  const name = useSelector(selectName);

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
        // console.log(
        //   JSON.stringify(response.data.data.transactions.total_bal),
        // );
        dispatch(setExpenses(response.data.data.transactions.transactions));
        dispatch(setTotal(response.data.data.transactions.total_bal));
        dispatch(
          setTotalExpenses(response.data.data.transactions.totalExpense),
        );
        dispatch(setName(response.data.data.user));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log('Total Balance: ' + totalBalance);
  }, [totalBalance]);

const operateTotal = (type) => {
  navigation.navigate('AddTotal', {type: type});
};

  useEffect(() => {
    navigation.addListener('focus', () => {
      getExpenses();
    });
  }, []);

  return (
    <ImageBackground source={bg1} resizeMode="cover" style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.topCont}>
          <View style={styles.topHead}>
            <Text style={styles.nameTxt}>{name}</Text>
          </View>
          <View style={styles.bottomHead}>
            <TouchableOpacity style={styles.logoutBtn} onPress={requestLogout}>
              <Text style={styles.botTxt}>Log out</Text>
            </TouchableOpacity>
            <View style={styles.botCont}>
              <Text style={styles.botTxt}>
                Total Balance:{' '}
              </Text>
              <Text style={styles.totalBotTxt}>
                {totalBalance}
              </Text>
              <Menu>
                    <MenuTrigger children={<Option />} style={{marginLeft: 20}}/>
                    <MenuOptions optionsContainerStyle={styles.optionCont}>
                      <MenuOption
                        customStyles={triggerStyles}
                        onSelect={() => operateTotal('replace')}
                        text="Replace Total"
                        style={styles.optionIndividual}
                      />
                      <MenuOption
                        customStyles={triggerStyles}
                        onSelect={() => operateTotal('add')}
                        text="Add to Total"
                        style={styles.optionIndividual}
                      />
                      <MenuOption
                        customStyles={triggerStyles}
                        onSelect={() => operateTotal('remove')}
                        text="Remove Total"
                        style={styles.optionIndividual}
                      />
                    </MenuOptions>
                  </Menu>
            </View>

            <View style={styles.botCont}>
              <Text style={styles.botTxt}>
                Total Expense:{' '}
              </Text>
              <Text style={styles.totalBotTxtDanger}>
                {totalExp}
              </Text>
            </View>
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

        {currentIndex === 0 && (
          <View style={styles.buttonCont}>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => navigation.navigate('AddExpense')}>
              <Text style={styles.buttonTxt}>Add Expense</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {isLoading && (
        <View style={styles.loader}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontFamily: 'MerriweatherSans-Medium',
            }}>
            Loading...
          </Text>
        </View>
      )}
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
    flex: 3,
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

  buttonCont: {
    flexGrow: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addBtn: {
    backgroundColor: '#89cedb',
    width: '80%',
    height: 50,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonTxt: {
    fontFamily: 'MerriweatherSans-Medium',
    fontSize: 18,
    color: '#000',
  },

  ellipsis: {
    fontSize: 10,
    color: '#000',
    fontFamily: 'MerriweatherSans-Medium',
  },

  optionCont: {
    width: 154,
    height: 107,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingTop: 10,
  },

  optionIndividual: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingStart: 10,
    paddingBottom: 5,
    borderRadius: 10,
  },

  botCont: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '50%',
  },

  totalBotTxt: {
    color: 'green',
    backgroundColor: '#fff',
    fontSize: 15,
    fontFamily: 'MerriweatherSans-Regular',
  },

  totalBotTxtDanger: {
    color: 'red',
    backgroundColor: '#fff',
    fontSize: 15,
    fontFamily: 'MerriweatherSans-Regular',
  },
});

const triggerStyles = {
  triggerText: {
    color: 'black',
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
  },
};
