import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import MetalImage from '../../../../public/images/medal.png';

function BestAnswerItem(props) {
  return (
    <div className={styles.bestAnswerItem}>
      <Image className={styles.bg} src={MetalImage} width={40} height={40} alt={''} />
      <div className={styles.bestTag}>【最佳答案】【置顶】</div>
      <div className={styles.bestAnswerContainer}>
        <div className={styles.bestAnswerHeader}>
          <div className={styles.avatar}>
            <Image src='http://img.headjia.com/2022/0528205227134881.jpg' alt='' width={40} height={40} />
          </div>
          <div className={styles.author}>Miki学姐</div>
          <div className={styles.date}>2022-12-18 13:46</div>
        </div>
        <div className={styles.content}>
          你好，飞翔的fei. 我之前在学习区上传过一个清单。你可以在我的主页找到。这几天也会有留学部的info
          session，你也可以及时关注一下动态。我觉得目前你最需要做的是把学术成绩提上去，把汉语考试考出来。加油哦！{' '}
        </div>
      </div>
    </div>
  );
}

export default BestAnswerItem;
