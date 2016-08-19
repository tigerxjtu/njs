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
          const ip = req.headers['x-forwarder-for']||req.connection.remoteAddress;   
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

      if (req.session.github_user) {
        await $.method('user.update').call({
          _id: user._id,
          githubUserName: req.session.github_user.username,
        });
        delete req.session.github_user;
      }

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

  $.router.post('/api/user/profile', $.checkLogin, async function (req, res, next) {

    const update = {
      _id: req.session.user._id,
    };
    if ('email' in req.body) update.email = req.body.email;
    if ('nickname' in req.body) update.nickname = req.body.nickname;
    if ('about' in req.body) update.about = req.body.about;

    const ret = await $.method('user.update').call(update);

    const user = await $.method('user.get').call({_id: req.session.user._id});
    req.session.user.email = user.email;
    req.session.user.nickname = user.nickname;
    req.session.user.about = user.about;

    res.apiSuccess(user);

  });

  $.router.get('/api/user/:id/unbindGithub', $.checkLogin, async function (req, res, next){
    const update = {
      _id: req.session.user._id,
      githubUserName: null
    };
    const ret = await $.method('user.update').call(update);
    res.apiSuccess(ret);
  });

  $.router.post('/api/user/request_reset_password', async function (req, res, next) {

    if (!req.body.email) return next(new Error('missing parameter `email`'));

    const user = await $.method('user.get').call({email: req.body.email});
    if (!user) return next(new Error(`user ${req.body.email} does not exists`));

    const ttl = 3600;
    const code = await $.captcha.generate({
      type: 'reset_password',
      email: req.body.email,
    }, ttl);

    await $.method('mail.sendTemplate').call({
      to: req.body.email,
      subject: '重置密码',
      template: 'reset_password',
      data: {code, ttl},
    });

    res.apiSuccess({email: req.body.email});

  });


  $.router.post('/api/user/reset_password', async function (req, res, next) {

    if (!req.body.code) return next(new Error('missing parameter `code`'));
    if (!req.body.email) return next(new Error('missing parameter `email`'));
    if (!req.body.password) return next(new Error('missing parameter `password`'));

    const user = await $.method('user.get').call({email: req.body.email});
    if (!user) return next(new Error(`user ${req.body.email} does not exists`));

    const data = await $.captcha.get(req.body.code);
    if (!data) return next(new Error(`invalid captcha code ${req.body.code}`));
    if (data.type !== 'reset_password') return next(new Error(`invalid captcha code ${req.body.code} type`));
    if (data.email !== req.body.email) return next(new Error(`invalid captcha code ${req.body.code} email`));

    const ret = await $.method('user.update').call({
      _id: user._id,
      password: req.body.password,
    });

    res.apiSuccess({email: req.body.email});

  });

  done();
  //console.log('end router...');
}
