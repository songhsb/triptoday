import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './reset.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/config/configStore';
import { RecoilRoot } from 'recoil';
// import { app } from './firebase';
//import { Provider } from 'react-redux';
//import store from './redux/config/configStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </Provider>,
);

// console.log('app', app);
