'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/
import mongoose from 'mongoose';

module.exports = function (done){
  const Schema=mongoose.Schema;
  const ObjectId=Schema.ObjectId;
  var User= new Schema({
    name: {type:String, unique:true},
    email: {type:String, unique:true},
    password:{type:String},
    nickname:{type:String},
    about:{type:String},
    isAdmin:{type:Boolean},
    score:{type:Number}
  });

  $.mongodb.model('User',User);

//  $.model=new Object();
  $.model.User=$.mongodb.model('User');

  done && done();
}
