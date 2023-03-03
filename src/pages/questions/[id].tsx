import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Tag from '@/components/tag/tag';
import { colors } from '@/styles/colors';
import { LikeOutlineIcon } from '@/components/icons/LikeOutlineIcon';
import { Button, Input, message, Modal } from 'antd';
import styles from './id.module.scss';
import { EditOutlined, HeartOutlined, LikeFilled } from '@ant-design/icons';
import { globalConfig } from '@/globalConfig';
import AnswerList from '@/page-components/question/answer-list/AnswerList';
import { useSelector } from 'react-redux';
import { formatToDateTime, isLogin } from '@/utils';
import useRequest from '@/hooks/useRequest';
import { addAnswer } from '@/api/answer';
import { emitter, EmitterType } from '@/utils/app-emitter';
import { getQuestionDetail, likeQuestion, unlikeQuestion } from '@/api/question';

function QuestionDetailPage({ item }) {
  const user = useSelector((state: any) => state.user);
  const [questionData, setQuestionData] = React.useState(item);
  const isAuthor = user?.id === item?.userId; // 是否是作者
  const text = useRef('');
  const { run, loading } = useRequest();

  useEffect(() => {
    getQuestionDetail(item.id).then((res) => {
      if (res.code == 200) {
        setQuestionData(res.data);
      }
    });
  }, []);
  const handleAnswerQuestion = () => {
    Modal.info({
      maskClosable: true,
      icon: <EditOutlined />,
      title: '回答问题',
      okButtonProps: {
        loading: loading,
      },
      content: (
        <Input.TextArea
          rows={4}
          onChange={(e) => {
            text.current = e.target.value;
          }}
        />
      ),
      okText: '提交',
      onOk: async () => {
        let res = await run(addAnswer({ questionId: item?.id, content: text.current }));
        if (res?.code == 200) {
          text.current = '';
          emitter.fire(EmitterType.updateAnswerList);
          message.success('回答成功');
        }
      },
    });
  };

  const handleLike = async (status) => {
    if (!isLogin()) {
      message.error('请先登录');
      return;
    }
    let newData = {
      ...questionData,
      likeStatus: status,
      likeCount: status ? questionData.likeCount + 1 : questionData.likeCount - 1,
    };
    setQuestionData(newData);

    let res = status ? likeQuestion({ questionId: item?.id }) : unlikeQuestion({ questionId: item?.id });
    run(res).then((result) => {
      if (result?.code != 200) {
        setQuestionData({
          ...questionData,
          likeStatus: !status,
          likeCount: !status ? questionData.likeCount + 1 : questionData.likeCount - 1,
        });
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.questionItem}>
          <div className={styles.questionHeader}>
            <div className={styles.questionAvatar}>
              <Image src={questionData.avatar} alt='' width={40} height={40} />
            </div>
            <div className={styles.questionAuthor}>{questionData?.nickname}</div>
            <div className={styles.questionDate}>编辑于{formatToDateTime(questionData?.updatedTime)}</div>
          </div>
          <div className={styles.questionTitle}>{questionData?.title || '申请大学时需要准备什么材料？'}</div>
          <div className={styles.questionContent}>{questionData?.content}</div>
          <div className={styles.tagList}>
            {questionData.tags?.map((tag) => {
              return <Tag key={tag} title={tag} />;
            })}
          </div>
          <div className={styles.actionContainer}>
            <div
              style={{ color: questionData.likeStatus ? colors.primaryColor : colors.iconDefaultColor }}
              onClick={() => {
                handleLike(!questionData.likeStatus);
              }}>
              {questionData.likeStatus ? (
                <LikeFilled height={14} width={14} />
              ) : (
                <LikeOutlineIcon height={14} width={14} color={colors.iconDefaultColor} />
              )}
              <span className={styles.count}>{questionData?.likeCount}</span>
            </div>
            <div>
              <HeartOutlined height={16} width={16} color={colors.iconDefaultColor} />
              <span className={styles.count}>{item?.favoriteCount}</span>
            </div>
            <Button type='primary' className={styles.answerBtn} onClick={handleAnswerQuestion}>
              写回答
            </Button>
          </div>
        </div>
        <AnswerList questionId={item?.id} isAuthor={isAuthor} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('context', context);
  const { params } = context;
  const questionId = params?.id;
  let appEnv = process.env.APP_ENV;
  let baseUrl = appEnv === 'development' ? globalConfig.devBaseUrl : globalConfig.prodBaseUrl;
  const res = await axios(`${baseUrl}/question/seoDetail/${questionId}`, {
    method: 'GET',
  });
  console.log('res', res);

  return {
    props: {
      item: res?.data?.data || {},
    },
  };
};
export default QuestionDetailPage;
