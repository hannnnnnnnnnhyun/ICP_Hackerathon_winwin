import { combineReducers } from 'redux';
import HomeReducer from '@reducer/home.reducer';
import DetailReducer from "@reducer/detail.reducer";
import ModalReducer from "@reducer/modal.reducer.tsx";
import HeaderReducer from "@reducer/header.reducer.tsx";

const RootReducer = combineReducers({
    HomeReducer,
    DetailReducer,
    ModalReducer,
    HeaderReducer
})

export default RootReducer;
export type RootState = ReturnType<typeof RootReducer>;