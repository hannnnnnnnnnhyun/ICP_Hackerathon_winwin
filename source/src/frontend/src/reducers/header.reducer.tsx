import { HeaderState, HeaderAction } from "@type/header.type";
import {createReducer} from "typesafe-actions";
import {ON_AUTH_USER, ON_UPDATE_NFT_BALANCE, ON_UPDATE_TOKEN_BALANCE } from "@action/header.action";

const initialState: HeaderState = {
    principal: undefined,
    nftBalance: undefined,
    tokenBalance: undefined
}

const HomeReducer = createReducer<HeaderState, HeaderAction>(initialState, {
    [ON_AUTH_USER]: (state, action) => ({
        ...state,
        principal: action.payload
    }),
    [ON_UPDATE_NFT_BALANCE]: (state, action) => ({
        ...state,
        nftBalance: action.payload
    }),
    [ON_UPDATE_TOKEN_BALANCE]: (state, action) => ({
        ...state,
        tokenBalance: action.payload
    })
});

export default HomeReducer;