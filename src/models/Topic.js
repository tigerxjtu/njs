'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/
import mongoose from 'mongoose';

module.exports = function (done){
  const Schema=mongoose.Schema;
  const ObjectId=Schema.ObjectId;
  var Topic= new Schema({
    authorId: {type:ObjectId, index:true, ref:'User'},
    title: {type:String, trim:true},
    content:{type:String},
    tags:[{type:String,index:true}],
    createdAt:{type:Date,index:true},
    updatedAt:{type:Date,index:true},
    lastCommentedAt:{type:Date,index:true},
    comments:[{
      //cid:ObjectId,
      authorId:ObjectId,
      content:String,
      createdAt:Date
    }],
    pageView:{type:Number}
  });

  $.mongodb.model('Topic',Topic);

//  $.model=new Object();
  $.model.Topic=$.mongodb.model('Topic');

  done && done();
}
