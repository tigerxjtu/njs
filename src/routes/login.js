'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/

module.exports = function(done){
	//console.log('login router...');

	$.router.get('/api/login_user',async function(req, res, next){
		res.apiSuccess({user:req.session.user,token: req.session.logout_token});
	});
	
	$.router.post('/api/login',async function(req, res, next){
	  	//console.log('/api/login');
	  	//console.log(req.body);
	    const user=await $.method('user.get').call(req.body);
	    if (!user) return next(new Error('user not exists'));

	    if (!$.utils.validatePassword(req.body.password,user.password)){
	    	return next(new Error('password not correct'));
	    }

	    req.session.user=user;
	    req.session.logout_token=$.utils.randomString(20);

	    res.apiSuccess({token: req.session.logout_token});
	
  

  });

 $.router.post('/api/logout',async function(req, res, next){
/* 	console.log('logout');
    if (req.session.logout_token && req.query.token!=req.session.logout_token){
    	return next(new Error('invalid token'));
    }
*/
    delete req.session.user;
    delete req.session.logout_token;
   // console.log('logouted');
    res.apiSuccess({});
  });

  $.router.post('/api/signup',async function(req, res, next){
    const user=await $.method('user.add').call(req.body);

    res.apiSuccess({user:user});
  });

  $.router.get('/api/user/:user_id',async function(req, res, next){
  	const user=await $.method('user.get').call({_id:req.params.user_id});

  	if (user){
  		res.apiSuccess({user:user});
  	}else{
  		return next(new Error('user not found'));
  	}
  });

  done();
  //console.log('end router...');
}
