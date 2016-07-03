'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/

module.exports = function(done){
	//console.log('router...');
  $.router.get('/',function(req, res, next){
    res.end(`现在是北京时间${new Date()}`);
  });
  done();
  //console.log('end router...');
}
