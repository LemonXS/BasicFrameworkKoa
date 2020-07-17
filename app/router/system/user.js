const router = require('koa-router')()
const log4js = require('../../../Logs/log4js');
const utiltool = require('../../../util/tool');
const {
  system_user,
  system_user_add,
  system_user_status,
  system_user_edit,
  system_user_del,
  system_user_roleedit,
  system_user_role_add_del
} = require("../../controller/system/user");


//菜单页面
router.get('/page_user', async (ctx) => {
  await ctx.render('system/page_user');
})


//userpage 获取用户信息界面
router.post('/page_user_content', (ctx) => {
  let pageName = ctx.request.body.page;
  let limitName = ctx.request.body.limit;
  return system_user([pageName, limitName]).then((rows) => {
    ctx.body = rows;
  })
})


//userpage 获取用户信息界面
router.post('/page_user_add', (ctx) => {
  // console.log(ctx.request.body)
  let nname = ctx.request.body.nname;
  let lname = ctx.request.body.lname;
  let pword = ctx.request.body.pword;
  let radio = ctx.request.body.radio;
  pword=utiltool.md5(pword);


  return system_user_add([nname,lname,pword,radio]).then((rows) => {
    console.log(rows)
    ctx.body = rows;
  })
})



//userpage 获取用户信息界面
router.post('/page_user_status', (ctx) => {
  // console.log(ctx.request.body)
  let u_status = ctx.request.body.u_status;
  let u_key = ctx.request.body.u_key;

  return system_user_status([u_key,u_status]).then((rows) => {
    console.log(rows)
    ctx.body = rows;
  })
})


router.post('/page_user_edit', (ctx) => {

  // console.log(ctx.request.body)
  let ukey = ctx.request.body.ukey;
  let nname = ctx.request.body.nname;
  let lname = ctx.request.body.lname;
  let pword = ctx.request.body.pword;
  let radio = ctx.request.body.radio;

  return system_user_edit([ukey,nname,lname,pword,radio]).then((rows) => {
    console.log(rows)
    ctx.body = rows;
  })
})


router.post('/page_user_del', (ctx) => {

  // console.log(ctx.request.body)
  let ukey = ctx.request.body.ukey;

  return system_user_del([ukey]).then((rows) => {
    console.log(rows)
    ctx.body = rows;
  })
})


router.post('/page_user_roleedit', (ctx) => {

  let ukey = ctx.request.body.ukey;
  return system_user_roleedit([ukey]).then((rows) => {
    console.log(rows)
    ctx.body = rows;
  })
})


router.post('/page_user_role_add_del', (ctx) => {
  console.log("-----------------------------------------!!!!!!!")
  console.log(ctx.request.body)
	let tf=ctx.request.body.tf;//是否被选中
	let rkey=ctx.request.body.rkey;//角色id
	let ekey=ctx.request.body.ekey;//用户id
	let status=1;
  let createname="开发者001";
  return system_user_role_add_del([tf,rkey,ekey,createname,status]).then((rows) => {
    console.log(rows)
    ctx.body = rows;
  })
})



module.exports = router