import {HomeActions, HomeState} from "@type/home.type";
import {createReducer} from "typesafe-actions";
import {GET_EVENT, ON_EVNET_CLEAR} from "@action/home.action";

const initialState: HomeState = {
    events: []
}

const HomeReducer = createReducer<HomeState, HomeActions>(initialState, {
    [GET_EVENT]: (state, action) => ({
        ...state,
        events: state.events.concat(action.payload)
    }),
    [ON_EVNET_CLEAR]: (state) => ({
        ...state,
        events: []
    })
});

export default HomeReducer;