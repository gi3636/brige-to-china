import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { EllipsisIcon } from '@/components/icons/EllipsisIcon';
import { colors } from '@/styles/colors';
import { formatToDateTime, isLogin } from '@/utils';
import { LikeFilled, LikeOutlined } from '@ant-design/icons';
import { emitter } from '@/utils/app-emitter';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { run } from 'next/dist/server/web/sandbox';
import { likeComment } from '@/api/comment';

function CommentItem({ item, isAuthor }) {
  const user = useSelector((state: any) => state.user);
  const [commentData, setCommentData] = React.useState<any>(item);
  const handleShowReply = () => {
    if (user?.id === item?.userId) {
      message.error('不能回复自己的评论');
      return;
    }
    if (!isLogin()) {
      message.error('请先登录');
      return;
    }
    emitter.fire('showReplyInput', item);
  };

  const handleLike = async (status) => {
    if (!isLogin()) {
      message.error('请先登录');
      return;
    }
    setCommentData({
      ...commentData,
      likeStatus: status ? 1 : 0,
      likeCount: status ? commentData.likeCount + 1 : commentData.likeCount - 1,
    });
    let res = await likeComment({
      id: item.id,
      status: status ? 1 : 0,
      answerId: item.answerId,
    });
    console.log(res);
    if (res.code != 200) {
      setCommentData(item);
    }
  };

  return (
    <div className={styles.commentItem}>
      <div className={styles.commentHeader}>
        <Image
          style={{ borderRadius: '50%' }}
          src={item?.avatar || '/images/default-avatar.png'}
          alt=''
          width={40}
          height={40}
        />
        <div className={styles.name}>{item?.nickname}</div>
        {isAuthor && (
          <div className={styles.toolBtn}>
            <EllipsisIcon width={23} height={23} color={colors.iconDefaultColor} />
          </div>
        )}
      </div>
      <div className={styles.commentBody}>
        {item.toUserId ? (
          <div className={styles.commentContent}>
            <span className={styles.reply}>回复</span>
            <span className={styles.nickname}>{item?.toNickname}</span>
            <span>{item?.content}</span>
          </div>
        ) : (
          <div className={styles.commentContent}>{item?.content}</div>
        )}
        <div className={styles.actionContainer}>
          <div className={styles.actionItem}>
            {commentData?.likeStatus === 1 ? (
              <LikeFilled
                height={14}
                width={14}
                style={{ color: colors.primaryColor }}
                onClick={handleLike.bind(null, 0)}
              />
            ) : (
              <LikeOutlined height={14} width={14} color={colors.iconDefaultColor} onClick={handleLike.bind(null, 1)} />
            )}

            <span
              className={styles.count}
              style={{ color: commentData.likeStatus ? colors.primaryColor : colors.iconDefaultColor }}>
              {commentData?.likeCount}
            </span>
          </div>
          <div className={styles.reply} onClick={handleShowReply}>
            回复
          </div>
          <div className={styles.time}>{formatToDateTime(item?.updatedTime)}</div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
