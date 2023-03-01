import React from 'react';
import Image from 'next/image';
import { Button, Input, message } from 'antd';
import { sendComment } from '@/api/comment';
import { useSelector } from 'react-redux';
import useRequest from '@/hooks/useRequest';
const { Search } = Input;

function CommentInput({ answerData, setAnswerData }) {
  const [comment, setComment] = React.useState<any>('');
  const user = useSelector((state: any) => state.user);
  const commentLock = React.useRef(false);
  const { run, loading } = useRequest();

  const handleSendComment = async () => {
    if (!comment) {
      message.error('请输入评论内容');
      commentLock.current = false;
      return;
    }
    if (!commentLock.current) {
      commentLock.current = true;
      try {
        let res = await run(
          sendComment({
            answerId: answerData.id,
            content: comment,
          }),
        );
        console.log('res', res);
        if (res.code == 200) {
          setComment('');
          setAnswerData({ ...answerData, commentCount: answerData.commentCount + 1 });
          message.success('发送成功');
        }
      } finally {
        commentLock.current = false;
      }
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', paddingRight: 20, alignItems: 'center' }}>
      <Image style={{ borderRadius: '50%', marginRight: 10 }} src={user?.avatar} alt='' width={40} height={40} />

      <Input.Group compact>
        <Input
          style={{ width: 'calc(100% - 90px)' }}
          placeholder='请输入评论内容'
          value={comment}
          onPressEnter={handleSendComment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <Button type='primary' loading={loading} onClick={handleSendComment}>
          评论
        </Button>
      </Input.Group>
    </div>
  );
}

export default CommentInput;
