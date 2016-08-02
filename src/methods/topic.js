'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/
import validator from 'validator';

module.exports = function(done){
  $.method('topic.add').check({
    authorId:{required: true, validate:(v)=>validator.isMongoId(String(v))},
    title:{required: true},
    content:{required: true},
    tags:{validate:(v)=>Array.isArray(v)}
  });

  $.method('topic.add').register(async function(params){
  	//console.log('save topic');
  	const topic = new $.model.Topic(params);

  	topic.createdAt=new Date();
  	
  	return topic.save();
    
  });

 

  $.method('topic.list').check({
  	authorId:{validate:(v)=>validator.isMongoId(String(v))},
    tags:{validate:(v)=>Array.isArray(v)},
    skip:{validate:(v)=>v>=0},
    limit:{validate:(v)=>v>0}
  });
   $.method('topic.list').register(async function(params){
   	const query={};
   	if (params.authorId) query.authorId=params.authorId;
   	if (params.tags) query.tags={$all:params.tags};
   	//console.log(query);
   	const ret=$.model.Topic.find(query,{
   		authorId:1,
   		title:1,
      content:1,
   		tags:1,
   		createdAt:1,
   		updatedAt:1,
   		comments:1,
   		lastCommentedAt:1,
      pageView:1
   	});

   	if (params.skip) ret.skip(Number(params.skip));
   	if (params.limit) ret.limit(Number(params.limit));

   	return ret;
   });

   $.method('topic.count').check({
    authorId:{validate:(v)=>validator.isMongoId(String(v))},
    tags:{validate:(v)=>Array.isArray(v)}
  });
   $.method('topic.count').register(async function(params){
    const query={};
    if (params.authorId) query.authorId=params.authorId;
    if (params.tags) query.tags={$all:params.tags};
    //console.log(query);
    const ret=$.model.Topic.count(query);


    return ret;
   });


   $.method('topic.get').check({
    _id:{required: true, validate:(v)=>validator.isMongoId(String(v))}
  });
  $.method('topic.get').register(async function(params){

	const topic=$.model.Topic.findOne({_id:params._id});

  	return topic;
  });

  $.method('topic.delete').check({
    _id:{required: true, validate:(v)=>validator.isMongoId(String(v))}
  });
  $.method('topic.delete').register(async function(params){

  	return $.model.Topic.remove({_id:params._id});;
  });

  $.method('topic.update').check({
  	_id:{required: true, validate:(v)=>validator.isMongoId(String(v))},
    title:{required: true},
    content:{required: true},
    tags:{validate:(v)=>Array.isArray(v)}
    
  });
  $.method('topic.update').register(async function(params){
  	const topic= await $.method('topic.get').call(params);
  	if (!topic){
  		throw new Error('topic not exists');
  	}

  	const update={updatedAt:new Date()};
  	if (params.title) update.title=params.title;
  	if (params.content) update.content=params.content;
  	if (params.tags) update.tags=params.tags;
  	

  	return $.model.Topic.update({_id:params._id},{$set:update});
  	
  });

  $.method('topic.incrPageView').check({
    _id:{required: true, validate:(v)=>validator.isMongoId(String(v))}   
  });
  $.method('topic.incrPageView').register(async function(params){

    return $.model.Topic.update({_id:params._id},{$inc:{pageView:1}});
    
  });

   $.method('topic.comment.add').check({
  	_id:{required: true, validate:(v)=>validator.isMongoId(String(v))},
    authorId:{required: true,validate:(v)=>validator.isMongoId(String(v))},
    content:{required: true}
  });

  $.method('topic.comment.add').register(async function(params){

  	const comment ={
  		//cid: new $.utils.ObjectId(),
  		authorId: params.authorId,
  		content: params.content,
  		createdAt: new Date()
  	}; 

    const topic = await $.method('topic.get').call({_id:params._id});
    if (!topic){
      throw new Error('topic not found');
    }
    await $.method('notification.add').call({
      from : params.authorId,
      to: topic.authorId,
      type: 'topic_comment',
      data:{
        _id: params._id,
        title: topic.title
      }
    });
  	

  	return $.model.Topic.update({_id:params._id},{$push:{comments:comment}});
  	
  });

  $.method('topic.comment.get').check({
  	_id:{required: true, validate:(v)=>validator.isMongoId(String(v))},
    cid:{required: true,validate:(v)=>validator.isMongoId(String(v))}
  });

  $.method('topic.comment.get').register(async function(params){

  	return $.model.Topic.findOne({_id:params._id, 'comments._id':params.cid},{'comments.$':1});
  	
  });

  $.method('topic.comment.delete').check({
  	_id:{required: true, validate:(v)=>validator.isMongoId(String(v))},
    cid:{required: true,validate:(v)=>validator.isMongoId(String(v))},
  });

  $.method('topic.comment.delete').register(async function(params){
  	

  	return $.model.Topic.update({_id:params._id},{$pull:{comments:{_id:params.cid}}});
  	
  });



  done();
}
