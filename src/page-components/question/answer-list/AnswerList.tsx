import React, { useEffect, useMemo } from 'react';
import styles from './index.module.scss';
import { Divider, Pagination, Spin } from 'antd';
import useRequest from '@/hooks/useRequest';
import { getAnswerList } from '@/api/answer';
import AnswerItem from '@/page-components/question/answer-item/AnswerItem';
import { emitter, EmitterType } from '@/utils/app-emitter';

interface Props {
  questionId: string;
  isAuthor: boolean;
}

function AnswerList({ questionId, isAuthor }: Props) {
  const { run, data, loading } = useRequest();
  const answerData = data?.data;
  const [currentPage, setCurrentPage] = React.useState(1);

  useEffect(() => {
    emitter.singleton(EmitterType.updateAnswerList, loadAnswerList);
  }, []);

  useEffect(() => {
    loadAnswerList();
  }, [currentPage]);

  const loadAnswerList = () => {
    run(
      getAnswerList({
        questionId,
        currentPage: currentPage,
        pageSize: 10,
      }),
    );
  };

  const renderAnswerList = useMemo(() => {
    return answerData?.list.map((item) => <AnswerItem key={item.id} item={item} isAuthor={isAuthor} />);
  }, [answerData?.list, isAuthor]);

  return (
    <Spin spinning={loading}>
      <div className={styles.answerContainer}>
        <div>全部回答 {answerData?.total || 0}</div>
        <Divider />
        <div className={styles.answerList}>{renderAnswerList}</div>
        {answerData?.total > 10 && (
          <div className={styles.paginationContainer}>
            <Pagination
              current={currentPage}
              total={answerData?.total}
              onChange={(page) => {
                setCurrentPage(page);
              }}
            />
          </div>
        )}
      </div>
    </Spin>
  );
}

export default AnswerList;
