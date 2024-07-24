import './index.scss';
import './assets/styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import router from './router';
import store from '@/app/store';
import config from '../appsettings';
import createRepositories from '../repositories';
import { RepositoryContext } from '@/utils/context.js';

const repositoryContextValue = createRepositories(config);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <RepositoryContext.Provider value={repositoryContextValue}>
        <RouterProvider router={router} />
      </RepositoryContext.Provider>
    </StoreProvider>
  </React.StrictMode>
);
