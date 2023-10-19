import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "react-redux";
import Store from "@helper/store";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={Store.store}>
        <App />
    </Provider>
)
