import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import { Divider, message, Pagination, Spin } from 'antd';
import CommentItem from '@/page-components/question/comment-item/CommentItem';
import { getCommentList, sendComment } from '@/api/comment';
import useRequest from '@/hooks/useRequest';
import ReplyInput from '@/page-components/question/reply-input/ReplyInput';
import { emitter, EmitterType } from '@/utils/app-emitter';

function CommentList({ item, increaseCommentCount }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { run, data, loading } = useRequest();
  const { run: runReply, loading: replyLoading } = useRequest();
  const commentListData = data?.data;
  const [showReplyInput, setShowReplyInput] = useState(false);
  const replyLock = React.useRef(false);
  const [replyItem, setReplyItem] = useState<any>(null);

  useEffect(() => {
    loadCommentList();
  }, [currentPage]);

  useEffect(() => {
    emitter.singleton('showReplyInput', handleShowReplyInput);
    emitter.singleton(EmitterType.updateCommentList, loadCommentList);
  }, []);

  const loadCommentList = () => {
    run(getCommentList({ answerId: item.id, currentPage: currentPage, pageSize: 5 }));
  };

  const handleShowReplyInput = (values) => {
    setReplyItem(values);
    setShowReplyInput(true);
  };

  const handleReply = async (text, clearText) => {
    if (!text) {
      message.error('请输入评论内容');
      replyLock.current = false;
      return;
    }
    if (!replyLock.current) {
      replyLock.current = true;
      try {
        let res = await runReply(
          sendComment({
            answerId: item.id,
            content: text,
            toUserId: replyItem.userId,
          }),
        );
        if (res.code == 200) {
          clearText();
          increaseCommentCount();
          emitter.fire(EmitterType.updateCommentList);
          message.success('发送成功');
        }
      } finally {
        replyLock.current = false;
      }
    }
  };

  const renderCommentList = useMemo(() => {
    return commentListData?.list.map((item) => <CommentItem key={item.id} item={item} />);
  }, [commentListData?.list]);

  return (
    <Spin spinning={loading}>
      <div className={styles.commentList}>
        <>
          <div className={styles.count}>{commentListData?.total || 0} 条评论</div>
          <Divider />
          {renderCommentList}
          {showReplyInput && replyItem && (
            <div style={{ marginBottom: 20 }}>
              <ReplyInput nickname={replyItem?.nickname} onSend={handleReply} loading={replyLoading} />
            </div>
          )}
          {commentListData?.total > 5 && (
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

export default React.memo(CommentList);
