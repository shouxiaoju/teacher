import { useState,useRef } from 'react'
import { Input ,Form} from 'antd-mobile'
import { SearchOutline,FilterOutline } from 'antd-mobile-icons'
import { connect } from 'umi';
import styles from './index.less'
import Popupty from '../popup'
const  Search=(props:any)=>{
    
    console.log("搜索的props",props);
    const {hotlist:{hostlist:{status,List,pageNo,loding}} ,dispatch}=props
    const [visible1 ,setVisible1]=useState(false)
    const[username,setUsername]=useState("")
    const refs :any=useRef ()
    const searctClick=()=>{
        setVisible1(true)
    }
    const notsearctClick=()=>{
        setVisible1(false)
    }
    const onSubmit = () => {
        console.log("refs",refs);
        
        let tex= refs.current.nativeElement.value
        
        setUsername(tex)
        getatate(tex)
        refs.current.nativeElement.value=""
        //refs.current.clear
    }
    
      async function getatate(tex:any) {
        await dispatch({
            type:"hostlist/queryUser",
            payload:{"status":status,"pageNo":1,"username":tex},
            name:status,
            username:tex
        })
  }
    
    return (
        <div className={styles.search}>
            <div className={styles.search_search1}>
                <SearchOutline fontSize={16}  style={{ width: 36 }}/>
                <Input ref={refs} placeholder='请输入内容' clearable  />
                <div className={styles.search_but} onClick={onSubmit}>搜索</div>
            </div>
            <div className={styles.search_search2} onClick={searctClick}>
                <div >筛选</div>
                <FilterOutline fontSize={16} />
            </div>
            <Popupty visible1={visible1} notsearctClick={notsearctClick}/>
        </div>
        
    )
}

export default connect((hotlist:any)=>({hotlist}))(Search)