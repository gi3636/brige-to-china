import React from 'react';
import LoginForm from '@/components/modal/login/component/login-form/LoginForm';

interface Props {
  isLogin: boolean;
}
function LoginBody({ isLogin }: Props) {
  return (
    <div>
      <LoginForm isLogin={isLogin} />
    </div>
  );
}

export default LoginBody;
