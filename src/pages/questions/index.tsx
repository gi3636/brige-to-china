import React, { useMemo } from 'react';
import styles from './index.module.scss';
import { FireIcon } from '@/components/icons/FireIcon';
import { SortIcon } from '@/components/icons/SortIcon';
import QuestionItem from '@/page-components/question/question-item/QuestionItem';
import axios from 'axios';
import PostQuestion from '@/page-components/question/post-question/PostQuestion';
import { globalConfig } from '@/globalConfig';

function QuestionsPage({ questionList }) {
  const [currentIndex, setCurrentIndex] = React.useState(1);
  console.log('questionList', questionList);
  const renderQuestionList = useMemo(() => {
    return questionList?.map((item, index) => {
      return <QuestionItem question={item} key={index} />;
    });
  }, [questionList]);
  let navList = [
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

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.leftContainer}>
          <div className={styles.navBar}>
            {navList.map((item) => {
              return (
                <div
                  onClick={setCurrentIndex.bind(null, item.id)}
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
          <div className={styles.questionList}>{renderQuestionList}</div>
          <div className={styles.loadMore}>加载更多</div>
        </div>
        <div className={styles.rightContainer}>
          <PostQuestion />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { page } = context.query;
  console.log('page', page);
  console.log('process.env.APP_ENV', process.env.APP_ENV);
  let appEnv = process.env.APP_ENV;
  let baseUrl = appEnv === 'development' ? globalConfig.devBaseUrl : globalConfig.prodBaseUrl;
  const res = await axios.post(`${baseUrl}/question/list`, {
    currentPage: page || 1,
    type: 1,
    date: 0,
    pageSize: 10,
  });
  console.log('res', res.data);
  const questionList = res?.data?.data?.list || [];

  return {
    props: {
      questionList,
      page: parseInt(page),
    },
  };
}

export default QuestionsPage;
