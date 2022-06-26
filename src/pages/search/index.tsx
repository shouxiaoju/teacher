import { useState,useRef } from 'react'
import { Input ,Form} from 'antd-mobile'
import { SearchOutline,FilterOutline } from 'antd-mobile-icons'
import { connect } from 'umi';
import styles from './index.less'
import Popupty from '../popup'
const  Search=(props:any)=>{
    const {hotlist:{hostlist:{status,tags}} ,dispatch}=props
    const [visible1 ,setVisible1]=useState(false)
    const refs :any=useRef ()
    const searctClick=()=>{
        setVisible1(true)
    }
    const notsearctClick=()=>{
        setVisible1(false)
    }
    const onSubmit = () => {
        let tex= refs.current.nativeElement.value
        getatate(tex)
        refs.current.nativeElement.value=""
        //refs.current.clear
    }
    
      async function getatate(tex:any) {
        let url={"status":status,"pageNo":1,"username":tex,"tags":tags}
        if(tags==="[]"){
            delete url.tags
        }
        await dispatch({
            type:"hostlist/queryUser",
            payload:url,
            name:status,
            username:tex,
            tags
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