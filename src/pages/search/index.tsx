import React, { useEffect, useMemo } from 'react';
import styles from './index.module.scss';
import useRequest from '@/hooks/useRequest';
import { searchQuestion } from '@/api/question';
import QuestionItem from '@/page-components/question/question-item/QuestionItem';
import { emitter, EmitterType } from '@/utils/app-emitter';
import { Empty, Skeleton } from 'antd';
import Pagination from '@/components/pagination';
import { useRouter } from 'next/router';
import { getQueryParam } from '@/utils';

function SearchPage() {
  const [questionList, setQuestionList] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [keyword, setKeyword] = React.useState(''); // 搜索关键字
  const { run, loading } = useRequest();
  const router = useRouter();
  useEffect(() => {
    let keyword = getQueryParam('keyword');
    let page = getQueryParam('page');
    setKeyword(keyword || '');
    if (page) {
      setPage(+page || 1);
    }
    emitter.singleton(EmitterType.searchQuestion, (keyword) => {
      setKeyword(keyword || '');
    });
  }, []);

  const loadQuestionList = () => {
    run(searchQuestion({ currentPage: page, pageSize: 5, keyword: keyword })).then((res) => {
      if (res?.code != 200) {
        return;
      }
      setQuestionList(res?.data?.list || []);
      setTotal(+res?.data?.total || 0);
    });
  };

  useEffect(() => {
    loadQuestionList();
  }, [page, keyword]);

  const nextPage = () => {
    setPage(page + 1);
    router.push(`/search?keyword=${keyword}&page=${page + 1}`);
  };
  const prevPage = () => {
    setPage(page - 1);
    router.push(`/search?keyword=${keyword}&page=${page - 1}`);
  };

  const renderQuestionList = useMemo(() => {
    if (!questionList?.length) {
      return <Empty description='暂无数据' />;
    }
    return questionList?.map((item, index) => {
      return <QuestionItem question={item} key={index} isLast={index == questionList.length - 1} />;
    });
  }, [questionList]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.searchTitle}>搜索结果({total})</div>
        <div className={styles.questionList}>
          {loading ? <Skeleton active avatar paragraph={{ rows: 4 }} /> : renderQuestionList}
          <Pagination
            totalPage={total / 5}
            page={page}
            total={total}
            nextPageClick={nextPage}
            prevPageClick={prevPage}
          />
        </div>
      </div>
    </div>
  );
}
export default SearchPage;
