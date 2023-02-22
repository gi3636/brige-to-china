import React from 'react';
import styles from './index.module.scss';
import { FireIcon } from '@/components/icons/FireIcon';
import { SortIcon } from '@/components/icons/SortIcon';
import QuestionItem from '@/page-components/question/question-item/QuestionItem';
import axios from 'axios';
import PostQuestion from '@/page-components/question/post-question/PostQuestion';

function QuestionsPage({ questionList }) {
  const [currentIndex, setCurrentIndex] = React.useState(1);

  const renderQuestionList = () => {
    return questionList?.map((item, index) => {
      return <QuestionItem question={item} key={index} />;
    });
  };
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
          <div className={styles.questionList}>{renderQuestionList()}</div>
          <div className={styles.loadMore}>加载更多</div>
        </div>
        <div className={styles.rightContainer}>
          <PostQuestion />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  // const res = await getQuestionList({
  //   pageSize: 40,
  //   currentPage: 1,
  //   type: 1,
  // })
  const res = await axios('http://localhost:9999/question/list/test', {
    method: 'GET',
    headers: {
      token:
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiY3JlYXRlZCI6MTY3NTYwNzY3NDkzOCwiaWQiOjIsImV4cCI6MTY3NjIxMjQ3NH0.zHfkvC6FNnLIrTDDu310z5oKNnPeeSaqMOJ_I2Crn5yId28UPZsc9bdVZm2s2O2H4EpkF9h16wFXxA37rnUP9g',
    },
  });

  // const res = await axios.post(
  //   'http://localhost:9999/question/list',
  //   {
  //     pageSize: 40,
  //     currentPage: 1,
  //     type: 1,
  //   },
  //   {
  //     headers: {
  //       token:
  //         'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiY3JlYXRlZCI6MTY3NTYwNzY3NDkzOCwiaWQiOjIsImV4cCI6MTY3NjIxMjQ3NH0.zHfkvC6FNnLIrTDDu310z5oKNnPeeSaqMOJ_I2Crn5yId28UPZsc9bdVZm2s2O2H4EpkF9h16wFXxA37rnUP9g',
  //     },
  //   },
  // );

  const questionList = res?.data?.data || [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      questionList,
    },
    revalidate: 5,
  };
}

export default QuestionsPage;
