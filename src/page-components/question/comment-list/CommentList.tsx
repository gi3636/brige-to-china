import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { Divider, Pagination, Spin } from 'antd';
import CommentItem from '@/page-components/question/comment-item/CommentItem';
import { getCommentList } from '@/api/comment';
import useRequest from '@/hooks/useRequest';

function CommentList({ item }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { run, data, loading } = useRequest();
  const commentListData = data?.data;
  const renderCommentList = () => {
    return commentListData?.list.map((item) => <CommentItem key={item.id} item={item} />);
  };

  useEffect(() => {
    loadCommentList();
  }, []);
  const loadCommentList = () => {
    run(getCommentList({ answerId: item.id, currentPage: currentPage, pageSize: 5 }));
  };

  useEffect(() => {
    loadCommentList();
  }, [currentPage]);

  return (
    <Spin spinning={loading}>
      <div className={styles.commentList}>
        <>
          <div className={styles.count}>{commentListData?.total || 0} 条评论</div>
          <Divider />
          {renderCommentList()}
          {commentListData?.total > 3 && (
            <div className={styles.paginationContainer}>
              <Pagination
                pageSize={5}
                total={commentListData?.total}
                current={currentPage}
                onChange={(page) => {
                  setCurrentPage(page);
                }}
              />
            </div>
          )}
        </>
      </div>
    </Spin>
  );
}

export default CommentList;
