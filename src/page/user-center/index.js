'use strict';

require('./index.css');
require('@/common/nav/index.js');
require('@/common/header/index.js');

var _mm = require('util/mm.js');
var navSide = require('@/common/nav-side/index.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
	init:function(){
		this.onLoad();
	this.loadUserInfo();
	},
	onLoad:function(){
		navSide.init({
			name:'user-center'
		})
	},
	loadUserInfo:function(){
		var userHtml = ''
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_mm.errorTips();
		})
	}
}

$(function(){
	page.init();
})