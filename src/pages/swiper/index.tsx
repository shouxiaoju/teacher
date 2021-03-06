import {  Swiper, Toast } from 'antd-mobile'
import styles from './index.less'
export default function Swipers(){
    const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']
    const items = colors.map((color, index) => (
      <Swiper.Item key={index}>
        <div
          className={styles.content}
          style={{ background: color }}
          onClick={() => {
            Toast.show(`你点击了卡片 ${index + 1}`)
          }}
        >
          {index + 1}
        </div>
      </Swiper.Item>
    ))


    return(
        <div className='swiper'>
            <Swiper autoplay loop={true}>{items}</Swiper>
        </div>
        
    )
}