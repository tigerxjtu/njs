'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/
import path from 'path'
import express from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import multiparty from 'multiparty';


module.exports = function(done){
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:false}));
//  app.use(multiparty)
  const router=express.Router();
  $.router=router;

  app.use(router);
  app.use('/static',serveStatic(path.resolve(__dirname,'../../static')));

  app.listen($.config.get('web.port'),(err)=>{
    done && done(err);
  });
}
