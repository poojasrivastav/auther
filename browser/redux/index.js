import { combineReducers } from 'redux';
import users from './users';
import stories from './stories';

export default combineReducers({ users, stories });
