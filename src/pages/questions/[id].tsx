import React from 'react';
import axios from 'axios';

function QuestionDetailPage({ question }) {
  return (
    <div>
      <div>{question?.title}</div>
      <div>{question}</div>
    </div>
  );
}

export async function getStaticProps(context) {
  console.log('context', context);
  const { params } = context;
  const questionId = params?.id;

  const res = await axios(`http://localhost:9999/question/detail/${questionId}`, {
    method: 'GET',
    headers: {
      token:
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiY3JlYXRlZCI6MTY3NTYwNzY3NDkzOCwiaWQiOjIsImV4cCI6MTY3NjIxMjQ3NH0.zHfkvC6FNnLIrTDDu310z5oKNnPeeSaqMOJ_I2Crn5yId28UPZsc9bdVZm2s2O2H4EpkF9h16wFXxA37rnUP9g',
    },
  });
  console.log('res', res);

  return {
    props: {
      question: res?.data?.data || {},
    },
  };
}

export async function getStaticPaths() {
  // const res = await axios('http://localhost:9999/question/list/test', {
  //   method: 'GET',
  //   headers: {
  //     token:
  //       'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiY3JlYXRlZCI6MTY3NTYwNzY3NDkzOCwiaWQiOjIsImV4cCI6MTY3NjIxMjQ3NH0.zHfkvC6FNnLIrTDDu310z5oKNnPeeSaqMOJ_I2Crn5yId28UPZsc9bdVZm2s2O2H4EpkF9h16wFXxA37rnUP9g',
  //   },
  // });
  // console.log('res', res);
  // const questionList = res?.data?.data || [];
  // let paths = questionList.map((question) => {
  //   return {
  //     params: {
  //       id: question.id,
  //     },
  //   };
  // });
  // console.log('paths', paths);

  return {
    paths: [
      {
        params: {
          id: '1623281477203218434',
        },
      },
    ],
    fallback: false,
  };
}
export default QuestionDetailPage;
