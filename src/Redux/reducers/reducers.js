import {
  NAME_CHANGE,
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  PASSWORDCONFIRM_CHANGE,
  ALAMAT_CHANGE,
  PHONENUMBER_CHANGE,
} from '../Action/type';
import {combineReducers} from 'redux';

const intialState = {
  name: '',
  email: '',
  password: '',
  passwordconfirmation: '',
  alamat: '',
  phonenumber: '',
};

const reducers = (state = {intialState}, action) => {
  switch (action.type) {
    case NAME_CHANGE:
      return {...state, name: action.payload};
    case EMAIL_CHANGE:
      return {...state, email: action.payload};
    case PASSWORD_CHANGE:
      return {...state, password: action.payload};
    case PASSWORDCONFIRM_CHANGE:
      return {...state, passwordconfirmation: action.payload};
    case ALAMAT_CHANGE:
      return {...state, alamat: action.payload};
    case PHONENUMBER_CHANGE:
      return {...state, phonenumber: action.payload};
    default:
      return state;
  }
};

const appState = combineReducers({
  reducers,
});
export default appState;
