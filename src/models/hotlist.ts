import { request } from "umi"


async function gethttp(query:any): Promise<any>{
  let url = "https://www.fastmock.site/mock/fe1e37e0a331bc6177530e288327c374/api/api/testInterface";
  url += "?" + queryParse(query);
  const options = {method: "GET"}
  return await fetch(url, options)
    .then(res=>res.json())
    .then(json=>{
      if(json.code==="0000"){
        return json.data     
      }else{
        return json.desc       
      }
    })
}
function queryParse(query:any){
  let queryText = "";
  for(let key in query){
      queryText += `${key}=${query[key]}&`;
      }
  return queryText.slice(0,-1);
}
export default {
    namespace :"hostlist",//命名空间
    state :<any> {//数据
      List:[],
      pageNo:0,
      pageSize:5,
      totalRecord:1,
      loding:true,
      username:"",
      tags:[],
      status :1
    },
   
    effects: {//异步操作
      *queryUser ({ payload,name,username  }:any, { call, put }:any): any {
        console.log("dispatch传递的参数",payload,name,username);
        const  data  = yield call(gethttp,payload,username);
        console.log("接口返回的数据",data);
        yield put({ type: 'queryUserSuccess', payload: data ,name,username});
      },
    },
   
    reducers: {//同步操作
      queryUserSuccess(state: any, { payload ,name,username}:any) {
        console.log("name",name,username);
        let obj={...state}
        console.log(obj.status!==name);
        
        if(obj.status!==name){
          obj.List=[]
          obj.status=name
        }
        if(obj.username!==username){
          obj.List=[]
          obj.username=username
        }
        obj.List= obj.List.concat(payload.List)
        obj.pageNo=payload.pageNo
        obj.pageSize=payload.pageSize
        obj.totalRecord=payload.totalRecord
        if(payload.List.length===0){
          obj.loding=false
        }else{
          obj.loding=true
        }
        console.log("处理后的数据",obj,payload.List);
        return obj
      },
    },
   
  };