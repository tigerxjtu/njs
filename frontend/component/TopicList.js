import React from 'react';
import { Link } from 'react-router';
import {getTopicList} from '../lib/client';

export default class TopicList extends React.Component{
	
	constructor(props){
		super(props);
		this.state={};
	}

	componentDidMount(){
		getTopicList({})
			.then(ret=>this.setState({list:ret.list}))
			.catch(err => console.error(err));
	}

	render(){
		const list = Array.isArray(this.state.list)?this.state.list :[];
		return (
				<ul className="list-group">
				{list.map((item,i) => {
					return <li className="list-group-item" key={i}><Link to={`/topic/${item._id}`}>{item.title}</Link></li>
				})}
				</ul>
			);
	}
}