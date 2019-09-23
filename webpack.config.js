//请求Node.js提供的path模块
//path有一个方法：resolve（参数1，参数2）
//参数1：——dirname表示当前目录的路径
//参数2：需要追加的目录名，不需要写/，resolve方法会帮我们自动追加/
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 接口字符串
var str = new Buffer('aHR0cDovL3Rlc3QuaGFwcHltbWFsbC5jb20v', 'base64');
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';	
var getHtmlConfig = function(name){
	return{

			//对哪个html进行打包
			template:'./src/view/'+name+'.html',
			//打包以后的路径和文件
			filename:'view/'+name+'.html',
			inject:true,
			hash:true,
			chunks:['common',name]
	}
}
var config = {
	entry:{
		'common':['./src/page/common/index.js'],
		'index':'./src/page/index/index.js',
		'user-login':'./src/page/user-login/index.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		publicPath:'/dist',
		filename:'js/[name].js',
	},
	externals:{
		'jquery':'window.jQuery'
	},
	// optimization:{
	// 	//抽取公共模块的对象
	// 	splitChunks:{
	// 		//缓存组
	// 		cacheGroups:{
	// 		//commons表示公共的模块
	// 			commons:{
	// 				//即会生成独立通用模块base.js文件（位置以output为准）
	// 				name:'base',
	// 				chunks:"initial",
	// 				minChunks:2,
	// 				minSize:0
	// 			}
	// 		}
	// 	}
	// },
	module:{
		rules:[
			{
				test:/\.css$/,
				// loader:"style-loader!css-loader"
				loader:ExtractTextPlugin.extract({
					fallback:"style-loader",
					use:"css-loader"
				})
			},
			{
				test:/\.(gif|png|jpg|woff|svg|eot|ttf).??.*$/,
				loader:'url-loader?limit=100&name=resource/[name].[ext]'
			}
		]
	},
	plugins:[
		new ExtractTextPlugin("css/[name].css"),
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login'))
	],
	resolve:{
		alias:{ 
			util : path.resolve(__dirname,'src/util'),
			node_modules : path.resolve(__dirname, 'node_modules'),
			service : path.resolve(__dirname, 'src/service'),
			"@" : path.resolve(__dirname,'src/page')
		}
	},
	devServer:{
		port:8088,
		inline:true,
		//配置代理实现跨越
		//
		proxy:{
			"**/*.do":{
				target: str.toString(),
				changeOrigin:true
			}
		}
	}
}

//如果是开发环境，那么添加一个数组元素
if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088');
}

module.exports = config;