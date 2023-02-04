import React, { useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';
import styles from './index.module.scss';
type RequiredMark = boolean | 'optional';
interface Props {
  isLogin: boolean;
}
function LoginForm({ isLogin }: Props) {
  const [form] = Form.useForm();

  const initialValues = {
    username: 'test',
    password: '123456',
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
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
        onFinishFailed={onFinishFailed}
        initialValues={initialValues}>
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
          <Button type='primary' className={styles.submitBtn} htmlType='submit'>
            {isLogin ? '登录' : '注册'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
