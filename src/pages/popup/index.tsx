import { Popup, Space, Button } from 'antd-mobile'
import { useState } from 'react'
const Popupty=(props:any)=>{

    const {visible1,notsearctClick}=props


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
                    能容忍
                </Popup>
            </Space>
        </div>
    )
}
export default Popupty