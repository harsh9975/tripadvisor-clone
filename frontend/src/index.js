import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import  reducer, { initialState } from './store/reducer';
import { StateProvider } from './store/StateProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StateProvider initialState={initialState} reducer={reducer}>
    <App />
    </StateProvider>
);

