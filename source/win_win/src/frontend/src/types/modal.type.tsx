import * as actions from "@action/modal.action"
import {ActionType} from "typesafe-actions";
import { Transaction } from "./data/transaction.type";

export type ModalState = {
    challengeId?: string;
    transaction?: Transaction;

    isOpenChallengeModal: boolean;
    isOpenFinishModal: boolean;
    isOpenLoadingModal: boolean;
}

export type ModalActions = ActionType<typeof actions>;