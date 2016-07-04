//window.jQuery=require('jquery');
require('expose?$!expose?jQuery!jquery');
require('bootstrap-webpack');

require("./style.css");
import React from 'react';
import ReactDOM from 'react-dom';

//document.write(require("./content.js"));


class MyComponent extends React.Component{
	render(){
		const list=[1,2,3,4,5,6,7].map(n=>{
			return (
				<li className="list-group-item" key={n}>item {n} <span className="badge">{n}</span></li>

			);
		});
		return (
			<ul className="list-group">
				{list}
			</ul>
		);
	}
}

ReactDOM.render(<MyComponent />,document.body);
document.write(`
<h1>aaa</h1>
<div>

<div class="dropdown">
  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    Dropdown
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
    <li><a href="#">Action</a></li>
    <li><a href="#">Another action</a></li>
    <li><a href="#">Something else here</a></li>
    <li><a href="#">Separated link</a></li>
  </ul>
</div>
<button type="button" class="btn btn-primary" aria-label="Left Align">
  <span class="glyphicon glyphicon-star" aria-hidden="true"></span>按钮
</button>
</div>
	`);