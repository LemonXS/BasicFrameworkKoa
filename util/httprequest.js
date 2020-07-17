
const request = require('request');
const log4js = require('../Logs/log4js'); 

let httpRequest=(method, url, data) =>{

    if (method == "get") {
        return new Promise(function (resolve, reject) {
            request({
                url: url,
                method: "GET",
                qs: data
            }, function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    resolve(body)
                }else{
                    log4js.logerrway("【GET】"+url+"     "+err );
                    reject(null)
                }
            })
        })
    } else if (method == "post") {
        return new Promise(function (resolve, reject) {
            request({
                url: url,
                method: "POST",
                json: true,
                // timeout: 30000,  // 设置请求超时，单位是毫秒
                headers: {
                    "content-type": "application/json",
                },
                form: data
            }, function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    resolve(body)
                }else{
                    log4js.logerrway("【POST】"+url+"     "+err );
                    reject(null)
                }
            })
        })
    }else if (method == "post_urlencode") {
        return new Promise(function (resolve, reject) {
            request({
                url: url,
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    'Content-Length': data.length,		
                },
                form: data
            }, function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    resolve(body)
                }else{
                    log4js.logerrway("【post_urlencode】"+url+"     "+err );
                    reject(null)
                }
            })
        })
    }
}

// httpRequest("post","http://127.0.0.1:8080/dzpj/httpreq",{a:123})
// .then((data)=>{
//     console.log("返回")
//     console.log(data)
//     console.log(data.a)
// })
// .catch((err)=>{
//     console.log("错误")
// console.log(err)
// })


module.exports = {
    httpRequest
};