import React from 'react';

import Header from './Component/Header';
import Footer from './Component/Footer';
import TopicList from './Component/TopicList';

export default class App extends React.Component{
	render(){
		return (
				<div className="container">
					<Header />
						{this.props.children? this.props.children :<TopicList {...this.props}/>}
					<Footer />
				</div>
			);
	}

}
