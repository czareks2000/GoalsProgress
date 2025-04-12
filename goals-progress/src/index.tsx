import ReactDOM from 'react-dom/client';
import { StoreContext, store } from './app/stores/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes';
import React from 'react';
import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
        <RouterProvider router={router}/>
    </StoreContext.Provider>
  </React.StrictMode>
);

dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    weekStart: 1,
})

