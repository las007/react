import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import axios from 'axios'
// axios.defaults.baseURL = 'http://44454.cn';
import { Provider } from "react-redux";
import store from "./store/index";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
