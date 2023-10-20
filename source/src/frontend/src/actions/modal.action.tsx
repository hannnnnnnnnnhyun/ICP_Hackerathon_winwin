import {createAction} from "typesafe-actions";
import { Transaction } from "@type/data/transaction.type";

export const ON_TOGGLE_CHALLENGE_MODAL = "modal/challenge/ON_TOGGLE_CHALLENGE_MODAL" as const;
export const ON_TOGGLE_FINISH_MODAL = "modal/finish/ON_TOGGLE_FINISH_MODAL" as const;
export const ON_TOGGLE_LOADING_MODAL = "modal/login/ON_TOGGLE_LOADING_MODAL" as const;
export const ON_TOGGLE_NOTICE_MODAL = "modal/notice/ON_TOGGLE_NOTICE_MODAL" as const;

export const ON_CHANGE_CHALLENGE_ID = "modal/challenge/ON_CHANGE_CHALLENGE_ID" as const;
export const ON_CHANGE_TRANSACTION = "modal/finish/ON_CHANGE_TRANSACTION" as const;
export const ON_CHANGE_NOTICE_MESSAGE = "modal/notice/ON_CHANGE_NOTICE_MESSAGE" as const;

export const onToggleChallengeModalAction = createAction(ON_TOGGLE_CHALLENGE_MODAL)<undefined>();
export const onToggleFinishModalAction = createAction(ON_TOGGLE_FINISH_MODAL)<undefined>();
export const onToggleLoadingModalAction = createAction(ON_TOGGLE_LOADING_MODAL)<boolean>();
export const onToggleNoticeModalAction = createAction(ON_TOGGLE_NOTICE_MODAL)<undefined>();

export const onChangeChallengeIdAction = createAction(ON_CHANGE_CHALLENGE_ID)<string>();
export const onChangeTransactionAction = createAction(ON_CHANGE_TRANSACTION)<Transaction>();
export const onChangeNoticeMessageAction = createAction(ON_CHANGE_NOTICE_MESSAGE)<string>();