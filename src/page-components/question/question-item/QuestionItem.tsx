import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import MetalImage from '../../../../public/images/medal.png';
import Tag from '@/components/tag/tag';
import { EyeOutlineIcon } from '@/components/icons/EyeOutlineIcon';
import { colors } from '@/styles/colors';
import { CommentOutlineIcon } from '@/components/icons/CommentOutlineIcon';
import { LikeOutlineIcon } from '@/components/icons/LikeOutlineIcon';
import { Divider } from 'antd';
import BestAnswerItem from '@/page-components/question/best-answer-item/BestAnswerItem';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface QuestionItemProps {
  question: any;
}
function QuestionItem({ question }: QuestionItemProps) {
  const router = useRouter();
  const handleNavigateToQuestion = (href) => {
    console.log('handleNavigateToQuestion');
    router.push(href);
  };

  return (
    <div className={styles.questionItem}>
      <div className={styles.questionHeader}>
        <div className={styles.questionAvatar}>
          <Image src='http://img.headjia.com/2022/0528205227134881.jpg' alt='' width={40} height={40} />
        </div>
        <div className={styles.questionAuthor}>飞翔的Fei</div>
        <div className={styles.questionDate}>编辑于2022-12-18 13:46</div>
      </div>
      <div className={styles.questionTitle} onClick={handleNavigateToQuestion.bind(null, `/questions/${question?.id}`)}>
        {question?.title || '申请大学时需要准备什么材料？'}
      </div>
      <div className={styles.questionContent}>
        大家好，目前我正就读高三，如果想在本科去中国留学的话请问，我目前可以做怎么样的材料准备？？
      </div>
      <div className={styles.bestAnswerContainer}>
        <BestAnswerItem />
      </div>
      <div className={styles.questionFooter}>
        <div className={styles.tagList}>
          <Tag title='留学准备' />
          <Tag title='留学生活' />
        </div>
        <div className={styles.actionContainer}>
          <div>
            <EyeOutlineIcon height={16} width={16} color={colors.iconDefaultColor} />
            <span className={styles.count}>20</span>
          </div>
          <div>
            <CommentOutlineIcon height={14} width={14} color={colors.iconDefaultColor} />
            <span className={styles.count}>20</span>
          </div>
          <div>
            <LikeOutlineIcon height={14} width={14} color={colors.iconDefaultColor} />
            <span className={styles.count}>20</span>
          </div>
        </div>
      </div>
      <Divider style={{ background: '#E5E5E5' }} />
    </div>
  );
}

export default QuestionItem;
