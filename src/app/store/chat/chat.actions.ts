import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Chat } from "src/app/core/interfaces/chat";

export const loadChats = createAction("[Chat/API] Load Chats", props<{userEmail:string}>());

export const allChatsLoaded = createAction("[[Chat/API]] All Chats Loaded", props<{ chats: Chat[] }>());

export const addChat = createAction("[Chat/API] Add Chat", props<{ chat: Chat }>());

export const upsertChat = createAction("[Chat/API] Upsert Chat", props<{ chat: Chat }>());

export const addChats = createAction("[Chat/API] Add Chats", props<{ chats: Chat[] }>());

export const upsertChats = createAction("[Chat/API] Upsert Chats", props<{ chats: Chat[] }>());

export const updateChat = createAction("[Chat/API] Update Chat", props<{ chat: Update<Chat> }>());

export const updateChats = createAction("[Chat/API] Update Chats", props<{ chats: Update<Chat>[] }>());

export const deleteChat = createAction("[Chat/API] Delete Chat", props<{ id: string }>());

export const deleteChats = createAction("[Chat/API] Delete Chats", props<{ ids: string[] }>());

export const clearChats = createAction("[Chat/API] Clear Chats");

