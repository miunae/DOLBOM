import * as React from 'react';

import { LoginForm } from '../features/auth/LoginForm';
import { Wave } from '../features/wave/wave';
// import { MainAppBar } from '../features/main-app-bar/MainAppBar';

export const LoginPage = () => {
  return (
    <>
      {/* <MainAppBar /> */}
      <LoginForm />
      <Wave />
    </>
  );
};
