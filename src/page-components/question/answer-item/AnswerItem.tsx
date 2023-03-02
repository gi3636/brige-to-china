import React, { useEffect } from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { EllipsisIcon } from '@/components/icons/EllipsisIcon';
import { colors } from '@/styles/colors';
import { CommentOutlineIcon } from '@/components/icons/CommentOutlineIcon';
import { Button, Dropdown, MenuProps, message, Spin } from 'antd';
import CommentList from '@/page-components/question/comment-list/CommentList';
import { useSelector } from 'react-redux';
import { formatToDateTime, isLogin } from '@/utils';
import useRequest from '@/hooks/useRequest';
import { getCommentList } from '@/api/comment';
import { delAnswer, useAnswer } from '@/api/answer';
import CommentInput from '@/page-components/question/comment-input/CommentInput';
import { setBestAnswer } from '@/api/question';
import { emitter, EmitterType } from '@/utils/app-emitter';

function AnswerItem({ item, isAuthor }) {
  const [answerData, setAnswerData] = React.useState<any>(item);
  const [showComment, setShowComment] = React.useState(false);
  const [showCommentList, setShowCommentList] = React.useState(false);
  const { run, data, loading } = useRequest();

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

        {/*<div className={styles.use}>已采用{item?.useCount || ''}</div>*/}
        {item.isBestAnswer ? <div className={styles.bestTitle}>【最佳答案】</div> : null}

        <div className={styles.toolBtn}>
          {isAuthor ? (
            <Dropdown menu={{ items }} trigger={['click']}>
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
          {/*<div>*/}
          {/*  <LikeOutlineIcon height={14} width={14} color={colors.iconDefaultColor} />*/}
          {/*  <span className={styles.count}>{item?.useCount}</span>*/}
          {/*</div>*/}
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
          {showComment ? <CommentInput answerData={answerData} setAnswerData={setAnswerData} /> : null}
        </div>
        {showCommentList ? <CommentList item={item} /> : null}
      </div>
    </div>
  );
}

export default AnswerItem;
