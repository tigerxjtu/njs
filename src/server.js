'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/

import path from 'path';
import ProjectCore from 'project-core';

const $=global.$= new ProjectCore();
/*
 module.exports = function(done){
   consol.log('server.js');
 }
*/
//load config file
$.init.add((done)=>{
  $.config.load(path.resolve(__dirname,'config.js'));
  const env=process.env.NODE_ENV || null;
  if (env){ //env='dev.js'
    $.config.load(path.resolve(__dirname,'../config',env+".js"));
  }
  $.env=env;
  console.log($.env);
  done && done();
});
/*
//init mongodb
$.init.load(path.resolve(__dirname,'init','mongodb.js'));
// load model
$.init.load(path.resolve(__dirname,'models'));
*/
//初始化express
$.init.load(path.resolve(__dirname,'init','express.js'));
//加载路由
$.init.load(path.resolve(__dirname,'routes'));

//init
$.init((err)=>{
  if (err){
    console.error(err);
    process.exit(-1);
  }else{
    console.log('inited [env=%s]',$.env);
  }
/*
  var item= new $.model.User({
    name:`User${$.utils.date(Ymd)}`,
    password:'123456',
    nickname:'test user'
  });
  item.save(console.log);
*/
});
