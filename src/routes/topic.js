'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/

module.exports = function(done){
	//console.log('router...');
  $.router.post('/api/topic/add',$.checkLogin, async function(req, res, next){
    req.body.authorId=req.session.user._id;
    if ('tags' in req.body){
    	req.body.tags = req.body.tags.split(',').map(v=>v.trim()).filter(v=>v);
    }
    const topic = await $.method('topic.add').call(req.body);

    res.apiSuccess({topic:topic});
  });

  $.router.post('/api/topic/list',async function(req, res, next){
  	if ('tags' in req.query){
    	req.query.tags = req.query.tags.split(',').map(v=>v.trim()).filter(v=>v);
    }
    //console.log("list query: "+req.query);
  	const list=await $.method('topic.list').call(req.query);

  	res.apiSuccess({list:list});
  });

  $.router.get('/api/topic/item/:topic_id',async function(req, res, next){
 	var topic=await $.method('topic.get').call({_id:req.params.topic_id});
 	if (!topic) return next(new Error('topic not found'));
  const userId = req.session.user && req.session.user._id && req.session.user._id.toString();
  topic.canEdit= (userId === (topic.authorId&&topic.authorId.toString()));
  
  /*console.log(userId);
  console.log(topic.authorId);
  console.log(userId === (topic.authorId&&topic.authorId.toString()));
  console.log(topic.canEdit);
  console.log(topic);*/
  var t={};
  t= $.utils.cloneObject(topic);
  t.canEdit= (userId === (topic.authorId&&topic.authorId.toString()));

 	res.apiSuccess({topic:t});
  });

  $.router.post('/api/topic/item/:topic_id',$.checkLogin, $.checkTopicAuthor,async function(req,res,next){
  	req.body._id=req.params.topic_id;
  	if ('tags' in req.body){
    	req.body.tags = req.body.tags.split(',').map(v=>v.trim()).filter(v=>v);
    }
  	await $.method('topic.update').call(req.body);
  	const topic=await $.method('topic.get').call({_id:req.params.topic_id});
  	res.apiSuccess({topic});
  });

  $.router.delete('/api/topic/item/:topic_id',$.checkLogin,$.checkTopicAuthor,async function(req,res,next){

  	const topic = await $.method('topic.delete').call({_id:req.params.topic_id});

  	res.apiSuccess({topic});
  });

  $.router.post('/api/topic/item/:topic_id/comment/add',$.checkLogin,async function(req,res,next){

  	req.body._id=req.params.topic_id;
  	req.body.authorId=req.session.user._id;
  	const comment = await $.method('topic.comment.add').call(req.body);

  	res.apiSuccess({comment});
  });


  $.router.delete('/api/topic/item/:topic_id/comment/delete',$.checkLogin,async function(req,res,next){
  	req.body._id=req.params.topic_id;
  	
  	const query={
  		_id:req.params.topic_id,
  		cid: req.body.cid
  	};
  	const comment = await $.method('topic.comment.get').call(query);
  	if (!(comment && comment.comments && comment.comments[0] && 
  		comment.comments[0].authorId.toString()===req.session.user._id.toString())){
  		return next(new Error('access denied'));
  	}

  	await $.method('topic.comment.delete').call(query);


  	res.apiSuccess({comment});
  });


  done();
  //console.log('end router...');
}
