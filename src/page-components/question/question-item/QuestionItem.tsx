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
import { formatToDateTime } from '@/utils';

interface QuestionItemProps {
  question: any;
}
function QuestionItem({ question }: QuestionItemProps) {
  const router = useRouter();
  const navigateQuestion = (id) => {
    window.open(`/questions/${id}`, '_blank');
  };

  return (
    <div className={styles.questionItem}>
      <div className={styles.questionHeader}>
        <div className={styles.questionAvatar}>
          <Image src={question?.avatar || ''} alt='' width={40} height={40} />
        </div>
        <div className={styles.questionAuthor}>{question?.nickname || '测试'}</div>
        <div className={styles.questionDate}>{formatToDateTime(question.createdTime)}</div>
      </div>
      <div className={styles.questionTitle} onClick={navigateQuestion.bind(null, question?.id)}>
        {question?.title}
      </div>
      <div className={styles.questionContent} onClick={navigateQuestion.bind(null, question?.id)}>
        {question?.content}
      </div>
      {question?.bestAnswer ? (
        <div className={styles.bestAnswerContainer}>
          <BestAnswerItem item={question?.bestAnswer} />
        </div>
      ) : null}
      <div className={styles.questionFooter}>
        <div className={styles.tagList}>
          {question?.tags?.map((item, index) => {
            return <Tag title={item} key={index} />;
          })}
        </div>
        <div className={styles.actionContainer}>
          <div>
            <EyeOutlineIcon height={16} width={16} color={colors.iconDefaultColor} />
            <span className={styles.count}>{question?.viewCount || 0}</span>
          </div>
          <div>
            <CommentOutlineIcon height={14} width={14} color={colors.iconDefaultColor} />
            <span className={styles.count}>{question?.favoriteCount || 0}</span>
          </div>
          <div>
            <LikeOutlineIcon height={14} width={14} color={colors.iconDefaultColor} />
            <span className={styles.count}>{question?.likeCount || 0}</span>
          </div>
        </div>
      </div>
      <Divider style={{ background: '#E5E5E5' }} />
    </div>
  );
}

export default QuestionItem;
