import {createLogger} from 'redux-logger';
import {configureStore, MiddlewareArray} from '@reduxjs/toolkit'
import rootReducer from "@reducer/root.reducer";
const loggerMiddleware = createLogger();

const store = configureStore({
    reducer: rootReducer,
    middleware: import.meta.env.VITE_APP_NODE_ENV === 'production' ? [] : new MiddlewareArray().concat(loggerMiddleware),
});

export default { store };
