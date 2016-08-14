'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/

module.exports = function (set,get,has){
  set('web.port',3000);

//session secret
  set('web.session.secret','test');

//session redis connection
  set('web.session.redis',{
  	host: '192.168.99.100',
  	port: 32768
  });

 //limit redis connection
 set('limiter.redis',{
 	host: '192.168.99.100',
  	port: 32768,
  	prefix: 'L:'
 });

//captcha redis connection
 set('captcha.redis',{
 	host: '192.168.99.100',
  	port: 32768,
  	prefix: 'C:'
 });
}
