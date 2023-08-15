import React from 'react';
import styles from './index.module.scss';
import Tag from '@/components/tag/tag';
import { EyeOutlineIcon } from '@/components/icons/EyeOutlineIcon';
import { colors } from '@/styles/colors';
import { CommentOutlineIcon } from '@/components/icons/CommentOutlineIcon';
import { LikeOutlineIcon } from '@/components/icons/LikeOutlineIcon';
import { Divider, Image } from 'antd';
import BestAnswerItem from '@/page-components/question/best-answer-item/BestAnswerItem';
import { convertFileUrl, formatToDateTime } from '@/utils';
import Link from 'next/link';

interface QuestionItemProps {
  question: any;
  isLast?: boolean;
}
function QuestionItem({ question, isLast }: QuestionItemProps) {
  return (
    <div className={styles.questionItem}>
      <div className={styles.questionHeader}>
        <div className={styles.questionAvatar}>
          <Image src={convertFileUrl(question?.avatar) || ''} preview={false} alt='' width={40} height={40} />
        </div>
        <Link
          className={styles.questionAuthor}
          href={{
            pathname: '/user/[userId]',
            query: {
              userId: question?.userId,
            },
          }}
          target='_blank'>
          {question?.nickname || '测试'}
        </Link>
        <div className={styles.questionDate}>{formatToDateTime(question.createdTime)}</div>
      </div>
      <Link
        className={styles.questionBody}
        href={{
          pathname: '/home/[questionId]',
          query: {
            questionId: question.id,
          },
        }}
        target='_blank'>
        <div className={styles.questionTitle}>{question?.title}</div>
        <div className={styles.questionContent}>{question?.content}</div>
      </Link>
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
      {isLast ? null : <Divider style={{ background: '#E5E5E5' }} />}
    </div>
  );
}

export default QuestionItem;
