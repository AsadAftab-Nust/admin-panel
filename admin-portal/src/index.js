import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'antd/dist/antd.css';
//Container
import MainContainer from './Container/MainContainer'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MainContainer />, document.getElementById('root'));
registerServiceWorker();
