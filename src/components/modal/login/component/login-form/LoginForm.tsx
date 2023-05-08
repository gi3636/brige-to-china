import React, { useState } from 'react';
import { Button, Form, Input, message, Radio } from 'antd';
import styles from './index.module.scss';
import { login, register } from '@/api/auth';
import { useDispatch } from 'react-redux';
import { updateUser } from '@/store/user/slice';
import { emitter } from '@/utils/app-emitter';
import useRequest from '@/hooks/useRequest';
import { addFriend } from '@/store/friend/slice';
type RequiredMark = boolean | 'optional';
interface Props {
  isLogin: boolean;
}
function LoginForm({ isLogin }: Props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  let { run, loading } = useRequest();

  const onFinish = async (values: any) => {
    let res = await run(isLogin ? login(values) : register(values));
    console.log(res);
    if (isLogin && res.code == 200) {
      dispatch(updateUser(res.data));
      dispatch(addFriend(res.data));
      localStorage.setItem('token', res?.data?.token);
      message.success('登录成功');
      emitter.fire('closeLoginModal');
    }
    if (!isLogin && res.code == 200) {
      form.resetFields();
      message.success('注册成功');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Form
        className={styles.form}
        style={{ position: 'relative' }}
        form={form}
        layout='vertical'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item label='账号' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder='邮箱/手机号' />
        </Form.Item>
        <Form.Item label='密码' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder='密码' />
        </Form.Item>

        {isLogin ? (
          <>
            <div className={styles.forgetPasswordBtn}>忘记密码</div>
          </>
        ) : (
          <Form.Item
            label='确认密码'
            name='confirmPassword'
            rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder='确认密码' />
          </Form.Item>
        )}
        <Form.Item>
          <Button type='primary' className={styles.submitBtn} htmlType='submit' loading={loading}>
            {isLogin ? '登录' : '注册'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
