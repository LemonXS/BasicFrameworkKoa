//【Token方法集合】
const jwt = require('jsonwebtoken')
const aes256way = require("./safety.js"); //拓展方法池
const c_aeskey= require("../Config/Config").aes256key; //私钥  aes256加密的私钥
const c_aesiv= require("../Config/Config.js").ivkey; //私钥 aes256加密的向量

const c_secret = require("../Config/Config.js").secret;//token的密钥
const c_appkey = require("../Config/Config.js").appkey;//session 或 cookie的密钥




// const aes256way = require("../../util/safety.js"); //拓展方法池

let tokenutil = module.exports = {};

/**
 *jwt 加密 token  
 * @param {*} jsonstr 要被加密的json  只能是json格式
 * @param {*} secret token的密钥
 * @returns  返回加密的字符串
 */
tokenutil.enToken = function(jsonstr,secret=c_secret){
    // console.log("secret token的密钥")
    // console.log(secret)
    let token = jwt.sign(jsonstr, secret, {
        expiresIn: '1h'
      }) //token签名 有效期为1小时
    return token;
}

/**
 *jwt 解密 token  
 * @param {*} str 被加密的token
 * @param {*} secret token的密钥
 * @returns  返回 json或false
 */
tokenutil.deToken =async function(str,secret=c_secret){
    // console.log("secret token的密钥")
    // console.log(secret)
    var  result="";
    try {
        result =  jwt.verify(str, secret, function (err, decoded) {
          if (!err) {
             
            // console.log("【总路径 Token 监控】")
            // console.log(decoded)
            // console.log(decoded); //会输出解密的，如果过了60秒，则有错误。

            //成功则返回token中加密的参数
            return decoded;
          } else {
            //解密失败就返回false
            console.log("【Token-err】：" + err)
            return false;
          }
        })
      } catch (error) {
        result = false;
      }
    return result;
}

//可以用这句话来判断 是否成功  ，是json的那么就代表解密成功
// Object.prototype.toString.call(result) == "[object Object]"



tokenutil.GetCookingInfo=async (iscooking)=>{
  try {
    // let tokencookie = ctx.cookies.get('guid');
    let tokencookie = iscooking;
  if(tokencookie!="" && tokencookie!=undefined){
    let deaes256Str=aes256way.decryption(tokencookie);
    let deTokenStr= await tokenutil.deToken(deaes256Str);
    // console.log(deTokenStr)
    if(deTokenStr!=false){
        console.log("---------------------------------------【Cookie验证成功------封装】------------------------------------")
        console.log(deTokenStr)
        // await ctx.render('index',{title:deTokenStr.uname});
        return deTokenStr;
    }else{
        console.log("---------------------------------------【Cookie解码失败------封装】------------------------------------")
        return false;
    }
  }else{
    return false;
  }
  } catch (error) {
    console.log("---------------------------------------【Cookie解码失败------异常】------------------------------------");
    console.log(JSON.stringify(error))
    return false;
  }
}



// ctx.cookies.get('guid');
// tokenutil.GetCookingInfo("EWLJlI/1vS79OCZabqyB4Pv3J2vCQrdm1HD/5JyBcRRRDMmA6QR+t20egOrBAs0l0kibooSCLDp578w9V8GEod8+Q/NV8ehp7ZH5i05vHcgTBGJE17kObp/Ptc1F/T/RHX+PMBu5svBtOmUlrrobOGPz1+kZnR5oBLFZ1w4Y8l27nMvMPHujbv0HhWfnQxQgjZNJRsuRMX422SL7S7RrCoZvfmmeojrZr1FYqdzSezYD4R87rzZNu0TqA30dY8BgQODW0oZwPgJTBcSljx4dEOId/DrMPTzAejV292djKP6qeCB6AF8HeGMseKAiPmGYt7ABGi84ahVbC9fEO/LwKjeEkiXCotIiyW/GUbdTLcw84vpUYf0A3UFp0NWQMDpU").then((data)=>{
// console.log(data)
// })


// let userinfo=await tokenutil.GetCookingInfo(ctx.cookies.get('guid'))


// tokenutil.GetCookingInfo(ctx.cookies.get('guid')).then((data)=>{
// console.log(data)
// })
