import styles from './index.less'
import { connect } from 'umi';
import { Image, Tag ,Space,SpinLoading,InfiniteScroll} from 'antd-mobile'
function List(props:any){
    const {hotlist:{hostlist:{status,List,pageNo,loding,username,tags}} ,dispatch}=props
    async function loadMore() {
        let url={"status":status,"pageNo":pageNo*1+1,"username":`${username?username:""}`,"tags":tags}
        if(tags==="[]"){
            delete url.tags
        }
            await dispatch({
                type:"hostlist/queryUser",
                payload:url,
                name:status,
                username,
                tags
            })
      }
   const list=()=>{
       if(List.length>0){
            return  List.map((item:any)=>{
                    return(
                        <div className={styles.list_content} key={item.id}>
                            <div className={styles.list_header}>
                                <Image
                                    src={item.img}
                                    width={84}
                                    height={84}
                                    fit='cover'
                                    style={{ borderRadius: 42 }}
                                />
                                <div className={styles.list_headertex}>
                                    <p style={{color:"#5c5c5c"}}>{item.username}</p>
                                    <p style={{color:"#757575"}}>{item.position}</p>
                                </div>
                            </div>
                            <div style={{color:"#757575" ,overflow: "hidden"}}>{item.introduce}</div>
                            <div className={styles.list_footer}>
                                <Space>
                                    {
                                        item.tags.map((itm:any,index:any)=>{
                                            return(
                                                <Tag round color='#2db7f5' className={styles.list_footag} key={index}>{itm}</Tag>
                                            )
                                        })
                                    }
                                </Space>
                            </div>
                        </div>
                        )
                    })
                }else{
                   return  <SpinLoading style={{ '--size': '48px' }} className={styles.list_loding} />
                }
    }

    return(
        <div className={styles.list}>
            {list()}
            <InfiniteScroll loadMore={loadMore} hasMore={loding} threshold={50}/>
        </div>
    )
}
export default connect((hotlist:any)=>({hotlist}))(List)