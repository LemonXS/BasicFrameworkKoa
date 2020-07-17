const router = require('koa-router')()
const log4js = require('../../../Logs/log4js');
// router.prefix('/users') //很重要，可以在当前地址前面添加一个 前缀 /xxx
const {
	system_navs,
	system_menu,
	system_menu_sort,
  system_menu_status,
  system_menu_del,
  system_menu_add,
  system_menu_edit,
  system_menu_addmenu
} = require("../../controller/system/menu");


const aes256way = require("../../../util/safety.js"); //拓展方法池
const tokenutil = require("../../../util/token.js");

//【浏览器--菜单加载】
router.post('/navs', async (ctx) => {
   try {
      let tokencookie = ctx.cookies.get('guid');
  if(tokencookie!="" && tokencookie!=undefined){
      console.log("---------------------------------------【Cookie使用中】------------------------------------")
      //解密 guid 获取cookie信息
      var deaes256Str=aes256way.decryption(tokencookie);
      let deTokenStr= await tokenutil.deToken(deaes256Str);
      // console.log(deTokenStr)
      if(deTokenStr!=false){
          console.log("---------------------------------------【Cookie验证成功】------------------------------------")
          console.log(deTokenStr)
          let resData=  await system_navs([deTokenStr.uid]);
         //  console.log(resData);
          ctx.body=resData;
      }else{
          console.log("---------------------------------------【Cookie解码失败】------------------------------------")
          ctx.body=  {code:9999,success:false,msg:"异常错误",data:null};
      }
  }else{
      console.log("---------------------------------------【Cookie失效】------------------------------------")
      ctx.body=  {code:9999,success:false,msg:"异常错误",data:null};
  }
  } catch (error) {
      console.log(error)
      ctx.body=  {code:9999,success:false,msg:"异常错误",data:null};
  }
  })

  
  //菜单页面
  router.get('/page_menu', async (ctx) => {
    await ctx.render('system/page_menu');
  })
  
 //菜单页面内容
  router.get('/system_menu', async (ctx) => {
    let resData=  await  system_menu([]);
    // console.log("------菜单内容------");
    // console.log(resData);
     ctx.body=resData;
  })

 //菜单页面内容-上下移动排序
 router.post('/system_menu_sort', async (ctx) => {
var dq_id=ctx.request.body.dq_id;
var dq_order=ctx.request.body.dq_order;
var th_id=ctx.request.body.th_id;
var th_order=ctx.request.body.th_order;
console.log(dq_id)
console.log(dq_order)
console.log(th_id)
console.log(th_order)
  let resData=  await  system_menu_sort([dq_id,dq_order,th_id,th_order]);
   ctx.body=resData;
})


//菜单页面内容-菜单状态修改
router.post('/system_menu_status', (ctx) => {
   let id=ctx.request.body.id;//菜单表的ID
   let status=ctx.request.body.status;//当前菜单状态
  return system_menu_status([status,id]).then((data) => {
    console.log(data)
     ctx.body=data;
  })
})

//菜单页面内容-菜单删除
router.post('/system_menu_del', (ctx) => {
   let id=ctx.request.body.mid;//菜单表的ID
  return system_menu_del([id]).then((data) => {
     ctx.body=data;
  })
})

//菜单页面内容-菜单添加
router.post('/system_menu_add', (ctx) => {
  let menu_id=ctx.request.body.menu_id;//ID
  let menu_title=ctx.request.body.menu_title;//标题
  let menu_icon=ctx.request.body.menu_icon;//icon
  let menu_path=ctx.request.body.menu_path;//路径
  let menu_status=ctx.request.body.menu_status;//状态

 return system_menu_add([menu_id,menu_title,menu_icon,menu_path,menu_status]).then((data) => {
    ctx.body=data;
 })
})


//菜单页面内容-菜单修改
router.post('/system_menu_edit', (ctx) => {
  let menu_id=ctx.request.body.menu_id;//ID
  let menu_title=ctx.request.body.menu_title;//标题
  let menu_icon=ctx.request.body.menu_icon;//icon
  let menu_path=ctx.request.body.menu_path;//路径
  let menu_status=ctx.request.body.menu_status;//状态
  let menu_order=ctx.request.body.menu_order;//序号

 return system_menu_edit([menu_title,menu_icon,menu_path,menu_status,menu_order,menu_id]).then((data) => {
    ctx.body=data;
 })
})

//菜单页面内容-一级菜单添加（创建是否有子集）
router.post('/system_menu_addmenu', (ctx) => {
   let menu_title=ctx.request.body.menu_title;//标题
   let menu_icon=ctx.request.body.menu_icon;//icon
   let menu_path=ctx.request.body.menu_path;//路径
   let menu_type=ctx.request.body.menu_type;//类型
 


  return system_menu_addmenu([menu_title,menu_icon,menu_path,menu_type]).then((data) => {
     ctx.body=data;
  })
 })
 


module.exports = router