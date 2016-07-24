import React from 'react';
import jQuery from 'jquery';

import {addTopic} from '../lib/client';
import {redirectUrl} from '../lib/utils';
import TopicEditor from './TopicEditor';
//import MarkdownEditor from './MarkdownEditor';

export default class NewTopic extends React.Component{
	
	constructor(props){
		super(props);
		this.state={};
	}


	render(){
		return (
			<TopicEditor 
				title='发表主题'
				topic={null}
				onSave={function(topic, done){
						addTopic(topic.title,topic.tags,topic.content)
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