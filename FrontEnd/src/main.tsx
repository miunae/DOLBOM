import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { store } from './app/store';
import { AxiosSetup } from './features/axios-setup/AxiosSetup';
import { CalendarPage } from './pages/CalendarPage';
import { ClientDetailPage } from './pages/ClientDetailPage';
import { ClientManagementPage } from './pages/ClientManagementPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { VideoPage } from './pages/VideoPage';

import { ClientCheckPage } from './pages/ClientCheckPage';


import { ProfilePage } from './pages/ProfilePage';


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <AxiosSetup />
        <LoginPage />
      </>
    ),
  },
  {
    path: '/login',
    element: store.getState().user?.id ? <HomePage /> : <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/calendar',
    element: <CalendarPage />,
  },
  {
    path: '/video/:id',
    element: <VideoPage />,
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
        <ToastContainer
          position="top-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </>,
  document.getElementById('root'),
);
