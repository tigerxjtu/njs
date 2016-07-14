import React from 'react';
import jQuery from 'jquery';
import {getTopicDetail,updateTopic} from '../lib/client';
import {redirectUrl} from '../lib/utils';

export default class NewTopic extends React.Component{
	
	constructor(props){
		super(props);
		this.state={};
	}

	componentDidMount(){
		getTopicDetail(this.props.params.id)
			.then(topic=> {
				this.setState({topic});
				this.state.id=topic._id;
				this.state.title=topic.title;
				this.state.tags=topic.tags;
				this.state.content=topic.content;

			})
			.catch(err => console.log(err));
	}

	handleChange(name,e){
		//console.log(name,e.target.value);
		this.state[name]=e.target.value;
	}

	handleSubmit(e){
		const $btn=jQuery(e.target);
		$btn.button('loading');
		console.log(this.state);
		updateTopic(this.state.id,this.state.title,this.state.tags,this.state.content)
			.then(ret=>{
				$btn.button('reset');
				console.log(ret);
				//alert('登录成功！');
				//location.replace('/');
				redirectUrl(`/topic/${ret._id}`);
			})
			.catch(err => {
				$btn.button('reset');
				alert(err);
			});
	}


	render(){
		const topic = this.state.topic;
		console.log(topic);
		if (!topic){
		return (
				<div>正在加载中...</div>
			);
		}
		return (
			<div className='panel panel-primary'>
				<div className="panel-heading">编辑主题</div>
				  <div className="panel-body">
				    <form>
					  <div className="form-group">
					    <label htmlFor="inputTitle">标题</label>
					    <input type="text" className="form-control" id="inputTitle" value={topic.title} onChange={this.handleChange.bind(this,'title')} placeholder="标题" />
					  </div>
					  <div className="form-group">
					    <label htmlFor="inputTags">标签</label>
					    <input type="text" className="form-control" id="inputTags" value={topic.tags} onChange={this.handleChange.bind(this,'tags')} placeholder="标签" />
					  	<p className="help-block">多个标签使用半角逗号分割</p>
					  </div>
					  <div className="form-group">
					    <label htmlFor="inputCotent">内容</label>
					    <textarea className="form-control" id="inputCotent" rows='10' onChange={this.handleChange.bind(this,'content')}>{topic.content}</textarea>
					  </div>
					  
					  <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>保存</button>
					</form>
				  </div>
			</div>
		);
	}
}