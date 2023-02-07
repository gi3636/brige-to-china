import React from 'react';
import Image from 'next/image';
import Tag from '@/components/tag/tag';
import { CommentOutlineIcon } from '@/components/icons/CommentOutlineIcon';
import { colors } from '@/styles/colors';
import { LikeOutlineIcon } from '@/components/icons/LikeOutlineIcon';
import styles from './index.module.scss';
function QuestionItem(props) {
  return (
    <div className={styles.questionItem}>
      <div className={styles.questionHeader}>
        <div className={styles.avatar}>
          <Image src='http://img.headjia.com/2022/0528205227134881.jpg' alt='' width={40} height={40} />
        </div>
        <div className={styles.detail}>
          <div className={styles.name}>飞翔的Fei</div>
          <div className={styles.time}>2022-12-18 13:46</div>
        </div>
      </div>
      <div className={styles.questionContent}>
        <div className={styles.title}>申请大学时需要准备什么材料？</div>
        <div className={styles.content}>
          大家好，目前我正就读高三，如果想在本科去中国留学的话请问，我目前可以做怎么样的材料准备？万分感谢！
        </div>
      </div>
      <div className={styles.questionAction}>
        <div className={styles.tagList}>
          <Tag title='留学生活' />
          <Tag title='留学日常' />
        </div>
        <div className={styles.actionContainer}>
          <div>
            <CommentOutlineIcon height={15} width={15} color={colors.iconDefaultColor} />
            <span className={styles.count}>20</span>
          </div>
          <div>
            <LikeOutlineIcon height={15} width={15} color={colors.iconDefaultColor} />
            <span className={styles.count}>20</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionItem;
