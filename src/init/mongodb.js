'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/
import mongoose from 'mongoose';

module.exports = function (done){
  console.log($.config.get('db.mongodb'));
  const conn=mongoose.createConnection($.config.get('db.mongodb'));
  $.mongodb=conn;
  done && done();
}
