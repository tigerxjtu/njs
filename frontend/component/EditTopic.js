import React from 'react';
import jQuery from 'jquery';
import {getTopicDetail,updateTopic} from '../lib/client';
import {redirectUrl} from '../lib/utils';
import TopicEditor from './TopicEditor';

export default class NewTopic extends React.Component{
	
	constructor(props){
		super(props);
		this.state={};
	}

	componentDidMount(){
		getTopicDetail(this.props.params.id)
			.then(topic=> {
				this.setState({topic});

			})
			.catch(err => console.log(err));
	}


	render(){
		if (!this.state.topic){
		return (
				<div>正在加载中...</div>
			);
		}
		
		return (
			<TopicEditor 
				title='编辑主题'
				topic={this.state.topic}
				onSave={(topic, done)=>{
						updateTopic(this.props.params.id,topic.title,topic.tags,topic.content)
							.then(ret=>{
								done();
								redirectUrl(`/topic/${ret._id}`);
							})
							.catch(err => {
								done();
								alert(err);
							});
					}

				}
			/>
		);
	}
}