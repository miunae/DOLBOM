import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '../features/auth/authApi';
import { MainAppBar } from '../features/main-app-bar/MainAppBar';
import { ProfileForm } from '../features/profile/ProfileForm';

export const ProfilePage = () => {
  return (
    <>
      <MainAppBar />
      <ProfileForm />
    </>
  );
};
