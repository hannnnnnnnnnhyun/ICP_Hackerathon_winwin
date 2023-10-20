import {Event} from "@type/data/event.type";
import {ActionType} from "typesafe-actions";
import * as actions from "@action/detail.action";
import {Transaction} from "@type/data/transaction.type";

export type DetailState = {
    event?: Event;
    transactions: Array<Transaction>;
}

export type DetailActions = ActionType<typeof actions>;