const crypto = require('crypto');
const qr =  require('qr-image');
// const uuid = require('node-uuid'); //guid  生成唯一key
// let invoice_config = require('./../Config/Config').invoice;
// const tool = require('./tool.js'); //guid  生成唯一key
// const httpclientutils = require('./httpclientutils.js'); //guid  生成唯一key
const log4js = require("../Logs/log4js");
// const {getClientIP}=require("./ip");
// var public_key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDGp/2IzCUcjbZg6Y1rJzthI48r7EyeRonRS3E10WH1mU6mA0jS6eoam0KYSyibYChNzTdBFb5Rm/QJtQiy5kqEwxcvbIBplyUWStoptrh4A4gku9N65NbEBluzrLOW3ttM01Km5wXVRBRyXZcynWkJ+3vhBEpJg/ycYz6AAVEwXQIDAQAB";
// var privatePem = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMan/YjMJRyNtmDpjWsnO2EjjyvsTJ5GidFLcTXRYfWZTqYDSNLp6hqbQphLKJtgKE3NN0EVvlGb9Am1CLLmSoTDFy9sgGmXJRZK2im2uHgDiCS703rk1sQGW7Oss5be20zTUqbnBdVEFHJdlzKdaQn7e+EESkmD/JxjPoABUTBdAgMBAAECgYB7UlYF0hVHwIFzcAkmd9hY2SZL8gkuSEPN9bN14WGagW1dibRvml6F3dRdjmrK6cqbYcXnVYQsTVAVppib1nJzF5PsodMSQUaIIP5GUsINZfjRxZHLko6rRHAqqBMJwzA2GLssyc4Ox+0ljzSroEStpKx3TFKZHorti0vNe4SsgQJBAPL4Rnj7haq3M6A3cWjpTysoxYsIzOuv5GfFZ3KkkudFcRF0uscU6jDAtstd1B79Ol8WoaacFsTFNjsl4pCmdWUCQQDRT1W/mJj90QUGqm0XNsgkuSDUmSN85o2/loetBdEpLqes6vNeESG0yl9yv4FZCth8vnlTmcbQARUfJwhDn/uZAkEAhzcUQQ/4+2CpImi4fKIapPIzvYRQRnnEqtt5Dpv4BSzoF8bWiyRgkHEvSU4WVoimi3SU0ZvcL/VwkMospEN+4QJAVCzHm0nPHSQWFVwsiw1o5/vbjCQZ9XzyvH3ZCmgweZNds1i5jrbtCzvnrsn9RsXp0iD3wfsxzSziRaj41dlc4QJAGbpFc24Db1jLE0F4hA3ol9ULqbZhG7S0tcxu+KbQz1OmWR0aLMKAXnt+AiIdJzxCaObVBzzLm2PHRjwWHflsVg==";

/***
 * 加签
 * @param data 需要加签的代码
 */
function sign(data,privatePem) {
	// var public_key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDGp/2IzCUcjbZg6Y1rJzthI48r7EyeRonRS3E10WH1mU6mA0jS6eoam0KYSyibYChNzTdBFb5Rm/QJtQiy5kqEwxcvbIBplyUWStoptrh4A4gku9N65NbEBluzrLOW3ttM01Km5wXVRBRyXZcynWkJ+3vhBEpJg/ycYz6AAVEwXQIDAQAB";
	privatePem = insert_str(privatePem, '\n', 64);
	privatePem = '-----BEGIN PRIVATE KEY-----\n' + privatePem + '-----END PRIVATE KEY-----';
	var key = privatePem.toString();
	var sign = crypto.createSign('RSA-SHA256');
	sign.update(new Buffer(data, 'utf-8'));
	return sig = sign.sign(key, 'base64');
}

/**
 * 验证签名
 * @param src_sign 签名源串
 * @param signature 已生成的签名
 * @param public_key 公钥
 * @returns {*}
 */
function verify(src_sign,signature,public_key) {
	// var public_key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDGp/2IzCUcjbZg6Y1rJzthI48r7EyeRonRS3E10WH1mU6mA0jS6eoam0KYSyibYChNzTdBFb5Rm/QJtQiy5kqEwxcvbIBplyUWStoptrh4A4gku9N65NbEBluzrLOW3ttM01Km5wXVRBRyXZcynWkJ+3vhBEpJg/ycYz6AAVEwXQIDAQAB";
	// 构造PEM编码
	public_key = insert_str(public_key, '\n', 64);
	public_key = '-----BEGIN PUBLIC KEY-----\n' + public_key + '-----END PUBLIC KEY-----';
	var verifier = crypto.createVerify('RSA-SHA256');
	//console.log('验证签名public key:\n' + public_key);
	//console.log('验证签名src_sign:' + src_sign);
	//console.log('##: ' + signature);
	verifier.update(new Buffer(src_sign, 'utf-8'));
	return verifier.verify(public_key, signature, 'base64');
}


/**
 * 在指定位置插入字符串
 * @param str
 * @param insert_str
 * @param sn
 * @returns {string}
 */
function insert_str(str, insert_str, sn) {
	var newstr = "";
	for(var i = 0; i < str.length; i += sn) {
		var tmp = str.substring(i, i + sn);
		newstr += tmp + insert_str;
	}
	return newstr;
}
// var sss=sign("a=1&b=2&c=3",privatePem)
// console.log(sss);
// var vvv=verify("a=1&b=2&c=3S",sss,public_key)
// console.log(vvv)

/****
 * 
 * str 需要补差的字符串
 * len 补差到哪一个长度  暂定32位
 * c 补什么 '0'
 */
let MakeUp_Count=function (str, len,c) {
    var datastr = str;
    for (let index = 1; index < len; index++) {
        if (str.length <= index && str.length < len) {
            datastr += c;
        }
    }
    return datastr;
}
// console.log(MakeUp_Count('123456781234567812345678123456', 32,'0'))

/**
 *当前或前几个月的时间
 * @param {*} num1 0 代表当前月
 * @returns
 */
let DateFunc=function (num1){
    let nowdate = new Date();
    let timestamp=(nowdate).valueOf();
    nowdate.setMonth(nowdate.getMonth()-num1 );
    let y = nowdate.getFullYear();
    let m = nowdate.getMonth()+1;
    let d = nowdate.getDate();
    let h =nowdate.getHours();
    let f =nowdate.getMinutes();
    let s= nowdate.getSeconds();
    let ms= nowdate.getMilliseconds();

    
    return {
        //当前时间戳
        "date0":timestamp,
        //时间
        "date1":y + "-" + (m < 10 ? "0" + m : m)+"-"+(d < 10 ? "0" + d : d)+" "+ (h < 10 ? "0" + h : h)+":"+ (f < 10 ? "0" + f : f)+":"+ (s < 10 ? "0" + s : s) ,
        //时间
        "date2":y + "-" + (m < 10 ? "0" + m : m)+"-"+(d < 10 ? "0" + d : d),
        //到毫秒 纯数字
        "date3":y + "" + (m < 10 ? "0" + m : m)+""+(d < 10 ? "0" + d : d)+""+ (h < 10 ? "0" + h : h)+""+ (f < 10 ? "0" + f : f)+""+ (s < 10 ? "0" + s : s)+""+(ms<100?(ms<10?"00"+ms:"0"+ms):ms),
    };
  };
  
  /***
   * 保留小数
   * a:传递进来的数字
   */
let DecimalsFunc=function (a,num){
return  parseFloat(  a.toFixed(num))
}

let md5=function (obj,appkey,type){
    if(type==1){
        let  data=appkey+obj+appkey;
        let md5 = crypto.createHash('md5');
        return md5.update(data,'utf-8').digest('hex').toUpperCase();
    }else{
        let md5 = crypto.createHash('md5');
        return md5.update(obj,'utf-8').digest('hex').toUpperCase();
    }
    
}

//字符串加密 BASE64
let enBASE64=function (data){
    return   new Buffer(data).toString('base64')
   }

// 字符串解密 BASE64
let deBASE64=function (data){
       return new Buffer(data, 'base64').toString();
   }

//按ASCII排序
//obj json键值对
let sort_ASCII=function (obj) {

    let objsort = [];
    for (let y in obj) {
        objsort.push(y)
    }
    objsort.sort();
    let jsondata = {};
    for (let k in objsort) {
        jsondata[objsort[k]] = obj[objsort[k]];
    }
    return jsondata;
}

//json转格式 a=1&b=2&c=3
let jsonTostr=function (obj) {
    let arr=[];
    for (let k in obj) {
      arr.push(k+"="+obj[k])
    }
    return arr.join('&');
}


let strTojson=function (obj) {
    let datajson={};
    let arr=obj.split("&");
    for (let k in arr) {
       let s=arr[k].split('=');
       datajson[s[0]]=s[1];
    }
    return datajson;
}

//得到拼接串 value 的拼接串
let spliceStr=function (obj) {
    var str = "";
    for (let k in obj) {
        str += obj[k];
    }
    return str;
}
function isJSON(str) {
    if (typeof str == 'string') {
        try {
          let json_v=  JSON.parse(str);
            return json_v;
        } catch(e) {
            // console.log(e);
            return false;
        }
    }   
}

   /**
    * aes加密
    * @param data 待加密内容
    * @param key 必须为32位私钥
    * @param iv 向量
    * @returns {string}
    */
   let enaes = function (data, key) {
    // console.log("=========================+++++++=======================")
    // console.log(key)
    let iv ="";
    let clearEncoding = 'utf8';
    let cipherEncoding = 'base64';
    let cipherChunks = [];
    let cipher = crypto.createCipheriv('aes-256-ecb', key, iv);
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));
    return cipherChunks.join('');
   }
   
   /**
    * aes解密
    * @param data 待解密内容
    * @param key 必须为32位私钥
    * @param iv 向量
    * @returns {string}
    */
   let deaes = function (data,key) {
    // console.log("=======================================================")
    // console.log(key)
    try {
        if (!data) {
            return "";
        }
        let iv = "";
        let clearEncoding = 'utf8';
        let cipherEncoding = 'base64';
        let cipherChunks = [];
        let decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
        decipher.setAutoPadding(true);
        cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
        cipherChunks.push(decipher.final(clearEncoding));
        return cipherChunks.join('');
    } catch (error) {
        console.log(error)
        return false;
    }
   }
   




  let enInoviceFunc = function (app_id, csmy, method, serial_number, datajson, format, serv_version) {
      let timestamp = DateFunc(0);
      let invoce_data = {
          "appid": app_id,
          "business_data": JSON.stringify(datajson),
          "format": format,
          "method": method,
          "serial_number": serial_number,
          "serv_version": serv_version, //1.0 默认传
          "timestamp": timestamp.date0
      }
      let optdata = JSON.stringify(invoce_data);
      console.log("---------------【加密前的】");
      console.log(optdata)
      let enaes_way = enaes(optdata, csmy);
      console.log("---------------【加密后的】")
      console.log(enaes_way);
      let v = app_id + enaes_way;
      console.log("---------------【未编码前的】")
      console.log(app_id + enaes_way)
      v = "v=" + enBASE64(v);
      return v;
  }





  //后台生成二维码流对象
  let ewm_img=(url)=>{
    //   console.log("===================================================【二维码】")
    //   console.log(url)
    try {
      
        let qr_img = qr.imageSync(url, { type: 'png',margin:0});
        // console.log(qr_img);
        // console.log('-----------------');
        // console.log(Buffer(qr_img).toString('base64'));
        let baseimg=Buffer(qr_img).toString('base64')
        // console.log(baseimg)
        return baseimg;
    } catch (error) {
        return null;
    }
   
  }
module.exports = {
    sign,
    verify,
    sort_ASCII,
    jsonTostr,
    strTojson,
    MakeUp_Count,
    DateFunc,
    DecimalsFunc,
    md5,
    spliceStr,
    enBASE64,
    deBASE64,
    enaes,
    deaes,
    ewm_img,
    enInoviceFunc,
}

