const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const render = require("koa-art-template");
const path = require("path");
const session = require('koa-session');
const cors = require('koa2-cors');


const env = process.env.NODE_ENV//环境参数
if(env==="dev"){
  console.log("-------------【开发环境】---------------")
  console.log(env)
}
if(env==="production"){
  console.log("-------------【生产环境】---------------")
  console.log(env)
}


//token
const jwt = require('jsonwebtoken')
const aes256way = require("./util/safety.js"); //拓展方法池
const aeskey= require("./Config/Config.js").aes256key; //私钥
const aesiv= require("./Config/Config.js").ivkey; //私钥
const ipaddress = require("./util/ip.js"); //拓展方法池
const tokenutil = require("./util/token.js");//token加密 解密






// const jwtKoa = require('koa-jwt')
// const util = require('util')
// const verify = util.promisify(jwt.verify) // 解密


const log4js = require('./Logs/log4js');
const secret = require("./Config/Config.js").secret;
const appkey = require("./Config/Config.js").appkey;

//用户逻辑表
const Logins=require('./app/controller/system/login');
// const ipaddress = require("../../util/ip.js"); //拓展方法池 ip





//【router】本地控制器
const Main = require("./app/router/main");//主入口


//【router】本地控制器-->【系统设置】
const login = require("./app/router/system/login");//【用户登录】
const menu = require("./app/router/system/menu");//菜单
const role = require("./app/router/system/role");//角色
const user = require("./app/router/system/user");//用户
const myProfile = require("./app/router/system/myProfile");//个人中心


//【api】
const yzm = require("./app/api/yzm");//【验证码】
const Tool = require("./app/api/tool");//工具插件

//----------------------------------------------------页面的路由





//------------------------------------------------【api测试】




// Token 路由拦截中心
app.use(async (ctx, next) => { // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 
  if (!ctx.url.match(/^\/login/)
   && !ctx.url.match(/^\/register/)
   && !ctx.url.match(/^\/public.*/) 
   && !ctx.url.match(/^\/logout/) 
   && !ctx.url.match(/^\/404/) 
   && !ctx.url.match(/^\/500/)
   && !ctx.url.match(/^\/api/) 

 ) 
   {

    let token = ctx.cookies.get('guid');
    console.log(token)
    let result;
    let   aseverify;
    try {
      aseverify=aes256way.decryption(token);//解密aes256
      // console.log("----【aes256way解密---成功】-----");
    } catch (error) {
      aseverify="";
      console.log("----【aes256way解密---失败】-----");
    }
    try {
      console.log(aseverify)
      //token 解密
      result=await tokenutil.deToken(aseverify);
      console.log(result)

    } catch (error) {
      result = false;
    }
    if (Object.prototype.toString.call(result) == "[object Object]") {
      let verifyToken=  await  Logins.user_Token([result.uid,result.identity_type,result.randomkey,result.ip]);
      if(verifyToken){
        return await next();
      } else {
        ctx.cookies.set('guid', '', {
          signed: false,
          maxAge: 0
        })
        return await ctx.redirect("/login");
      }
    } else {
      ctx.cookies.set('guid', '', {
        signed: false,
        maxAge: 0
      })
      return await ctx.redirect("/login");
    }
  } else {
    //判断用户是否已经登录，在线状态则跳转到主页
    if(ctx.url.match(/^\/login/)){
      if( ctx.cookies.get('guid')==undefined || ctx.cookies.get('guid')==""){
        ctx.cookies.set('guid', '', {
          signed: false,
          maxAge: 0
        })
        return await next();
       }else{
        return await ctx.redirect("/");
       }
    }else{
      return await next();
    }
  }
});
























// app.use(async (ctx, next) =>  {
//   let trackdata =  appservice.find('tracklog', {
//     uid: decoded.ukey,
//     randomkey: decoded.randomkey
//   }).then(data => { 
//     console.log("【trackdata】")
//   console.log(trackdata)
//   console.log("【data】")
//   console.log(data)
//    })
//   if (trackdata.length > 0) {
//    next();
//   }else{
//     next();
//   }
// })




//允许跨域
app.use(cors());
//或
// //允许跨域
// app.use(cors({
//   origin: function (ctx) {
//       if (ctx.url === '/cors') {
//           return "*"; // 允许来自所有域名请求
//       }
//       return 'http://127.0.0.1'; // 这样就能只允许 http://127.0.0.1:8080 这个域名的请求了
//       return "*"; // 允许来自所有域名请求
//   },
//   // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'DELETE'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))




// error handler
onerror(app);


// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());
app.use(logger());
// app.use(require("koa-static")(__dirname + "/public"));
app.use(require("koa-static")(__dirname));

//配置 koa-art-template模板引擎
render(app, {
  root: path.join(__dirname, 'views'), // 视图的位置
  extname: '.html', // 后缀名
  // debug: process.env.NODE_ENV !== 'production' //是否开启调试模式
});


//session
app.keys = appkey;
const CONFIG = {
  key: 'ysid', //cookie key (default is koa:sess)
  maxAge: 1000 * 60 * 60 * 2, // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true, //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, //签名默认true
  rolling: true, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false, //(boolean) 会话即将过期时更新会话
};
app.use(session(CONFIG, app));
// 设置值 ctx.session.username = "张三";
// 获取值 ctx.session.username

// //session中保存了页面访问次数，每次请求的时候，会增加计数再把结果返回给用户。
// app.use(ctx => {
//   // ignore favicon
//   if (ctx.path === '/favicon.ico') return;
//   let n = ctx.session.views || 0;
//   ctx.session.views = ++n;
//   ctx.body = n + ' views';
// });


// // logger j记录当前页面的路由和响应时间
// app.use(async (ctx, next) => {
//   const start = new Date();
//   console.log("【日志】")
//   console.log(start)
//   const ms = new Date() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
//   await next();
// });











 //【router】本地控制器--routes
app.use(Main.routes(), Main.allowedMethods());//主入口


//【router】本地控制器-->【系统设置】
app.use(login.routes(), login.allowedMethods());//用户登录
app.use(menu.routes(), menu.allowedMethods());//菜单
app.use(role.routes(), role.allowedMethods());//角色
app.use(user.routes(), user.allowedMethods());//用户
app.use(myProfile.routes(), myProfile.allowedMethods());//个人中心

//----------------------------------------------------页面的路由



//------------------------------------------------【api测试】
//【api】
app.use(yzm.routes(), yzm.allowedMethods());//【验证码---登录使用】
app.use(Tool.routes(), Tool.allowedMethods());//插件



//错误页面 --状态返回
app.use(async (ctx,next) => {
     let status=ctx.response.status;
     console.log("【状态】："+status)
      if (status === 404) {
        await ctx.render("error/404");
    } else if (status === 500) {
        await ctx.render("error/500");
    }else{
      await next();
    }
});
// error-handling
//【错误中心】  在try-catch错误是无法监听的  
//             需要手动释放：ctx.app.emit('error', err, ctx);
//             在需要的代码中放入即可监听
app.on("error", async (err, ctx) => {
  log4js.logerrway(err );
  // await next();
});
module.exports = app;
