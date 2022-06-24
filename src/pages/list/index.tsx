import styles from './index.less'
import { connect } from 'umi';
import { Image, Tag ,Space,SpinLoading,InfiniteScroll} from 'antd-mobile'
function List(props:any){
    const {hotlist:{hostlist:{status,List,pageNo,loding,username}} ,dispatch}=props
    console.log("列表的props",props);
    
    //const [hasMore, setHasMore] = useState(true)
    async function loadMore() {
            await dispatch({
                type:"hostlist/queryUser",
                payload:{"status":status,"pageNo":pageNo*1+1,username:`${username?username:""}`},
                name:status,
                username
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
            {/* <div className={styles.list_content}>
                <div className={styles.list_header}>
                    <Image
                        src={"https://picsum.photos/333"}
                        width={84}
                        height={84}
                        fit='cover'
                        style={{ borderRadius: 42 }}
                    />
                    <div className={styles.list_headertex}>
                        <p style={{color:"#5c5c5c"}}>远冲</p>
                        <p style={{color:"#757575"}}>广州恒大有限间约的产品经理</p>
                    </div>
                </div>
                <div style={{color:"#757575"}}>
                    我们的讲师是:们么行率王速法类受重电那铁山层体器政了民的风北习该即个论义名已看组法大真作按八制目身海近率眼声还任社格日展厂能术开进还求FPVcph52XM
                </div>
                <div className={styles.list_footer}>
                    <Space>
                        <Tag round color='#2db7f5' className={styles.list_footag} >新手</Tag>
                        <Tag round color='#2db7f5' className={styles.list_footag}>店铺运营</Tag>
                    </Space>
                </div>
            </div> */}
            {list()}
            <InfiniteScroll loadMore={loadMore} hasMore={loding} threshold={50}/>
        </div>
    )
}
export default connect((hotlist:any)=>({hotlist}))(List)