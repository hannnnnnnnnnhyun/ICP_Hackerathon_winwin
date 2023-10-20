import {ActionType} from "typesafe-actions";
import * as actions from "@action/home.action";
import {Event} from "@type/data/event.type";

export type HomeState = {
    events: Array<Event>;
}

export type HomeActions = ActionType<typeof actions>;