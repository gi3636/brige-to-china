import React, { useEffect } from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { EllipsisIcon } from '@/components/icons/EllipsisIcon';
import { colors } from '@/styles/colors';
import { CommentOutlineIcon } from '@/components/icons/CommentOutlineIcon';
import { LikeOutlineIcon } from '@/components/icons/LikeOutlineIcon';
import { Input } from 'antd';
import CommentList from '@/page-components/question/comment-list/CommentList';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { formatToDateTime } from '@/utils';
import useRequest from '@/hooks/useRequest';
import { getCommentList } from '@/api/comment';

function AnswerItem({ item, isAuthor }) {
  const user = useSelector((state: any) => state.user);
  const [showComment, setShowComment] = React.useState(false);
  const [commentListData, setCommentListData] = React.useState<any[]>([]);
  const [showCommentList, setShowCommentList] = React.useState(false);
  const { run, data, loading } = useRequest();
  const comment = React.useRef<any>('');

  useEffect(() => {
    if (showCommentList) {
      run(getCommentList({ answerId: item.id, currentPage: 1, pageSize: 10 }));
    }
  }, [showComment]);
  return (
    <div className={styles.answerItem}>
      <div className={styles.answerHeader}>
        <div className={styles.avatar}>
          <Image src={item?.avatar} alt='' width={40} height={40} />
        </div>
        <div className={styles.name}>{item.nickname}</div>

        {/*<div className={styles.use}>已采用{item?.useCount || ''}</div>*/}
        {item.isBestAnswer ? <div className={styles.bestTitle}>【最佳答案】</div> : null}

        <div className={styles.toolBtn}>
          {isAuthor ? (
            <EllipsisIcon width={23} height={23} color={colors.iconDefaultColor} />
          ) : item.useStatus ? (
            <Button size='middle' type='primary'>
              已采用{item?.useCount || ''}
            </Button>
          ) : (
            <Button size='middle' danger>
              采用{item?.useCount || ''}
            </Button>
          )}
        </div>
      </div>
      <div className={styles.answerBody}>
        <div className={styles.answerContent}>{item?.content}</div>
        <div className={styles.actionContainer}>
          <div
            onClick={() => {
              setShowCommentList(!showCommentList);
            }}>
            <CommentOutlineIcon height={14} width={14} color={colors.iconDefaultColor} />
            <span className={styles.count}>{item?.commentCount}</span>
          </div>
          {/*<div>*/}
          {/*  <LikeOutlineIcon height={14} width={14} color={colors.iconDefaultColor} />*/}
          {/*  <span className={styles.count}>{item?.useCount}</span>*/}
          {/*</div>*/}
          <div
            onClick={() => {
              setShowComment(!showComment);
            }}>
            回复
          </div>
          <div className={styles.date}>{formatToDateTime(item.updatedTime)}</div>
        </div>
        <div className={styles.commentContainer}>
          {showComment ? (
            <>
              <Image
                style={{ borderRadius: '50%', marginRight: 10 }}
                src={user?.avatar}
                alt=''
                width={40}
                height={40}
              />
              <Input
                onPressEnter={() => {
                  console.log('comment.current', comment.current);
                }}
                onChange={(e) => {
                  comment.current = e.target.value;
                }}
              />
            </>
          ) : null}
        </div>
        {showCommentList ? <CommentList data={data?.data} /> : null}
      </div>
    </div>
  );
}

export default AnswerItem;
