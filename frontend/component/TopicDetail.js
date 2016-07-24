import React from 'react';
import 'highlight.js/styles/github.css';
import {getTopicDetail,getUserById, addComment, deleteComment, deleteTopic} from '../lib/client';
import {renderMarkdown, redirectUrl} from '../lib/utils';
import {Link} from 'react-router';
import CommentEditor from './CommentEditor';

export default class TopicDetail extends React.Component{
	
	constructor(props){
		super(props);
		this.state={};
	}

	componentDidMount(){
		this.refresh();
		
	}

	refresh(){
		getTopicDetail(this.props.params.id)
			.then(topic=> {
				//console.log('topic:',topic);
				topic.html=renderMarkdown(topic.content);
				if (topic.comments){
					for (const item of topic.comments){
						item.html = renderMarkdown(item.content);
					}
				}

				this.setState({topic});
			})
			.catch(err => console.log(err));
	}

	handleDeleteComment(cid){
		if (confirm('是否删除评论?')){
			deleteComment(this.state.topic._id,cid)
				.then(comment => {
					this.refresh();
				})
				.catch(err =>{
					alert(err);
				});
		}
	}

	handleDeleteTopic(){
		if (confirm('是否删除主题？')){
			deleteTopic(this.state.topic._id)
				.then(()=>{
					redirectUrl('/');
				})
				.catch(err=>{
					alert(err);
				});
		}
	}

	render(){
		const topic = this.state.topic;
		//console.log(topic);
		if (!topic){
		return (
				<div>正在加载中...</div>
			);
		}

		return (
			<div>
				<h2>{topic.title}</h2>
				<hr />
				<section dangerouslySetInnerHTML={{__html: topic.html}}></section>
				<CommentEditor
		          title="发表评论"
		          onSave={(comment, done) => {
		            addComment(this.state.topic._id, comment.content)
		              .then(comment => {
		                done();
		                this.refresh();
		              })
		              .catch(err => {
		                done();
		                alert(err);
		              });
		          }}
		        />
				<ul className="list-group">
				{topic.comments.map((item,i) => {
					/*const user=getUserById(topic.authorId);
					console.log(user);*/
					//console.log(item);
					return (<li className="list-group-item" key={i}>
						<span className="pull-right">
							<button className="btn btn-xs btn-danger" onClick={this.handleDeleteComment.bind(this, item._id)}>
			                    <i className="glyphicon glyphicon-trash"></i>
			                </button>
			            </span>
						{item.user.nickname}于{item.createdAt}说：<br />
						<p dangerouslySetInnerHTML={{__html: item.html}}></p>

					</li>);
				})}
				</ul>
				{!topic.canEdit ? null :
		            <Link to={`/topic/${topic._id}/edit`} className="btn btn-primary">
		              <i className="glyphicon glyphicon-edit"></i> 编辑
		            </Link>
		        }
		        {!topic.canEdit ? null :
		            <button className="btn btn-xs btn-danger" onClick={this.handleDeleteTopic.bind(this)}>
			            <i className="glyphicon glyphicon-trash"></i> 删除
			        </button>
		        }
			</div>
		);
	}
}