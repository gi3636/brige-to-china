import React, { useEffect, useMemo } from 'react';
import styles from './index.module.scss';
import { FireIcon } from '@/components/icons/FireIcon';
import { SortIcon } from '@/components/icons/SortIcon';
import QuestionItem from '@/page-components/question/question-item/QuestionItem';
import axios from 'axios';
import PostQuestion from '@/page-components/question/post-question/PostQuestion';
import { globalConfig } from '@/globalConfig';
import { useRouter } from 'next/router';
import { getQuestionList } from '@/api/question';
import useRequest from '@/hooks/useRequest';
import { Skeleton, Spin } from 'antd';
import Pagination from '@/components/pagination';
const navList = [
  {
    id: 1,
    name: '热门回答',
  },
  {
    id: 2,
    name: '最新提问',
  },
  {
    id: 3,
    name: '等我回答',
  },
  {
    id: 4,
    name: '我的关注',
  },
];
function QuestionsPage({ list }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [questionList, setQuestionList] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const { run, loading } = useRequest();
  const [desc, setDesc] = React.useState(false);

  useEffect(() => {
    const { page, type } = router.query;
    console.log('123123', router.query);
    setCurrentIndex(+(type || 1));
    setPage(+(page || 1));
  }, []);

  useEffect(() => {
    loadQuestionList();
  }, [currentIndex, page]);

  useEffect(() => {
    handleSortByTime();
  }, [desc]);

  const loadQuestionList = () => {
    run(getQuestionList({ currentPage: page, type: currentIndex, pageSize: 8 })).then((res) => {
      if (res?.code != 200) {
        return;
      }
      console.log('res', res);
      setQuestionList(res?.data?.list || []);
      setTotal(+res?.data?.total || 0);
    });
  };

  const handleTabChange = (index) => {
    setCurrentIndex(index);
    router.push(`/questions?type=${index}&page=1`, undefined, { shallow: true });
  };

  const nextPage = () => {
    setPage(page + 1);
    router.push(`/questions?type=${currentIndex}&page=${page + 1}`, undefined, { shallow: true });
  };
  const prevPage = () => {
    setPage(page - 1);
    router.push(`/questions?type=${currentIndex}&page=${page - 1}`, undefined, { shallow: true });
  };

  const handleSortByTime = () => {
    let newList = questionList.sort((a: any, b: any) => {
      if (desc) {
        return a?.createdTime - b?.createdTime;
      } else {
        return b?.createdTime - a?.createdTime;
      }
    });
    setQuestionList([...newList]);
  };

  const renderQuestionList = useMemo(() => {
    return questionList?.map((item, index) => {
      return <QuestionItem question={item} key={index} isLast={index == questionList.length - 1} />;
    });
  }, [questionList]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.leftContainer}>
          <div className={styles.navBar}>
            {navList.map((item) => {
              return (
                <div
                  onClick={handleTabChange.bind(null, item.id)}
                  key={item.id}
                  className={currentIndex === item.id ? styles.navItem + ' ' + styles.active : styles.navItem}>
                  {currentIndex === item.id ? <FireIcon height={12} width={15} color='#F3972B' /> : null}
                  {item.name}
                </div>
              );
            })}
            <div className={styles.timeSort} onClick={setDesc.bind(null, !desc)}>
              <SortIcon height={14} width={14} color='#8590A6' />
              <span style={{ marginLeft: 4 }}>切换为时间排序</span>
            </div>
          </div>
          {/*<Spin spinning={loading}>*/}

          <div className={styles.questionList}>
            {loading ? (
              <>
                <Skeleton active avatar paragraph={{ rows: 4 }} />
                <Skeleton active avatar paragraph={{ rows: 4 }} />
                <Skeleton active avatar paragraph={{ rows: 4 }} />
              </>
            ) : (
              renderQuestionList
            )}
          </div>

          {/*</Spin>*/}
          <Pagination
            totalPage={total / 8}
            page={page}
            total={total}
            nextPageClick={nextPage}
            prevPageClick={prevPage}></Pagination>
        </div>
        <div className={styles.rightContainer}>
          <PostQuestion />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { page, type } = context.query;
  let appEnv = process.env.APP_ENV;
  let baseUrl = appEnv === 'development' ? globalConfig.devBaseUrl : globalConfig.prodBaseUrl;
  const res = await axios.post(`${baseUrl}/question/seoList`, {
    currentPage: page || 1,
    type: type || 1,
    date: 0,
    pageSize: 5,
  });
  console.log('res', res.data);
  const list = res?.data?.data?.list || [];

  return {
    props: {
      list,
      page: parseInt(page),
    },
  };
}

export default QuestionsPage;
