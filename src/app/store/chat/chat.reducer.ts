import { createReducer, on } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import * as ChatActions from "./chat.actions";
import { Chat } from "src/app/core/interfaces/chat";

export const chatsFeatureKey = "chats";

export interface State extends EntityState<Chat> {
  allChatsLoaded: boolean;
  }

export const chatAdapter: EntityAdapter<Chat> = createEntityAdapter<Chat>({
  selectId: (chat: Chat) => chat.chatId
});

export const initialState: State = chatAdapter.getInitialState({
  allChatsLoaded: false
});

export const chatReducer = createReducer(
  initialState,
  on(ChatActions.addChat, (state, action) => chatAdapter.addOne(action.chat, state)),
  on(ChatActions.upsertChat, (state, action) => chatAdapter.upsertOne(action.chat, state)),
  on(ChatActions.addChats, (state, action) => chatAdapter.addMany(action.chats, state)),
  on(ChatActions.upsertChats, (state, action) => chatAdapter.upsertMany(action.chats, state)),
  on(ChatActions.updateChat, (state, action) => chatAdapter.updateOne(action.chat, state)),
  on(ChatActions.updateChats, (state, action) => chatAdapter.updateMany(action.chats, state)),
  on(ChatActions.deleteChat, (state, action) => chatAdapter.removeOne(action.id, state)),
  on(ChatActions.deleteChats, (state, action) => chatAdapter.removeMany(action.ids, state)),
  on(ChatActions.clearChats, (state) => chatAdapter.removeAll(state)),
  on(ChatActions.allChatsLoaded, (state, action) => chatAdapter.setAll (action.chats, { ...state, allChatsLoaded: true }),
  ),
);

export const { selectIds, selectEntities, selectAll, selectTotal } = chatAdapter.getSelectors();
