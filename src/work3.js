'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/

import path from 'path';
import ProjectCore from 'project-core';
import createDebug from 'debug';

const $ = global.$ = new ProjectCore();


// 创建Debug函数
$.createDebug = function (name) {
  return createDebug('my:' + name);
};
const debug = $.createDebug('server');


// 加载配置文件
console.log('loading config');
$.init.add((done) => {
  $.config.load(path.resolve(__dirname, 'config.js'));
  const env = process.env.NODE_ENV || null;
  console.log('env:'+env);
  if (env) {
      var configFile=path.resolve(__dirname, '../config', 'work3.js');
      console.log('loading config file:'+configFile);
      try{
        $.config.load(configFile);
      }catch(err){
        console.error('error loading config file:'+configFile+err);
        throw err;
      }
    
  }
  $.env = env;
  done();
});

$.init((err)=>{
  debug('init end');
  if (err){
    console.error(err);
    process.exit(-1);
  }else{
    console.log('inited [env=%s]',$.env);
  }
  debug('test.....');
});