import { HeaderState, HeaderAction } from "@type/header.type";
import {createReducer} from "typesafe-actions";
import {ON_AUTH_USER } from "@action/header.action";

const initialState: HeaderState = {
    principal: undefined,
}

const HomeReducer = createReducer<HeaderState, HeaderAction>(initialState, {
    [ON_AUTH_USER]: (state, action) => ({
        ...state,
        principal: action.payload
    })
});

export default HomeReducer;