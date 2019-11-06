'use strict'

var _mm = require('util/mm.js');

var _cart = {
	//登出
	getCartCount: function(resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
			//如果没有指定POST，则默认使用GET的请求方式
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	
	addToCart: function(productInfo, resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/cart/add.do'),
			//如果没有指定POST，则默认使用GET的请求方式
			data:productInfo,
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	getCartList: function(resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/cart/list.do'),
			//如果没有指定POST，则默认使用GET的请求方式
			success: resolve,
			error: reject
		});
	},
	selectProduct:function(productId, resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/cart/select.do'),
			//如果没有指定POST，则默认使用GET的请求方式
			data:{
				productId:productId
			},
			success: resolve,
			error: reject
		});
	},
	unselectProduct:function(productId, resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/cart/un_select.do'),
			//如果没有指定POST，则默认使用GET的请求方式
			data:{
				productId:productId
			},
			success: resolve,
			error: reject
		});
	},
	selectAllProduct:function(resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/cart/select_all.do'),
			//如果没有指定POST，则默认使用GET的请求方式
			success: resolve,
			error: reject
		});
	},
	unselectProduct:function(resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/cart/un_select_all.do'),
			//如果没有指定POST，则默认使用GET的请求方式
			success: resolve,
			error: reject
		});
	},
	updateProduct:function(productInfo, resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/cart/update.do'),
			//如果没有指定POST，则默认使用GET的请求方式
			data:productInfo,
			success: resolve,
			error: reject
		});
	},
	deleteProduct:function(productIds, resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/cart/delete.product.do'),
			//如果没有指定POST，则默认使用GET的请求方式
			data:{
				productIds:productIds
			},
			success: resolve,
			error: reject
		});
	},
}

module.exports = _cart;