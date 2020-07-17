const {
    exec
} = require('../../../Config/DB_MySql');
const log4js= require('../../../Logs/log4js');

// if (rows[0][0].res ==1) {
// 	return {code:200,success:true,msg:"",data:null}
// }else{
// 	return {code:200,success:false,msg:"角色展示失败",data:null}
// }

function   system_role(option){
	return exec("call p_system_role(?,?)", option).then((rows) => {

			return {code:0,success:true,msg:"",data:rows[0]}

   }).catch((err)=>{
	   console.log(err)
	   return {code:0,success:false,msg:"角色展示异常",data:[]}
   })
}


function   system_role_status(option){
	return exec("call p_system_role_status(?,?)", option).then((rows) => {
			if (rows[0][0].res ==1) {
            	return {code:200,success:true,msg:"更新成功",data:null}
            }else{
            	return {code:200,success:false,msg:"更新失败",data:null}
            }
   }).catch((err)=>{
	   console.log(err)
	   return {code:0,success:false,msg:"更新异常",data:[]}
   })
}


function   system_role_del(option){
	return exec("call p_system_role_del(?)", option).then((rows) => {
			if (rows[0][0].res ==1) {
            	return {code:200,success:true,msg:"删除成功",data:null}
            }else{
            	return {code:200,success:false,msg:"删除失败",data:null}
            }
   }).catch((err)=>{
	   console.log(err)
	   return {code:0,success:false,msg:"删除异常",data:[]}
   })
}

function   system_role_add(option){
	return exec("insert into system_role(name,createtime,updatetime,createname,status) values(?,now(),now(),?,'1');", option).then((rows) => {
		if (rows.affectedRows >0) {
			let rolerid = rows.insertId;
			return rolerid;
            }else{
            	return false;
            }
   }).catch((err)=>{
	   console.log(err)
	   //    return {code:0,success:false,msg:"删除异常",data:[]}
	   return false;
   })
}






function   system_role_edit(option){
	console.log(option)
	return exec("call p_system_role_edit(?,?,?,?)", option).then((rows) => {
		console.log(rows)
			if (rows[0][0].res ==1) {
            	return {code:200,success:true,msg:"修改成功",data:null}
            }else if(rows[0][0].res ==2){
				return {code:200,success:false,msg:"角色名重复",data:null}
			}else{
            	return {code:200,success:false,msg:"修改失败",data:null}
            }
   }).catch((err)=>{
	   console.log(err)
	   return {code:0,success:false,msg:"修改异常",data:[]}
   })
}

function   system_role_menu(option){
	return exec("call p_system_role_menu(?)", option).then((rows) => {
            let rowschek=rows[1];
	      	let listarr=[];
            for (let t in rowschek) {
                listarr.push(rowschek[t].mid)
            }
		return {code:200,success:true,msg:"",data:{tabledata:rows[0],checkedarr:listarr}}
   }).catch((err)=>{
	   console.log(err)
	   return {code:0,success:false,msg:"查询失败",data:{tabledata:[],checkedarr:[]}}
   })
}

function   system_role_menu_del(option){
	return exec("call p_system_role_menu_del(?)", option).then((rows) => {
		if (rows[0][0].res ==1) {
			return true;
		}else{
			return false;
		}
   }).catch((err)=>{
	   console.log(err)
	   return false;
   })
}

function   system_role_menu_add(option){
let rid=option[0];
let creatname=option[1];
let listarr=option[2];
let role_userstr = " insert into system_role_menu (rid,mid,createtime,createname,`status`)VALUES ";
let role_userstr_arr=[];
if (listarr.length > 1) {
	for (let key in listarr) {
		let tree_id = listarr[key].id;
		role_userstr_arr.push(" (" + rid + "," + tree_id + ",now(),'" + creatname + "','1')");
	}
	role_userstr += role_userstr_arr.join(',');
} else {
	let tree_id = listarr[0].id;
	role_userstr += " (" + rid + "," + tree_id + ",now(),'" + creatname + "','1')";
}
	return exec(role_userstr, option).then((rows) => {
		if (rows.affectedRows >=1) {
			return true;
		}else{
			return false;
		}
   }).catch((err)=>{
	   return false;
   })
}

function   system_role_menu_filterchild(option){
	   return exec("select id  from( select id  from system_menu where id in  ("+option.join(',')+") and type=1 and parent_id=0  union select id  from system_menu where id in ("+option.join(',')+") and parent_id!=0 and type!=1) as t ", option).then((rows) => {
			return rows;
	   }).catch((err)=>{
		   console.log(err)
		   return null;
	   })
	}

	
	function   system_menu(option){
		return exec("call p_system_menu()", option).then((rows) => {
			if(rows!=null){
				return rows[0];
			}else{
				return []
			}
	   }).catch((err)=>{
		   console.log(err)
		   return []
	   })
	}
// function   system_user_role_add_del(option){
// 	return exec("call p_system_user_role_add_del(?,?,?,?,?)", option).then((rows) => {
// 		if (rows[0][0].res ==1) {
// 			return {code:200,success:true,msg:"角色追加成功",data:null}
// 		}else{
// 			return {code:200,success:false,msg:"角色追加失败",data:null}
// 		}
//    }).catch((err)=>{
// 	   console.log(err)
// 	   return {code:200,success:false,msg:"角色追加失败",data:null}
//    })
// }





module.exports = {
	
	system_menu,
	system_role,
	system_role_status,
	system_role_del,
	system_role_add,
	system_role_edit,
	system_role_menu,
	system_role_menu_del,
	system_role_menu_add,
	system_role_menu_filterchild
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

