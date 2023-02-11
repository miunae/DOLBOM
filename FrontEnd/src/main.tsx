import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { store } from './app/store';
import { AxiosSetup } from './features/axios-setup/AxiosSetup';
import { CalendPage } from './pages/CalendarPage';
import { ClientCheckPage } from './pages/ClientCheckPage';
import { ClientDetailPage } from './pages/ClientDetailPage';
import { ClientManagementPage } from './pages/ClientManagementPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { SignupPage } from './pages/SignupPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { VideoPage } from './pages/VideoPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <AxiosSetup />
        <HomePage />
      </>
    ),
  },
  {
    path: '/login',
    element: store.getState().user?.id ? <HomePage /> : <LoginPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/calendar',
    element: <CalendPage />,
  },
  {
    path: '/video/:id',
    element: <VideoPage />,
  },
  {
    path: '/userprofile',
    element: <UserProfilePage />,
  },
  {
    path: '/clientcheck',
    element: <ClientCheckPage />,
  },
  {
    path: '/clientmanagement',
    element: <ClientManagementPage />,
  },
  {
    path: '/clientdetail/:userName/:folderPath/',
    element: <ClientDetailPage />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

ReactDOM.render(
  <>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </>,
  document.getElementById('root'),
);
