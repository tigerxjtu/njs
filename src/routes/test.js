'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/

import path from 'path';

module.exports = function(done){
	//console.log('router...');
  $.router.get('*',function(req, res, next){
    //res.end(`现在是北京时间${new Date()}`);
    if (req.url.indexOf('/api/')!==0 && req.url.indexOf('build/')!==0){
    	res.sendFile(path.resolve(__dirname,'../../frontend/index.html'));
	}else{
		next();
	}
  });
  done();
  //console.log('end router...');
}
