//require('expose?$!expose?jQuery!jquery');
//require('bootstrap-webpack');
/*const jQuery=require('jquery');
window.jQuery=jQuery;*/
import 'bootstrap-webpack';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import App from './App';
import TopicDetail from './Component/TopicDetail';
import Login from './component/Login';
import Signup from './component/Signup';
import NewTopic from './component/NewTopic';
import EditTopic from './component/EditTopic';
import Profile from './component/Profile';
import Notification from './component/Notification';

/*import {getTopicList} from './lib/client';*/
/*
getTopicList({})
	.then(ret => console.log(ret))
	.catch(err=> console.error(err));*/

const e=document.createElement('div');
e.id='app';
document.body.appendChild(e);

ReactDOM.render((
	<Router history={browserHistory}>					    
	      <Route path="/" component={App}>
	      	<Route path="topic/:id" component={TopicDetail}/>
	      	<Route path="new" component={NewTopic}/>
	      	<Route path="topic/:id/edit" component={EditTopic}/>
	      	<Route path="login" component={Login}/>
	      	<Route path="signup" component={Signup}/>
	      	<Route path="profile" component={Profile}/>
	      	<Route path="notification" component={Notification}/>
	      </Route>					    
	</Router>),e);