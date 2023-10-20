import {createAsyncAction, createAction} from "typesafe-actions";
import {Event} from "@type/data/event.type";

export const GET_EVENT = "home/GET_EVENT_SUCCESS" as const;
export const ON_EVNET_CLEAR = "home/ON_EVNET_CLEAR" as const;

export const onGetEventAction = createAction(GET_EVENT)<Event[]>();
export const onEventClearAction = createAction(ON_EVNET_CLEAR)();
