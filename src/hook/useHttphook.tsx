import { useState,useEffect } from "react";
import {  Toast } from 'antd-mobile'
import { UploadOutline } from 'antd-mobile-icons'

let url = "https://www.fastmock.site/mock/fe1e37e0a331bc6177530e288327c374/api/api/testInterface";
export default function useHttp(query:any){
    console.log(query,"query");
    
    const [result,setResult]=useState();
    const [loading,setLoading]=useState(true)
    function queryParse(query:any){
        let queryText = "";
        for(let key in query){
            queryText += `${key}=${query[key]}&`;
            }
        return queryText.slice(0,-1);
    }
    url += "?" + queryParse(query);
    async function Http(url:any){
        setLoading(true)
        const options = {method: "GET"}
        return new Promise((resolve,reject)=>{
            fetch(url, options)
            .then(res=>res.json())
            .then(json=>{
                if(json.code==="0000"){
                    resolve(json.data)
                    setLoading(false)
                    setResult(json.data)
                }else{
                    reject(json.desc)
                    Toast.show({
                        icon: 'fail',
                        content: json.desc,
                      })
                }
                console.log(json)
            })
            .catch((err=>{
                Toast.show({
                    icon: 'fail',
                    content: err,
                  })
            }))
            .finally(()=>{
                setLoading(false)
            })
        });
    }
    useEffect(()=>{
        Http(url)
    },[])

    return [result,loading]
}