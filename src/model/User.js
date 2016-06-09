'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/
import mongoose from 'mongoose';

module.exports = function (set,get, has){
  const Schema=mongoose.Schema;
  const ObjectId=Schema.ObjectId;
  var User= new Schema({
    name: {type:String, unique:true},
    password:{type:String},
    nickname:{type:String}
  });

  $.mongodb.model('User',User);
  $.model.User=$.mongodb.model('User');

  done && done();
}
