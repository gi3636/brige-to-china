import React from 'react';
import styles from './index.module.scss';
import { Divider } from 'antd';
import Image from 'next/image';
import { EllipsisIcon } from '@/components/icons/EllipsisIcon';
import { colors } from '@/styles/colors';
import CommentItem from '@/page-components/question/comment-item/CommentItem';
function CommentList({ data }) {
  console.log('data', data);

  const renderCommentList = () => {
    return data?.list.map((item) => <CommentItem key={item.id} item={item} />);
  };
  return (
    <div className={styles.commentList}>
      <div className={styles.count}>{data?.total} 条评论</div>
      <Divider />
      {renderCommentList()}
    </div>
  );
}

export default CommentList;
