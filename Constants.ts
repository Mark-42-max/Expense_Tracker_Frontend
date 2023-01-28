// eslint-disable prettier/prettier
const serverUrl = 'https://tranquil-fox-9662ab.netlify.app';
const demoUrl = 'http://10.0.2.2:8888';

const indexFunc = '/.netlify/functions/index/';
const indexFuncUrl = demoUrl + indexFunc;

export const SERVER_URL = {
  APP_LOGIN: indexFuncUrl + '/login',
  APP_SIGNUP: indexFuncUrl + '/signup',
  USER_VERIFY: indexFuncUrl + '/signup/validate',
  GET_EXPENSES: indexFuncUrl + '/dashboard',
};
