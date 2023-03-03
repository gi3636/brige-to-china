import React, { useCallback } from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { EllipsisIcon } from '@/components/icons/EllipsisIcon';
import { colors } from '@/styles/colors';
import { CommentOutlineIcon } from '@/components/icons/CommentOutlineIcon';
import { Button, Dropdown, MenuProps, message } from 'antd';
import CommentList from '@/page-components/question/comment-list/CommentList';
import { formatToDateTime, isLogin } from '@/utils';
import useRequest from '@/hooks/useRequest';
import { sendComment } from '@/api/comment';
import { delAnswer, useAnswer } from '@/api/answer';
import ReplyInput from '@/page-components/question/reply-input/ReplyInput';
import { setBestAnswer } from '@/api/question';
import { emitter, EmitterType } from '@/utils/app-emitter';

function AnswerItem({ item, isAuthor }) {
  const [answerData, setAnswerData] = React.useState<any>(item);
  const [showComment, setShowComment] = React.useState(false);
  const [showCommentList, setShowCommentList] = React.useState(false);
  const { run, loading } = useRequest();
  const { run: runReply, loading: replyLoading } = useRequest();
  const commentLock = React.useRef(false);
  const handleSendComment = async (text, clearText) => {
    if (!text) {
      message.error('请输入评论内容');
      commentLock.current = false;
      return;
    }
    if (!commentLock.current) {
      commentLock.current = true;
      try {
        let res = await runReply(
          sendComment({
            answerId: answerData.id,
            content: text,
          }),
        );
        if (res.code == 200) {
          emitter.fire(EmitterType.updateCommentList);
          clearText();
          increaseCommentCount();
          message.success('发送成功');
        }
      } finally {
        commentLock.current = false;
      }
    }
  };

  const increaseCommentCount = useCallback(() => {
    setAnswerData({ ...answerData, commentCount: answerData.commentCount + 1 });
  }, [answerData]);

  const handleClickUse = async (status) => {
    let res = await run(
      useAnswer({
        id: item.id,
        status,
      }),
    );
    if (res.code == 200) {
      setAnswerData({
        ...answerData,
        useStatus: status,
        useCount: status ? answerData.useCount + 1 : answerData.useCount - 1,
      });

      message.success(status ? '采用成功' : '取消采用成功');
    }
  };
  const handleSetBestAnswer = async () => {
    let res = await setBestAnswer({
      questionId: item.questionId,
      answerId: item.id,
    });
    if (res.code == 200) {
      message.success('设置成功');
    }
  };

  const handleDelete = async () => {
    let res = await delAnswer({ id: item.id });
    if (res.code == 200) {
      emitter.fire(EmitterType.updateAnswerList);
      message.success('删除成功');
    }
  };

  const items: MenuProps['items'] = [
    {
      label: answerData.useStatus ? '取消采用' : '采用',
      key: '2',
      onClick: handleClickUse.bind(null, answerData.useStatus ? 0 : 1),
    },
    {
      label: '设置为最佳回答',
      key: '0',
      onClick: handleSetBestAnswer,
    },
    {
      label: '删除',
      key: '1',
      onClick: handleDelete,
    },
  ];

  return (
    <div className={styles.answerItem}>
      <div className={styles.answerHeader}>
        <div className={styles.avatar}>
          <Image src={item?.avatar} alt='' width={40} height={40} />
        </div>
        <div className={styles.name}>{item.nickname}</div>

        {isAuthor && answerData.useCount > 0 ? (
          <div className={styles.use}>已采用{answerData?.useCount || ''}</div>
        ) : null}

        {item.isBestAnswer ? <div className={styles.bestTitle}>【最佳答案】</div> : null}

        <div className={styles.toolBtn}>
          {isAuthor ? (
            <Dropdown menu={{ items }} trigger={['click']} placement={'bottom'} arrow>
              <div>
                <EllipsisIcon width={23} height={23} color={colors.iconDefaultColor} />
              </div>
            </Dropdown>
          ) : answerData.useStatus ? (
            <Button size='middle' type='primary' onClick={handleClickUse.bind(null, 0)} loading={loading}>
              已采用{answerData?.useCount || ''}
            </Button>
          ) : (
            <Button size='middle' danger onClick={handleClickUse.bind(null, 1)} loading={loading}>
              采用{answerData?.useCount || ''}
            </Button>
          )}
        </div>
      </div>
      <div className={styles.answerBody}>
        <div className={styles.answerContent}>{answerData?.content}</div>
        <div className={styles.actionContainer}>
          <div
            onClick={() => {
              setShowCommentList(!showCommentList);
            }}>
            <CommentOutlineIcon height={14} width={14} color={colors.iconDefaultColor} />
            <span className={styles.count}>{answerData?.commentCount}</span>
          </div>
          <div
            onClick={() => {
              if (!isLogin()) {
                message.error('请先登录');
                return;
              }
              setShowComment(!showComment);
            }}>
            回复
          </div>
          <div className={styles.date}>{formatToDateTime(answerData.createdTime)}</div>
        </div>
        <div className={styles.commentContainer}>
          {showComment ? <ReplyInput onSend={handleSendComment} loading={replyLoading} /> : null}
        </div>
        {showCommentList ? (
          <CommentList item={item} increaseCommentCount={increaseCommentCount} isAuthor={isAuthor} />
        ) : null}
      </div>
    </div>
  );
}

export default AnswerItem;
