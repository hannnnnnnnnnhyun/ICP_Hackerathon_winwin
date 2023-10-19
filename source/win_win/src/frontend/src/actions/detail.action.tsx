import {createAsyncAction, createAction} from "typesafe-actions";
import {Transaction} from "@type/data/transaction.type";
import {Event} from "@type/data/event.type";

export const ON_GET_EVENT = "detail/ON_GET_EVENT" as const;
export const ON_GET_TRANSACTION = "detail/ON_GET_TRANSACTION_SUCCESS" as const;

export const onGetEventAction = createAction(ON_GET_EVENT)<Event>();
export const onGetTransactionAction = createAction(ON_GET_TRANSACTION)<Array<Transaction>>();