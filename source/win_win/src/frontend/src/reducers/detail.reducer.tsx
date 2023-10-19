import {DetailActions, DetailState} from "@type/detail.type";
import {createReducer} from "typesafe-actions";
import {ON_GET_EVENT, ON_GET_TRANSACTION} from "@action/detail.action";

const initialState: DetailState = {
    event: undefined,
    transactions: []
}

const DetailReducer = createReducer<DetailState, DetailActions>(initialState, {
    [ON_GET_EVENT]: (state, action) => ({
        ...state,
        event: action.payload
    }),
    [ON_GET_TRANSACTION]: (state, action) => ({
        ...state,
        transactions: [...state.transactions, ...action.payload]
    })
})

export default DetailReducer;