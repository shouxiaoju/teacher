import styles from './index.less'
import { useRef ,useEffect,useState } from 'react'
import { connect } from 'umi';
 function Nav(props:any){
    console.log("导航的props",props);
    const {hotlist:{hostlist:{status,List,pageNo,loding,username}} ,dispatch}=props
    const[csst,setCsst]=useState(1)

    async function getatate(name:any) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        setCsst(name)
        await dispatch({
            type:"hostlist/queryUser",
            payload:{"status":name,"pageNo":1,username:`${username?username:""}`},
            name,
            username
        })
  }
    const addstyle=(e:any)=>{
        e = e || window.event; //这一行及下一行是为兼容IE8及以下版本
        let target = e.target || e.srcElement;
        if (target.tagName.toLowerCase() === "div") {
            switch(target.innerText ){
                case "普通讲师" :
                    getatate(1)
                    break;
                case "高阶讲师" :
                    getatate(2)
                    break;
                case "特聘讲师" :
                    getatate(3)
                    break;
                case "超级讲师" :
                    getatate(4)
                    break; 
                default:
                    getatate(5)
            }
        }   
   }
    return(
        <div className={styles.navfist}>
            <div  className={styles.nav} onClick={addstyle}>
                <div className={styles.nav_div} style={{backgroundColor:`${csst===1?"#ff4f03":""}`}}>普通讲师</div>
                <div className={styles.nav_div} style={{backgroundColor:`${csst===2?"#ff4f03":""}`}}>高阶讲师</div>
                <div className={styles.nav_div} style={{backgroundColor:`${csst===3?"#ff4f03":""}`}}>特聘讲师</div>
                <div className={styles.nav_div} style={{backgroundColor:`${csst===4?"#ff4f03":""}`}}>超级讲师</div>
            </div>
        </div>
    )
}

export default connect((hotlist:any)=>({hotlist}))(Nav)