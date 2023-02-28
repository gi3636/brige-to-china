import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Divider, Input } from 'antd';
import Image from 'next/image';
import { EllipsisIcon } from '@/components/icons/EllipsisIcon';
import { colors } from '@/styles/colors';
import { CommentOutlineIcon } from '@/components/icons/CommentOutlineIcon';
import { LikeOutlineIcon } from '@/components/icons/LikeOutlineIcon';
import CommentList from '@/page-components/question/comment-list/CommentList';
import useRequest from '@/hooks/useRequest';
import { getAnswerList } from '@/api/answer';
import AnswerItem from '@/page-components/question/answer-item/AnswerItem';
import { emitter, EmitterType } from '@/utils/app-emitter';
import { Emitter } from '@/utils/emitter';

interface Props {
  questionId: string;
  isAuthor: boolean;
}

function AnswerList({ questionId, isAuthor }: Props) {
  const { run, data, loading } = useRequest();
  const answerData = data?.data;

  const loadAnswerList = () => {
    run(
      getAnswerList({
        questionId,
        currentPage: 1,
        pageSize: 10,
      }),
    );
  };

  useEffect(() => {
    loadAnswerList();
    emitter.singleton(EmitterType.updateAnswerList, loadAnswerList);
  }, []);

  console.log('answerData', answerData);

  const renderAnswerList = () => {
    return answerData?.list.map((item) => <AnswerItem key={item.id} item={item} isAuthor={isAuthor} />);
  };

  return (
    <div className={styles.answerContainer}>
      <div>全部回答 {answerData?.total}</div>
      <Divider />
      <div className={styles.answerList}>{renderAnswerList()}</div>
    </div>
  );
}

export default AnswerList;
