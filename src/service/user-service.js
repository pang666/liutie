'use strict'

var _mm = require('util/mm.js');

var _user = {
	//登出
	logout: function(resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/user/logout.do'),
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	//核对用户信息
	checkLogin: function(resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/user/get_user_info.do'),
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	//登录
	//从客户端form表单中获取userInfo
	//如果验证通过则执行resolve回调函数
	//如果验证没通过，则执行reject回调函数
	login: function(userInfo, resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/user/login.do'),
			method: 'POST',
			data:userInfo,
			success: resolve,
			error: reject
		});
	},
	//检查用户名是否有效
	checkUsername: function(username, resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/user/check_valid.do'),
			method: 'POST',
			data:{
				type:'username',
				str:username
			},
			success: resolve,
			error: reject
		});
	},
	//用户注册
	register: function(userInfo, resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/user/register.do'),
			method: 'POST',
			data:userInfo,
			success: resolve,
			error: reject
		});
	}
}


module.exports = _user;