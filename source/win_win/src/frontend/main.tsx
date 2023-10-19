// import * as React from "react"
// import * as ReactDOM from "react-dom"
// import App from "./App"

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root"),
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "react-redux";
import Store from "@helper/store";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={Store.store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    </Provider>
)
