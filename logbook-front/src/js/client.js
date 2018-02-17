import React from "react";
import ReactDOM from "react-dom";
import BSOD from 'react-bsod';
import { Provider } from "react-redux";
import { store } from "./store";
import AppProvider from "./components/AppProvider";
import 'babel-polyfill';

const app = document.getElementById('app');

try {
    ReactDOM.render(<Provider store={store}>
        <AppProvider />
    </Provider>, app);
} catch (e) {
    ReactDOM.render(<BSOD error={e} />, app);
}
