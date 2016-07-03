'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/
import mongoose from 'mongoose';

module.exports = function (done){
  const debug=$.createDebug('init:mongodb');
  debug('connecting to mongodb:%s',$.config.get('db.mongodb'));

  console.log($.config.get('db.mongodb'));
  const conn=mongoose.createConnection($.config.get('db.mongodb'));
  $.mongodb=conn;
  $.model={};

  //const Schema=mongoose.Schema;
  //const ObjectId=Schema.ObjectId;
  const ObjectId=mongoose.Types.ObjectId;
  $.utils.ObjectId=ObjectId;

  done && done();
}
