import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'nes.css/css/nes.min.css';
import App from './App';
import Title from './components/Title/Title';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
      <Title title="Qual o seu favorito?" />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
