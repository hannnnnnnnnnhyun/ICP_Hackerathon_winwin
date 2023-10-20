import * as actions from "@action/modal.action"
import {ActionType} from "typesafe-actions";
import { Transaction } from "./data/transaction.type";


export type ModalState = {
    challengeId?: string;
    transaction?: Transaction;
    noticeMessage?: string;
    eventState?: string;

    isOpenChallengeModal: boolean;
    isOpenFinishModal: boolean;
    isOpenLoadingModal: boolean;
    isOpenNoticeModal: boolean;
    isOpenConfirmModal: boolean;
}

export type ModalActions = ActionType<typeof actions>;