import browserRequest from 'browser-request';

const urlBase = '/api';

export function request(method,path,data={}) {
	return new Promise((resolve, reject)=>{
		method = method.toUpperCase();
		const options ={
			method,
			url: `${urlBase}/${path}`
		};
		if (method === 'GET' || method==='HEAD'){
			options.qs = data;
		}else{
			options.form=data;
		}
		browserRequest(options,(err,res,body)=>{
			if (err){
				reject(err);
			}else{
				let data;
				try{
					data = JSON.parse(body.toString());
				}catch(err){
					return reject(new Error('parse JSON data error:' + err.message));
				}
				if (data.error){
					return reject(data.error);
				}else{
					resolve(data.result);
				}
			}
		});
	});
}

export function getTopicList(options){
	return request('post','topic/list',options);
}

export function getTopicDetail(id){
	return request('get',`topic/item/${id}`).then(ret=>ret.topic);
}

export function login(name, password) {
  return request('post', 'login', {name, password});
}

export function loginUser() {
  return request('get', 'login_user').then(ret => ret.user);
}

export function logout() {
  return request('post', 'logout');
}

export function signup(name, email, password, nickname) {
  return request('post', 'signup', {name, email, password, nickname});
}

export function addTopic(title, tags, content) {
  return request('post', 'topic/add', {title, tags, content}).then(ret => ret.topic);
}

export function updateTopic(id, title, tags, content) {
  return request('post', `topic/item/${id}`, {title, tags, content}).then(ret => ret.topic);
}

export function addComment(id, content) {
  return request('post', `topic/item/${id}/comment/add`, {content}).then(ret => ret.comment);
}

export function deleteComment(id, cid) {
  return request('post', `topic/item/${id}/comment/delete`, {cid});
}

export function updateProfile(email, nickname, about) {
  return request('post', 'user/profile', {email, nickname, about});
}

export function deleteTopic(id) {
  return request('delete', `topic/item/${id}/`);
}