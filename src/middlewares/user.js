'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/

import validator from 'validator';

module.exports = function(done){
	$.checkLogin = function (req,res,next){
		if (!req.session.user && !req.session.user._id) return next(new Error('please login first'));
		
		next();
	};

	$.checkTopicAuthor = async function(req,res,next){
		const topic = await $.method('topic.get').call({_id:req.params.topic_id});
		if (!topic) return next(new Error(`topic ${req.params.topic_id} not exists`));

		req.topic=topic;
		
		if (req.session.user.isAdmin) return next();

		if (topic.authorId.toString()!==req.session.user._id.toString()){
			return next(new Error('access denied'));
		}

		next();
	};


	done();
}