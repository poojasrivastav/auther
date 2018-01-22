const axios = require('axios');


//why would we keep our current user in redux store?
//Ans. because we want functionality of someone being logged in i.e. show diiferent things based of whether they(user's) are logged in or not.

//ACTION TYPE CONSTANT

const SET_CURRENT_USER = 'SET_CURRENT_USER';

//ACTION CREATOR

const setCurrentUser = user => ({type: SET_CURRENT_USER, user});

//REDUCER

export default function reducer (currentUser = {},  action) {
	switch(action.type) {
		case SET_CURRENT_USER:
		 return action.user;
        default:
        return currentUser;
	}
}
//THUNK CREATOR

export const login = creds => {
 return dispatch => {
 	axios.put('/auth/local/login', creds)
 	   .then(res => res.data)
 	   .then(user => dispatch(setCurrentUser(user)))
 	   .catch(console.error);
 }

}
	
export const fetchCurrentUser = () => {
 return dispatch => {
 	axios.get('/auth/local/me')
 	   .then(res => res.data)
 	   .then(user => dispatch(setCurrentUser(user)))
 	   .catch(console.error);
 }

}