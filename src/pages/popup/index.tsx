import { Popup, Space, Button,Form ,Selector,Toast} from 'antd-mobile'
import  { useRef} from 'react'
import { connect } from 'umi';
import styles from './index.less'
const Popupty=(props:any)=>{
    const [form] = Form.useForm()
    const {notsearctClick,visible1,hotlist:{hostlist:{status,username,tags}} ,dispatch}=props
    const formRef :any = useRef()
    const onSubmit  = () => {
        const values = form.getFieldsValue()
            let context=values.favoriteFruits
            getatate(JSON.stringify(context))
            notsearctClick()
            //formRef.current?.resetFields()
      }
      async function getatate(tex:any) {
            let url={"status":status,"pageNo":1,"username":username,"tags":tex}
            if(tex==="[]"){
                delete url.tags
            }
            console.log("点击搜索时传的参数",url);
            
            await dispatch({
                type:"hostlist/queryUser",
                payload:url,
                name:status,
                username:username,
                tags:tex
            })
    }
    return (
        <div>
            <Space direction='vertical'>
                <Popup
                    visible={visible1}
                    onMaskClick={() => {
                        notsearctClick()
                    }}
                    position='right'
                    bodyStyle={{ width: '60vw' }}
                >
                    <Form
                        form={form}
                        className={styles.popu_from}
                        style={{ height: "100%"}}
                        name='form'
                        ref ={formRef}
                    >
                        <Form.Item name='favoriteFruits' label='擅长方向'>
                            <Selector
                                columns={2}
                                multiple
                                options={[
                                { label: '新手', value: '新手' },
                                { label: '产品', value: '产品' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item >
                            <div className={styles.popu_but}>
                                <Button 
                                className={styles.popu_reatbut}
                                onClick={() => {
                                    console.log(formRef);
                                   formRef.current?.resetFields()
                                  }}
                                >
                                    重置
                                </Button>
                                <Button  className={styles.popu_yesbut} onClick={onSubmit}>
                                    确认
                                </Button>
                            </div>  
                        </Form.Item>
                    </Form>
                </Popup>
            </Space>
        </div>
    )
}
export default connect((hotlist:any)=>({hotlist}))(Popupty)  