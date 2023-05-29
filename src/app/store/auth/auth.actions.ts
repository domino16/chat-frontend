import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/interfaces/user";

export const loginStart = createAction("[AUTH PAGE] Login start", props<{ email: string; password: string }>());

export const loginFailure = createAction("[AUTH PAGE] Login failure", props<{ error: string }>());

export const loginSuccess = createAction("[AUTH PAGE] Login success", props<{ authUser: User }>());

export const signupStart = createAction("[AUTH PAGE] Sign up start", props<{ newUser: User }>());

export const signupFailure = createAction("[AUTH PAGE] Sign up failure", props<{ error: string }>());

export const signupSuccess = createAction("[AUTH PAGE] Sign Up success", props<{ authUser: User }>());
