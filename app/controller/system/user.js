const {
    exec
} = require('../../../Config/DB_MySql');
const log4js= require('../../../Logs/log4js');

//user表的table数据
function  system_user(option){
    return exec("call p_system_user(?,?)", option).then((rows) => {
        // if (rows.affectedRows > 0) {
        //     return true
        // } else {
        //     return false;
		// }
		if(rows!=null){
			return {
				"code": 0,
				"msg": true,
				"count": rows[1][0].num,
				"data":  rows[0]
			   }
		}else{
			return {
				"code": 0,
				"msg": true,
				"count": 0,
				"data":  []
			}
		}
     }).catch((err)=>{
		 console.log(err)
		return {
			"code": 0,
			"msg": true,
			"count": 0,
			"data":  []
		}
	 })
}

//user表的table数据
function   system_user_add(option){
	return exec("call p_system_user_add(?,?,?,?)", option).then((rows) => {
		if (rows[0][0].res ==1) {
			return {code:200,success:true,msg:"注册成功",data:[]}
		} else if(rows[0][0].res == 2){
			return {code:200,success:false,msg:"账号已存在",data:[]}
		}else{
			return {code:200,success:false,msg:"注册失败",data:[]}
		}
	//   if (rows.affectedRows > 0) {
	//       return true
	//   } else {
	//       return false;
	//   }
   }).catch((err)=>{
	   console.log(err)
	   return false;
   })
}


//user表的table数据
function   system_user_status(option){
	
	return exec("call p_system_user_status(?,?)", option).then((rows) => {
		if (rows[0][0].res ==1) {
			return {code:200,success:true,msg:"状态修改成功",data:[]}
		} else{
			return {code:200,success:false,msg:"状态修改失败",data:[]}
		}
	//   if (rows.affectedRows > 0) {
	//       return true
	//   } else {
	//       return false;
	//   }
   }).catch((err)=>{
	   console.log(err)
	   return false;
   })
}


function   system_user_edit(option){
	return exec("call p_system_user_edit(?,?,?,?,?)", option).then((rows) => {
		if (rows[0][0].res ==1) {
			return {code:200,success:true,msg:"修改成功",data:[]}
		} else{
			return {code:200,success:false,msg:"修改失败",data:[]}
		}

   }).catch((err)=>{
	   console.log(err)
	   return {code:200,success:false,msg:"修改失败",data:[]}
   })
}


function   system_user_del(option){
	return exec("call p_system_user_del(?)", option).then((rows) => {
		if (rows[0][0].res ==1) {
			return {code:200,success:true,msg:"删除成功",data:[]}
		} else{
			return {code:200,success:false,msg:"删除失败",data:[]}
		}
   }).catch((err)=>{
	   console.log(err)
	   return {code:200,success:false,msg:"删除失败",data:[]}
   })
}


function   system_user_roleedit(option){
	return exec("call p_system_user_roleedit(?)", option).then((rows) => {
			return {code:200,success:true,msg:"",data:{rolelist:rows[0],
				userrole:rows[1]}
				}
   }).catch((err)=>{
	   console.log(err)
	   return {code:200,success:false,msg:"查询失败",data:{rolelist:null,
		userrole:null}
		}
   })
}

function   system_user_role_add_del(option){
	return exec("call p_system_user_role_add_del(?,?,?,?,?)", option).then((rows) => {
		if (rows[0][0].res ==1) {
			return {code:200,success:true,msg:"角色追加成功",data:null}
		}else{
			return {code:200,success:false,msg:"角色追加失败",data:null}
		}
   }).catch((err)=>{
	   console.log(err)
	   return {code:200,success:false,msg:"角色追加失败",data:null}
   })
}


module.exports = {
    system_user,
	system_user_add ,
	system_user_status,
	system_user_edit,
	system_user_del,
	system_user_roleedit,
	system_user_role_add_del
}






//-------------------------------------------------【公共事件】---------------------------------------------
//菜单专用格式转换----页面刷新
function navstoTree(data) {
	// 删除 所有 children,以防止多次调用
	data.forEach(function (item) {
		delete item.children;
	});
	// 将数据存储为 以 id 为 KEY 的 map 索引数据列
	var map = {};
	data.forEach(function (item) {
		map[item.id] = item;
	});
	var val = [];
	data.forEach(function (item) {
		// 以当前遍历项，的pid,去map对象中找到索引的id
		var parent = map[item.parent_id];
		// 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
		if (parent) {
			(parent.children || ( parent.children = [] )).push(item);
		} else {
			//如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
			item["ischeck"]=(item.ischeck==1?true:false);
			item["spread"]=(item.spread==1?true:false);
			val.push(item);
		}
	});
	return val;
}
