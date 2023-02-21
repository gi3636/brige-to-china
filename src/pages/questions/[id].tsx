import React from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import BestAnswerItem from '@/page-components/question/best-answer-item/BestAnswerItem';
import Tag from '@/components/tag/tag';
import { EyeOutlineIcon } from '@/components/icons/EyeOutlineIcon';
import { colors } from '@/styles/colors';
import { CommentOutlineIcon } from '@/components/icons/CommentOutlineIcon';
import { LikeOutlineIcon } from '@/components/icons/LikeOutlineIcon';
import { Button, Divider, Input } from 'antd';
import styles from './id.module.scss';
import { EllipsisOutlined, HeartOutlined } from '@ant-design/icons';
import { EllipsisIcon } from '@/components/icons/EllipsisIcon';
function QuestionDetailPage({ question }) {
  console.log('question', question);
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.questionItem}>
          <div className={styles.questionHeader}>
            <div className={styles.questionAvatar}>
              <Image src='http://img.headjia.com/2022/0528205227134881.jpg' alt='' width={40} height={40} />
            </div>
            <div className={styles.questionAuthor}>飞翔的Fei</div>
            <div className={styles.questionDate}>编辑于2022-12-18 13:46</div>
          </div>
          <div className={styles.questionTitle}>{question?.title || '申请大学时需要准备什么材料？'}</div>
          <div className={styles.questionContent}>
            大家好，目前我正就读高三，如果想在本科去中国留学的话请问，我目前可以做怎么样的材料准备？？
          </div>
          <div className={styles.tagList}>
            <Tag title='留学准备' />
            <Tag title='留学生活' />
          </div>
          <div className={styles.actionContainer}>
            <div>
              <LikeOutlineIcon height={14} width={14} color={colors.iconDefaultColor} />
              <span className={styles.count}>20</span>
            </div>
            <div>
              <HeartOutlined height={16} width={16} color={colors.iconDefaultColor} />
              <span className={styles.count}>20</span>
            </div>
            <Button type='primary' className={styles.answerBtn}>
              写回答
            </Button>
          </div>
        </div>

        <div className={styles.answerContainer}>
          <div>全部回答 45</div>
          <Divider />

          <div className={styles.answerList}>
            <div className={styles.answerItem}>
              <div className={styles.answerHeader}>
                <div className={styles.avatar}>
                  <Image src='http://img.headjia.com/2022/0528205227134881.jpg' alt='' width={40} height={40} />
                </div>
                <div className={styles.name}>名字</div>
                <div className={styles.use}>已采用24</div>
                <div className={styles.bestTitle}>【最佳答案】</div>
                <div className={styles.toolBtn}>
                  <EllipsisIcon width={23} height={23} color={colors.iconDefaultColor} />
                </div>
              </div>
              <div className={styles.answerBody}>
                <div className={styles.answerContent}>
                  你好，飞翔的fei. 我之前在学习区上传过一个清单。你可以在我的主页找到。这几天也会有留学部的info
                  session，你也可以及时关注一下动态。我觉得目前你最需要做的是把学术成绩提上去，把汉语考试考出来。加油哦！
                </div>
                <div className={styles.actionContainer}>
                  <div>
                    <CommentOutlineIcon height={14} width={14} color={colors.iconDefaultColor} />
                    <span className={styles.count}>20</span>
                  </div>
                  <div>
                    <LikeOutlineIcon height={14} width={14} color={colors.iconDefaultColor} />
                    <span className={styles.count}>20</span>
                  </div>
                  <div>回复</div>
                  <div className={styles.date}>2022-12-18 13:46</div>
                </div>
                <div className={styles.commentContainer}>
                  <Image
                    style={{ borderRadius: '50%', marginRight: 10 }}
                    src='http://img.headjia.com/2022/0528205227134881.jpg'
                    alt=''
                    width={40}
                    height={40}
                  />
                  <Input />
                </div>

                <div className={styles.commentList}>
                  <div className={styles.count}>38 条评论</div>
                  <Divider />
                  <div className={styles.commentItem}>
                    <div className={styles.commentHeader}>
                      <Image
                        style={{ borderRadius: '50%' }}
                        src='http://img.headjia.com/2022/0528205227134881.jpg'
                        alt=''
                        width={40}
                        height={40}
                      />
                      <div className={styles.name}>名字</div>
                      <div className={styles.toolBtn}>
                        <EllipsisIcon width={23} height={23} color={colors.iconDefaultColor} />
                      </div>
                    </div>
                    <div className={styles.commentBody}>
                      <div className={styles.commentContent}>请问可以分享一下留学经验吗？</div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={styles.time}>2022-12-18 13:46</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.commentItem}>
                    <div className={styles.commentHeader}>
                      <Image
                        style={{ borderRadius: '50%' }}
                        src='http://img.headjia.com/2022/0528205227134881.jpg'
                        alt=''
                        width={40}
                        height={40}
                      />
                      <div className={styles.name}>名字</div>
                      <div className={styles.toolBtn}>
                        <EllipsisIcon width={23} height={23} color={colors.iconDefaultColor} />
                      </div>
                    </div>
                    <div className={styles.commentBody}>
                      <div className={styles.commentContent}>请问可以分享一下留学经验吗？</div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={styles.time}>2022-12-18 13:46</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.commentItem}>
                    <div className={styles.commentHeader}>
                      <Image
                        style={{ borderRadius: '50%' }}
                        src='http://img.headjia.com/2022/0528205227134881.jpg'
                        alt=''
                        width={40}
                        height={40}
                      />
                      <div className={styles.name}>名字</div>
                      <div className={styles.toolBtn}>
                        <EllipsisIcon width={23} height={23} color={colors.iconDefaultColor} />
                      </div>
                    </div>
                    <div className={styles.commentBody}>
                      <div className={styles.commentContent}>请问可以分享一下留学经验吗？</div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={styles.time}>2022-12-18 13:46</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.answerItem}>
              <div className={styles.answerHeader}>
                <div className={styles.avatar}>
                  <Image src='http://img.headjia.com/2022/0528205227134881.jpg' alt='' width={40} height={40} />
                </div>
                <div className={styles.name}>名字</div>
                <div className={styles.use}>已采用24</div>
                <div className={styles.bestTitle}>【最佳答案】</div>
                <div className={styles.toolBtn}>
                  <EllipsisIcon width={23} height={23} color={colors.iconDefaultColor} />
                </div>
              </div>
              <div className={styles.answerBody}>
                <div className={styles.answerContent}>
                  你好，飞翔的fei. 我之前在学习区上传过一个清单。你可以在我的主页找到。这几天也会有留学部的info
                  session，你也可以及时关注一下动态。我觉得目前你最需要做的是把学术成绩提上去，把汉语考试考出来。加油哦！
                </div>
                <div className={styles.actionContainer}>
                  <div>
                    <CommentOutlineIcon height={14} width={14} color={colors.iconDefaultColor} />
                    <span className={styles.count}>20</span>
                  </div>
                  <div>
                    <LikeOutlineIcon height={14} width={14} color={colors.iconDefaultColor} />
                    <span className={styles.count}>20</span>
                  </div>
                  <div>回复</div>
                  <div className={styles.date}>2022-12-18 13:46</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('context', context);
  const { params } = context;
  const questionId = params?.id;

  const res = await axios(`http://localhost:9999/question/detail/${questionId}`, {
    method: 'GET',
  });
  console.log('res', res);

  return {
    props: {
      question: res?.data?.data || {},
    },
  };
};
export default QuestionDetailPage;
