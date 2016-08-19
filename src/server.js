'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/

import './base';

const debug = $.createDebug('server');
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
  //require('./test');

 /* 
  var item= new $.model.User({
    name:`User${$.utils.date('Ymd')}`,
    password:'123456',
    nickname:'test user2'
  });
  item.save(console.log);
*/
});