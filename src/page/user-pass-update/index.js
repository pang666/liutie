'use strict';

require('./index.css');
require('@/common/nav/index.js');
require('@/common/header/index.js');

var _mm = require('util/mm.js');
var navSide = require('@/common/nav-side/index.js');
var _user = require('service/user-service.js');

var page = {
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad:function(){
		navSide.init({
			name:'user-pass-update'
		})
	},
	bindEvent:function(){
		var _this = this;
		var validateResult;
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				password:$.trim($('#password').val()),
				passwordNew:$.trim($('#password-new').val()),
				passwordConfirm:$.trim($('#password-confirm').val())
			},
			validateResult = _this.validateForm(userInfo);
			if (validateResult.status) {
				_user.updatePassword({
					passwordOld:userInfo.password,
					passwordNew:userInfo.passwordNew,
				}, function(res, msg){
					_mm.successTips(msg);
					window.location.href = "./user-result.html?type=user-pass-update";
				},function(errMsg){
					_mm.errorTips(errMsg)
				});
			}else{
				_mm.errorTips(validateResult.msg)
			}
		})
	},
	validateForm:function(formData){
		var result = {
			status:false,
			msg:''
		};
		if (!_mm.validate(formData.password, 'require')) {
			result.msg = '原密码不能为空';
			return result;
		}
		if (formData.password.length < 6 || !formData.passwordNew) {
			result.msg = '密码长度不能少于6位';
			return result;
		}
		if (formData.passwordNew !== formData.passwordConfirm) {
			result.msg = '两次输入的密码不一致';
			return result;
		}

		result.status = true;
		result.msg = '验证通过';
		return result;
	}
}

$(function(){
	page.init();
});