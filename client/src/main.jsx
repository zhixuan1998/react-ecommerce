import './index.scss';
import './assets/styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import store from '@/app/store';
import config from '../appsettings';
import createRepositories from '../repositories';
import { RepositoryContext } from '@/utils/context.js';

import App from './App.jsx';
import ErrorPage from './ErrorPage.jsx';

import AuthBaseView from './features/Auth/BaseView.jsx';
import LoginView from './features/Auth/LoginView.jsx';
import SignupView from './features/Auth/SignupView.jsx';
import ThankYouView from './features/Auth/ThankYouView.jsx';

const repositoryContextValue = createRepositories(config);

const childrenRouter = [
  {
    path: '/home?',
    element: <AuthBaseView />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <LoginView />
      },
      {
        path: 'signup',
        element: <SignupView />
      },
      {
        path: 'thank-you',
        element: <ThankYouView />
      }
    ]
  }
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: childrenRouter
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <RepositoryContext.Provider value={repositoryContextValue}>
        <RouterProvider router={router} />
      </RepositoryContext.Provider>
    </StoreProvider>
  </React.StrictMode>
);
