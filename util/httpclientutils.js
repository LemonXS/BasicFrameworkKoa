
const request = require('request');
const log4js = require('../Logs/log4js'); 

// const http = require('http');
// const qs = require('querystring');

// let unirest = require('unirest');
//var url = "http://10.1.64.237/msg_zbhz.asp?content={CONTENT}&phonelist={MOBILE}&taskId={TASKID}";
//var sendresult="";

//http 发送get请求
function get(url, callback) {
	// console.log(url);
	var req = request({
		url: url,
		method: "GET",
	}, function (error, response, body) {

		if (!error && response.statusCode == 200) {
			//console.log(body);
			callback(body);
		}else{

		}
	});
	req.end();
};
//http 发送post请求
function post(url, data, callback) {
	var req = request({
		url: url,
		method: "POST",
		json: true,
		headers: {
			"content-type": "application/json",
		},
	}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			//console.log(body);
			//msg=body.errormsg;
			//console.log(msg);
			callback(body);
		}else{
			log4js.logerrway("【Post-Error-post】"+error );
			callback(false);
		}
	});
	req.write(data);
	req.end();
};

function post_urlencode(url, data, callback) {
	try{
	var msg = "";
	var req = request({
		url: url,
		method: "POST",
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			'Content-Length': data.length,		
		},
	}, function (error, response, body) {
		if (!error && response.statusCode == 200 ) { // && response.statusCode == 200
			// console.log("---------post_urlencode请求返回的参数200------------")
			// console.log(error);
			// console.log("状态："+response.statusCode);
			// console.log(body);
			// console.log("---------end----------")
			 callback(body);
		} else {
			// console.log("---------post_urlencode请求返回的参数------------")
			//console.log(response)
			try{
				console.log(response.statusCode);
				console.log(response.statusMessage);
			}catch(e){
				console.log(error);
			}finally{
             // console.log(body);
			// console.log("---------end----------")
			log4js.logerrway("【Post-Error-post_urlencode】"+error );
			callback(false);
			}
		}
	});
	req.write(data);
	req.end();
} catch (error) {
	console.log('Post-ERROR-Catch: ', error.stack);
	callback(false);
	res.end();
	
  }
};

exports.post_urlencode = post_urlencode;
exports.post = post;
exports.get = get;





