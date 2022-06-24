import { AutoCenter } from 'antd-mobile'
import styles from './index.less'
import useCountDown from '@/hook/useCounttime'


const DATE="2022/06/27 00:00:00"
export default function Time(){

    const endDate=new Date(DATE).getTime()
    const {days, hours, minutes, seconds}=useCountDown(endDate)
    return(
        <div className={styles.time}>
            <AutoCenter className={styles.time_title}>
                讲师简介
            </AutoCenter>
            <AutoCenter className={styles.time_title1}>
                COMPANY PROFILE
            </AutoCenter>
            <AutoCenter className={styles.time_content}>
                测试文字测试文字测试文字测试文字测试文字为商家、企业、品牌等不同阶段的电商、新零售从业提供多元化的学习和赋能。十余年来，始终把握最新的商业风向，进行多维度的商业赋能，测试文
            </AutoCenter>
            <AutoCenter className={styles.time_content}>
                测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字
             </AutoCenter>
             <AutoCenter className={styles.time_time1}>
                距离课程开始还有 {days} 天：{hours} : {minutes} : {seconds}
             </AutoCenter>
        </div>
    )
}