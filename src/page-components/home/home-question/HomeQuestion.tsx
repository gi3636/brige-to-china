import React from 'react';
import styles from './index.module.scss';
import { Divider } from 'antd';
import Image from 'next/image';
import QuestionItem from '@/page-components/home/question-item/QuestionItem';
import useLanguage from '@/hooks/useLanguage';

function HomeQuestion(props) {
  const { t } = useLanguage();
  return (
    <div className={styles.questionContainer}>
      <div className={styles.header}>
        <Image priority src='/images/question.svg' width={48} height={36} alt='' style={{ paddingRight: 10 }} />
        {t.home.communityQuestion}
      </div>
      <div className={styles.tabContainer}>
        <div>{t.home.hotQuestion}</div>
        <div>{t.home.newQuestion}</div>
        <div>{t.home.waitAnswer}</div>
      </div>
      <Divider />
      <div className={styles.questionListContainer}>
        <QuestionItem />
      </div>
    </div>
  );
}

export default HomeQuestion;
