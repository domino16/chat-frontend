import { createAction, props } from "@ngrx/store";
import { Chat } from "src/app/core/interfaces/chat";
import { Message } from "src/app/core/interfaces/message";

export const loadChats = createAction("[Chat/API] Load Chats", props<{userEmail:string}>());

export const allChatsLoaded = createAction("[[Chat/API]] All Chats Loaded", props<{ chats: Chat[] }>());

export const addChat = createAction("[Chat/API] Add Chat", props<{ chat: Chat }>());

export const selectChat = createAction("[Chat/API] Set Selected Chat", props<{selectedChat:Chat}>());


export const loadMessages = createAction('[Chat/API] Load Message', props<{senderId:string, recipientId:string, limit:number}>())

export const allMessagesLoaded = createAction('[Chat/API] All Messages Loaded', props<{messages:Message[]}>())

export const sendMessage = createAction('[Chat/API] Send Message', props<{messageContent:string}>())

export const sendMessageSucess = createAction('[Chat/API] Send Message Sucess', props<{message:Message}>())