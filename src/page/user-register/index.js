'use strict'

require('./index.css');
require('@/common/nav-simple/index.js');
require('node_modules/font-awesome/css/font-awesome.min.css');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

//错误提示对象
var formError = {
	show:function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide:function(){
		$('.error-item').hide().find('.err-msg').text('');
	}
}

var page = {
	init:function(){
		this.bindEvent();
	},
	//绑定事件的函数
	bindEvent:function(){
		//登录按钮点击
		var _this = this
		$('#username').blur(function(){
			var username = $.trim($(this).val());
			if (!username) {
				return
			}
			_user.checkUsername(username, function(res){
				formError.hide()
			},function(errMsg){
				formError.show(errMsg)
			});
		})
		$('#submit').click(function(){
			_this.submit();
		});
		//如果按下回车键，也进行提交
		$('.user-content').keyup(function(e){
			if (e.keyCode === 13) {
				_this.submit()
			}
		})
	},
	//提交表单
	submit:function(){
		//从表单上获取实际数据
		var _this = this;
		var formData = {
			username:$.trim($('#username').val()),
			password:$.trim($('#password').val()),
			passwordConfirm:$.trim($('#password-confirm').val()),
			phone:$.trim($('#phone').val()),
			email:$.trim($('#email').val()),
			question:$.trim($('#question').val()),
			answer:$.trim($('#answer').val())
		}
		//表单验证结果
		var validateResult = this.formValidate(formData);
		//如果验证成功
		if (validateResult.status) {
			console.log('表单验证成功')
			_user.login(formData, function(){
				alert('成功了')
				window.location.href = './user-result.html?type=register';
			},function(errMsg){
				formError.show(errMsg);
			});
		}else{
			formError.show(validateResult.msg)
		}
	},
	formValidate:function(formData){
		var result = {
			status:false,
			msg:''
		};
		if (!_mm.validate(formData.username, 'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		if (!_mm.validate(formData.password, 'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		if (formData.password.length < 6) {
			result.msg = '密码长度不能少于6位';
			return result;
		}
		if (formData.password !== formData.passwordConfirm) {
			result.msg = '两次输入的密码不一致';
			return result;
		}
		if (!_mm.validate(formData.phone, 'phone')) {
			result.msg = '手机格式不正确';
			return result;
		}
		if (!_mm.validate(formData.email, 'email')) {
			result.msg = '邮箱格式不正确';
			return result;
		}
		if (!_mm.validate(formData.question, 'require')) {
			result.msg = '密码提示问题不能为空';
			return result;
		}
		if (!_mm.validate(formData.answer, 'require')) {
			result.msg = '密码提示问题的答案不能为空';
			return result;
		}

		result.status = true;
		result.msg = '验证通过';
		return result;
	}
};
$(function(){
	page.init();
})
