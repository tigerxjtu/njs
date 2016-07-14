import React from 'react';
import jQuery from 'jquery';
import {redirectUrl} from '../lib/utils';

import {login} from '../lib/client';

export default class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={};
	}
	
	handleChange(name,e){
		//console.log(name,e.target.value);
		this.state[name]=e.target.value;
	}

	handleLogin(e){
		const $btn=jQuery(e.target);
		$btn.button('loading');
		login(this.state.name,this.state.password)
		.then(ret=>{
			$btn.button('reset');
			console.log(ret);
			alert('登录成功！');
			//location.replace('/');
			redirectUrl('/');
		})
		.catch(err => {
			$btn.button('reset');
			alert(err);
		});
	}

	render(){

		return (
			<div style={{width:400, margin:'auto'}}>
				<div className="panel panel-primary">
				  <div className="panel-heading">登录</div>
				  <div className="panel-body">
				    <form>
					  <div className="form-group">
					    <label htmlFor="inputName">用户名</label>
					    <input type="text" className="form-control" id="inputName" onChange={this.handleChange.bind(this,'name')} placeholder="用户名" />
					  </div>
					  <div className="form-group">
					    <label htmlFor="inputPassword">密码</label>
					    <input type="password" className="form-control" id="inputPassword" onChange={this.handleChange.bind(this,'password')} placeholder="密码" />
					  </div>
					  
					  <button type="button" className="btn btn-primary" onClick={this.handleLogin.bind(this)}>登录</button>
					</form>
				  </div>
				</div>
			</div>
		);
	}
}