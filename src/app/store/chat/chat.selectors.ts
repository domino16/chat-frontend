import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ChatState, selectAll } from "./chat.reducer";

export const CHAT_STATE_NAME = 'chat'

export const getChatState = createFeatureSelector<ChatState>(CHAT_STATE_NAME);

export const selectAllChats = createSelector(
    getChatState,
    selectAll
  );