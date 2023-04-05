import React, { useEffect, useMemo } from 'react';
import styles from './index.module.scss';
import useRequest from '@/hooks/useRequest';
import { searchQuestion } from '@/api/question';
import QuestionItem from '@/page-components/question/question-item/QuestionItem';
import { usePathname } from 'next/navigation';

function SearchPage() {
  const [questionList, setQuestionList] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [keyword, setKeyword] = React.useState(''); // 搜索关键字
  const { run, loading } = useRequest();

  useEffect(() => {
    let keyword = getQueryParam('keyword');
    loadQuestionList(keyword);
  }, []);

  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  const loadQuestionList = (keyword) => {
    run(searchQuestion({ currentPage: page, pageSize: 8, keyword: keyword })).then((res) => {
      if (res?.code != 200) {
        return;
      }
      setQuestionList(res?.data?.list || []);
      setTotalPage(+res?.data?.totalPage || 0);
    });
  };

  const renderQuestionList = useMemo(() => {
    return questionList?.map((item, index) => {
      return <QuestionItem question={item} key={index} isLast={index == questionList.length - 1} />;
    });
  }, [questionList]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.searchTitle}>搜索结果</div>
        <div className={styles.questionList}>{renderQuestionList}</div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const { keyword, page } = context.query;
//   let appEnv = process.env.APP_ENV;
//   let baseUrl = appEnv === 'development' ? globalConfig.devBaseUrl : globalConfig.prodBaseUrl;
//   const res = await axios.post(`${baseUrl}/question/search`, {
//     keyword,
//     currentPage: page || 1,
//     pageSize: 5,
//   });
//   console.log('res', res.data);
//   const list = res?.data?.data?.list || [];
//
//   return {
//     props: {
//       list,
//       page: parseInt(page),
//     },
//   };
// }

export default SearchPage;
