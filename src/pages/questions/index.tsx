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
import { Spin } from 'antd';
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
  const { page, type } = router.query;
  const [currentIndex, setCurrentIndex] = React.useState(type || 1);
  const [questionList, setQuestionList] = React.useState(list || []);
  const { run, loading } = useRequest();

  const renderQuestionList = useMemo(() => {
    return questionList?.map((item, index) => {
      return <QuestionItem question={item} key={index} />;
    });
  }, [questionList]);

  useEffect(() => {
    loadQuestionList();
  }, [type, page]);
  const loadQuestionList = () => {
    const { page, type } = router.query;
    run(getQuestionList({ currentPage: +page! || 1, type: type || 1, pageSize: 10 })).then((res) => {
      setQuestionList(res?.data?.list || []);
    });
  };

  const handleTabChange = (index) => {
    setCurrentIndex(index);
    router.push(`/questions?page=1&type=${index}`);
  };

  const nextPage = () => {
    const { page, type } = router.query;
    router.push(`/questions?page=${(+page! || 1) + 1}&type=${type || 1}`);
  };
  const prevPage = () => {
    const { page, type } = router.query;
    router.push(`/questions?page=${(+page! || 2) - 1}&type=${type || 1}`);
  };
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
            <div className={styles.timeSort}>
              <SortIcon height={14} width={14} color='#8590A6' />
              <span style={{ marginLeft: 4 }}>切换为时间排序</span>
            </div>
          </div>
          <Spin spinning={loading}>
            <div className={styles.questionList}>{renderQuestionList}</div>
          </Spin>
          <div className={styles.pageContainer}>
            {page && +page > 1 ? (
              <div className={styles.pageItem} onClick={prevPage}>
                上一页
              </div>
            ) : (
              <div></div>
            )}

            <div className={styles.page}>1</div>
            <div className={styles.pageItem} onClick={nextPage}>
              下一页
            </div>
          </div>
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
    pageSize: 10,
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
