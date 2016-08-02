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
      if (!req.body.password) return next(new Error('missing password'));
       //登录限制
       const key = `login:${req.body.name}:${$.utils.date('Ymd')}`;
      {
          //const ip = req.headers['x-forwarder-for']||req.connection.remoteAddress;   
          const key = `login:${ip}:${$.utils.date('Ymd')}`;
          const limit =5;
          const ok = await $.limiter.incr(key);
          if (!ok) throw new Error('out of limits');
      }
	    const user=await $.method('user.get').call(req.body);
	    if (!user) return next(new Error('user not exists'));

	    if (!$.utils.validatePassword(req.body.password,user.password)){
	    	return next(new Error('password not correct'));
	    }

	    req.session.user=user;
	    req.session.logout_token=$.utils.randomString(20);

      await $.limiter.reset(key);

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
    //注册限制
    {
        const ip = req.headers['x-forwarder-for']||req.connection.remoteAddress;   
        const key = `signup:${ip}:${$.utils.date('Ymd')}`;
        const limit =2;
        const ok = await $.limiter.incr(key);
        if (!ok) throw new Error('out of limits');
    }
    const user=await $.method('user.add').call(req.body);

    $.method('mail.sendTemplate').call({
      to: user.email,
      subject: '欢迎',
      template: 'welcome',
      data: user,
    }, err => {
      if (err) console.error(err);
    });

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
