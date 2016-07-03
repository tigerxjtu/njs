'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/

module.exports = function (set,get,has){
  set('web.port',3000);

//session secret
  set('web.session.secret','test');
}
