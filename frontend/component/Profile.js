import React from 'react';
import jQuery from 'jquery';
import {redirectUrl} from '../lib/utils';

import {loginUser, updateProfile} from '../lib/client';

export default class Profile extends React.Component{
	constructor(props){
		super(props);
		this.state={};
	}

	componentDidMount() {
    loginUser()
      .then(user => this.setState(user))
      .catch(err => console.error(err));
  	}
	
	handleChange(name,e){
		//console.log(name,e.target.value);
		this.state[name]=e.target.value;
	}

	handleSave(e){
		const $btn=jQuery(e.target);
		$btn.button('loading');
		updateProfile(this.state.email,this.state.nickname, this.state.about)
		.then(ret=>{
			$btn.button('reset');
			console.log(ret);
			alert('修改成功！');
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
				  <div className="panel-heading">{this.state.name} 的个人设置</div>
				  <div className="panel-body">
				    <form>
					  <div className="form-group">
					    <label htmlFor="inputEmail">邮箱</label>
					    <input type="email" className="form-control" id="inputEmail" onChange={this.handleChange.bind(this,'email')} placeholder="" value={this.state.email} />
					  </div>
					  <div className="form-group">
					    <label htmlFor="inputNickname">昵称</label>
					    <input type="text" className="form-control" id="inputNickname" onChange={this.handleChange.bind(this,'nickname')} placeholder="" value={this.state.nickname}/>
					  </div>
					  <div className="form-group">
		                <label htmlFor="inputAbout">个人介绍</label>
		                <textarea className="form-control" id="inputAbout" onChange={this.handleChange.bind(this, 'about')} placeholder="">{this.state.about}</textarea>
		              </div>
					  
					  <button type="button" className="btn btn-primary" onClick={this.handleSave.bind(this)}>保存</button>
					</form>
				  </div>
				</div>
			</div>
		);
	}
}