import * as React from 'react';

import { MainAppBar } from '../features/main-app-bar/MainAppBar';
import Signup from '../features/signup/SignUp';

export function SignupPage() {
  return (
    <>
      <MainAppBar />
      <Signup />
    </>
  );
}
