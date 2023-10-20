import {ModalActions, ModalState} from "@type/modal.type.tsx";
import {createReducer} from "typesafe-actions";
import {ON_CHANGE_CHALLENGE_ID, ON_CHANGE_NOTICE_MESSAGE, ON_CHANGE_TRANSACTION, ON_TOGGLE_CHALLENGE_MODAL, ON_TOGGLE_FINISH_MODAL, ON_TOGGLE_LOADING_MODAL, ON_TOGGLE_NOTICE_MODAL} from "@action/modal.action.tsx";

const initialState: ModalState = {
    isOpenFinishModal: false,
    isOpenChallengeModal: false,
    isOpenLoadingModal: false,
    isOpenNoticeModal: false,

    challengeId: undefined,
    transaction: undefined,
    noticeMessage: undefined
}

const ModalReducer = createReducer<ModalState, ModalActions>(initialState, {
    [ON_TOGGLE_FINISH_MODAL]: (state, _action) => ({
        ...state,
        isOpenFinishModal: !state.isOpenFinishModal
    }),
    [ON_TOGGLE_CHALLENGE_MODAL]: (state, _action) => ({
        ...state,
        isOpenChallengeModal: !state.isOpenChallengeModal
    }),
    [ON_TOGGLE_LOADING_MODAL]: (state, action) => ({
        ...state,
        isOpenLoadingModal: action.payload
    }),
    [ON_TOGGLE_NOTICE_MODAL]: (state, _action) => ({
        ...state,
        isOpenNoticeModal: !state.isOpenNoticeModal
    }),

    [ON_CHANGE_CHALLENGE_ID]: (state, action) => ({
        ...state,
        challengeId: action.payload
    }),
    [ON_CHANGE_TRANSACTION]: (state, action) => ({
        ...state,
        transaction: action.payload
    }),
    [ON_CHANGE_NOTICE_MESSAGE]: (state, action) => ({
        ...state,
        noticeMessage: action.payload
    }),
})

export default ModalReducer;