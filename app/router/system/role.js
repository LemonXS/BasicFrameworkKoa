const router = require('koa-router')()
const log4js = require('../../../Logs/log4js');


const {
  system_menu,
  system_role,
  system_role_status,
  system_role_del,
  system_role_edit,
  system_role_add,
  system_role_menu,
  system_role_menu_del,
  system_role_menu_add,
  system_role_menu_filterchild
} = require("../../controller/system/role");


  router.get('/page_role', async (ctx) => {
	await ctx.render('system/page_role');
  })

  router.post('/page_role_content', (ctx) => {
    let pageName = ctx.request.body.page;
    let limitName = ctx.request.body.limit;
    return system_role([pageName,limitName]).then((rows) => {
      // console.log(rows)
      ctx.body = rows;
    })
  })
  
  router.post('/page_role_status', (ctx) => {
    let r_id = ctx.request.body.rkey;
    let r_status = ctx.request.body.rstatus;
    return system_role_status([r_id,r_status]).then((rows) => {
      // console.log(rows)
      ctx.body = rows;
    })
  })
  
  router.post('/page_role_del', (ctx) => {
    let r_id = ctx.request.body.roleid;
    return system_role_del([r_id]).then((rows) => {
      ctx.body = rows;
    })
  })
  
  router.post('/page_role_edit', (ctx) => {
    let Rkey = ctx.request.body.Rkey;
    let Rname = ctx.request.body.Rname;
    let Rcreatname="开发人员";
    let Rradio = ctx.request.body.Rradio;
    // let Oldname = ctx.request.body.Oldname;
    return system_role_edit([Rkey,Rname,Rcreatname,Rradio]).then((rows) => {
      ctx.body = rows;
    })
  })

  router.post('/page_role_menu', (ctx) => {
    let Rkey = ctx.request.body.rkey;
    return system_role_menu([Rkey]).then((rows) => {
      ctx.body = rows;
    })
  })

  router.post('/page_role_menu_edit', (ctx) => {
    let Rkey = ctx.request.body.rolekey;
    let checkedarr = ctx.request.body.checkedarr;

    let creatname = "开发人员";
    return system_role_menu_del([Rkey]).then((rows) => {
      if (isArray(checkedarr)) {
        if (rows) {
          return system_role_menu_filterchild(checkedarr).then((rows_filter) => {
            if (rows_filter != null) {
              return system_role_menu_add([Rkey,creatname,rows_filter]).then((rows_add) => {
                if(rows_add){
                  ctx.body = {
                    code: 200,
                    success: true,
                    msg: "权限变更成功",
                    data: []
                  }
                }else{
                  ctx.body = {
                    code: 200,
                    success: false,
                    msg: "权限变更失败",
                    data: []
                  }
                }
              })
            } else {
              ctx.body = {
                code: 200,
                success: false,
                msg: "权限变更失败",
                data: []
              }
            }
          })

          // system_role_menu_add
          // system_role_menu_filterchild
        } else {
          ctx.body = {
            code: 200,
            success: false,
            msg: "权限变更失败",
            data: []
          }
        }
      } else {
        if (rows) {
          ctx.body = {
            code: 200,
            success: true,
            msg: "权限变更成功",
            data: []
          }
        } else {
          ctx.body = {
            code: 200,
            success: false,
            msg: "权限变更失败",
            data: []
          }
        }

      }


    })
  })

  router.post('/page_menu_content',async (ctx) => {
     return system_menu([]).then((rows) => {
      ctx.body = rows;
    })
  })

  router.post('/page_role_add', (ctx) => {
    let roleinfo = ctx.request.body.roleinfo;
    let rolename = ctx.request.body.rolename;
    let Rcreatname="开发人员";
    return system_role_add([rolename,Rcreatname]).then((rows) => {
      if(rows!=false){
        let rolerid=rows;
        if (isArray(roleinfo)) {
          return system_role_menu_filterchild(roleinfo).then((rows_filter) => {
            if (rows_filter != null) {
              return system_role_menu_add([rolerid,Rcreatname,rows_filter]).then((rows_add) => {
                if(rows_add){
                  ctx.body = {
                    code: 200,
                    success: true,
                    msg: "角色添加成功",
                    data: []
                  }
                }else{
                  ctx.body = {
                    code: 200,
                    success: false,
                    msg: "角色添加失败",
                    data: []
                  }
                }
              })
            } else {
              ctx.body = {
                code: 200,
                success: false,
                msg: "角色添加失败",
                data: []
              }
            }
          })
        }else{
          ctx.body = {code:200,success:false,msg:"角色权限不能为空",data:null}
        }
      }else{
        ctx.body = {code:200,success:false,msg:"创建角色失败",data:null}
      }
    })
  })
  
  function isArray(o){

    return Object.prototype.toString.call(o)== '[object Array]';
    
    }
module.exports = router


