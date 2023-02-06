import React from 'react';
import styles from './index.module.scss';
import { FireIcon } from '@/components/icons/FireIcon';
import { SortIcon } from '@/components/icons/SortIcon';
import Image from 'next/image';
import MetalImage from '@/../public/images/medal.png';
import Tag from '@/components/tag/tag';
import { Divider } from 'antd';
import { CommentOutlineIcon } from '@/components/icons/CommentOutlineIcon';
import { colors } from '@/styles/colors';
import { LikeOutlineIcon } from '@/components/icons/LikeOutlineIcon';
import { EyeOutlineIcon } from '@/components/icons/EyeOutlineIcon';
function QuestionsPage(props) {
  const [currentIndex, setCurrentIndex] = React.useState(1);

  let questionList = [
    {
      id: 1,
    },
    {
      id: 1,
    },
  ];

  const renderQuestionList = () => {
    return questionList.map((item, index) => {
      return (
        <div className={styles.questionItem} key={index}>
          <div className={styles.questionHeader}>
            <div className={styles.questionAvatar}>
              <Image src='http://img.headjia.com/2022/0528205227134881.jpg' alt='' width={40} height={40} />
            </div>
            <div className={styles.questionAuthor}>飞翔的Fei</div>
            <div className={styles.questionDate}>编辑于2022-12-18 13:46</div>
          </div>
          <div className={styles.questionTitle}>申请大学时需要准备什么材料？</div>
          <div className={styles.questionContent}>
            大家好，目前我正就读高三，如果想在本科去中国留学的话请问，我目前可以做怎么样的材料准备？？
          </div>
          <div className={styles.bestAnswerContainer}>
            <div className={styles.bestAnswerItem}>
              <Image className={styles.bg} src={MetalImage} width={40} height={40} alt={''} />
              <div className={styles.bestTag}>【最佳答案】【置顶】</div>
              <div className={styles.bestAnswerContainer}>
                <div className={styles.bestAnswerHeader}>
                  <div className={styles.avatar}>
                    <Image src='http://img.headjia.com/2022/0528205227134881.jpg' alt='' width={40} height={40} />
                  </div>
                  <div className={styles.author}>Miki学姐</div>
                  <div className={styles.date}>2022-12-18 13:46</div>
                </div>
                <div className={styles.content}>
                  你好，飞翔的fei. 我之前在学习区上传过一个清单。你可以在我的主页找到。这几天也会有留学部的info
                  session，你也可以及时关注一下动态。我觉得目前你最需要做的是把学术成绩提上去，把汉语考试考出来。加油哦！{' '}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.questionFooter}>
            <div className={styles.tagList}>
              <Tag title='留学准备' />
              <Tag title='留学生活' />
            </div>
            <div className={styles.actionContainer}>
              <div>
                <EyeOutlineIcon height={16} width={16} color={colors.iconDefaultColor} />
                <span className={styles.count}>20</span>
              </div>
              <div>
                <CommentOutlineIcon height={14} width={14} color={colors.iconDefaultColor} />
                <span className={styles.count}>20</span>
              </div>
              <div>
                <LikeOutlineIcon height={14} width={14} color={colors.iconDefaultColor} />
                <span className={styles.count}>20</span>
              </div>
            </div>
          </div>

          <Divider style={{ background: '#E5E5E5' }} />
        </div>
      );
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
        </div>
        <div className={styles.rightContainer}>right</div>
      </div>
    </div>
  );
}

export default QuestionsPage;
