import React from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';

function QuestionDetailPage({ question }) {
  console.log('question', question);
  return (
    <div>
      <div>{question?.title}</div>
      <div>{JSON.stringify(question)}</div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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
};
export default QuestionDetailPage;
