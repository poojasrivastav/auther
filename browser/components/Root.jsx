import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import UserList from './User/UserList';
import UserDetail from './User/UserDetail';
import StoryList from './Story/StoryList';
import StoryDetail from './Story/StoryDetail';
import Navbar from './Navbar';
import Footer from './Footer';

import { fetchUsers } from '../redux/users';
import { fetchStories } from '../redux/stories';

/* -----------------    COMPONENT     ------------------ */

class Root extends Component {
	componentDidMount() {
		this.props.fetchInitialData();
	}
	render () {
		return (
	    <Router>
				<div id="main" className="container-fluid">
			    <Navbar />
			    <Route exact path="/" component={Home} />
			    <Route path="/login" component={Login} />
			    <Route path="/signup" component={Signup} />
			    <Route exact path="/users" component={UserList} />
			    <Route path="/users/:id" component={UserDetail} />
			    <Route exact path="/stories" component={StoryList} />
			    <Route path="/stories/:id" component={StoryDetail} />
			    <Footer />
			  </div>
		  </Router>
		)
	}
} 

/* -----------------    CONTAINER     ------------------ */

const mapState = null;

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchUsers());
    dispatch(fetchStories());
    // what other data might we want to fetch on app load?
  }
});

export default connect(mapState, mapDispatch)(Root);