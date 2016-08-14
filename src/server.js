'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/

import path from 'path';
import ProjectCore from 'project-core';
import createDebug from 'debug';

const $=global.$= new ProjectCore();
/*
 module.exports = function(done){
   consol.log('server.js');
 }
*/
//create debug
$.createDebug=function (name){
  return createDebug('my:'+name);
};

const debug=$.createDebug('server');

//load config file
$.init.add((done)=>{
  $.config.load(path.resolve(__dirname,'config.js'));
  const env=process.env.NODE_ENV || null;
  if (env){ //env='dev.js'
    $.config.load(path.resolve(__dirname,'../config',env+".js"));
  }
  $.env=env;
  //console.log($.env);
  debug('load env: %s',$.env);
  done && done();
});

//init mongodb
$.init.load(path.resolve(__dirname,'init','mongodb.js'));
// load model
$.init.load(path.resolve(__dirname,'models'));


//初始化express
$.init.load(path.resolve(__dirname,'init','express.js'));

 //初始化中间件
$.init.load(path.resolve(__dirname,'middlewares'));

//加载路由
$.init.load(path.resolve(__dirname,'routes'));


//load methods
$.init.load(path.resolve(__dirname,'methods'));

//初始化limiter
$.init.load(path.resolve(__dirname,'init','limiter.js'));
//初始化captcha
$.init.load(path.resolve(__dirname,'init','captcha.js'));

//init
$.init((err)=>{
  debug('init end');
  if (err){
    console.error(err);
    process.exit(-1);
  }else{
    console.log('inited [env=%s]',$.env);
  }
  debug('test.....');
  require('./test');

 /* 
  var item= new $.model.User({
    name:`User${$.utils.date('Ymd')}`,
    password:'123456',
    nickname:'test user2'
  });
  item.save(console.log);
*/
});