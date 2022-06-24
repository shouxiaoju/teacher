import { useEffect } from 'react';
import styles from './index.less';
import Swipers from './swiper';
import Time from './time';
import Nav from './nav';
import List from './list';
import Search from '@/pages/search';
 function IndexPage(props:any) {
  return (
    <div>
      {/* 轮播图 */}

        <Swipers/>

      {/* 倒计时 */}

        <Time/>

      {/* 导航 */}

        <Nav/>

      {/* 搜索 */}
        
        <Search/>

      {/* 列表 */}
      
      <List/>

    </div>
  );
}
export default IndexPage