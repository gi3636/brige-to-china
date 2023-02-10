import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { FireIcon } from '@/components/icons/FireIcon';
import { SortIcon } from '@/components/icons/SortIcon';
import { Button, Image, Input, Radio, Select, SelectProps } from 'antd';
import { colors } from '@/styles/colors';
import QuestionItem from '@/page-components/question/question-item/QuestionItem';
import { ImageOutlineIcon } from '@/components/icons/ImageOutlineIcon';
import ImageItem from '@/page-components/question/image-item/ImageItem';
import { HandIcon } from '@/components/icons/HandIcon';
import { getQuestionList } from '@/api/question';
import axios from 'axios';

function QuestionsPage({ questionList }) {
  const [currentIndex, setCurrentIndex] = React.useState(1);
  const [value, setValue] = useState(false);
  // const [questionList, setQuestionList] = useState([]);
  const [images, setImages] = useState([
    {
      id: 1,
      src: 'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg',
    },
    {
      id: 2,
      src: 'https://img95.699pic.com/photo/50136/1351.jpg_wh300.jpg',
    },
    {
      id: 3,
      src: 'https://img95.699pic.com/photo/50046/5562.jpg_wh300.jpg',
    },
    {
      id: 3,
      src: 'http://static.runoob.com/images/demo/demo3.jpg',
    },
  ]);
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await getQuestionList({});
  //     console.log('result', result);
  //     setQuestionList(result?.data);
  //   };
  //   fetchData();
  // }, []);

  const handleCheck = () => {
    setValue(!value);
  };

  const handleCloseImage = (index) => {
    images.splice(index, 1);
    setImages([...images]);
  };
  const renderImagesList = () => {
    return images.map((item, index) => {
      return (
        <ImageItem onClose={handleCloseImage.bind(null, index)} key={index} src={item.src} height={65} width={90} />
      );
    });
  };
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

  const options: SelectProps['options'] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

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
          <div className={styles.postQuestion}>
            <div className={styles.postQuestionHeader}>
              <div className={styles.title}>
                <HandIcon width={20} height={20} />
                <span style={{ marginLeft: 3 }}>我要提问</span>
              </div>
              <div className={styles.anonymous}>
                <Radio onClick={handleCheck} checked={value}>
                  匿名
                </Radio>
              </div>
            </div>
            <div className={styles.postQuestionBody}>
              <Input className={styles.titleInput} placeholder='请输入标题' />
              <Input.TextArea className={styles.contentInput} rows={8} placeholder='请输入问题' />
              <div style={{ marginTop: 10 }}>
                <Select
                  placeholder={'添加标签'}
                  mode='tags'
                  style={{ width: '100%' }}
                  onChange={handleChange}
                  tokenSeparators={[',']}
                  options={options}
                />
              </div>
              {images.length > 0 ? (
                <div className={styles.imageList}>
                  <Image.PreviewGroup>{renderImagesList()}</Image.PreviewGroup>
                </div>
              ) : null}
              <div className={styles.actionContainer}>
                <div className={styles.uploadBtn}>
                  <ImageOutlineIcon width={22} height={22} color={colors.iconDefaultColor} />
                </div>
              </div>
            </div>
            <Button type='primary' className={styles.postBtn}>
              发布问题
            </Button>
          </div>
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
