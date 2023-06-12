import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { loginFailure, loginStart, loginSuccess, signupFailure, signupStart, signupSuccess } from "./auth.actions";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { loadChats, loadMessages } from "../chat/chat.actions";
import { RxStompService } from "src/app/core/services/rx-stomp.service";



@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.getAuth(action.email, action.password).pipe(
          map((user) =>  loginSuccess({ authUser: user })),
          catchError((error) => of(loginFailure({ error: error.error.message }))),
        );
      }),
    );
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.newUser).pipe(
          map((user) => signupSuccess({ authUser: user })),
          catchError((error) => {
            return of(signupFailure({ error: error.error.message }));
          }),
        );
      }),
    );
  });

  loginSucess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      switchMap((action)=>{
        this.router.navigate(["/chat"]);
        this.store.dispatch(loadChats({userEmail:action.authUser.email}));
        this.authService.handleAuth(action.authUser);
        return this.rxStompService.watch(`/user/${action.authUser.email}/queue/messages`)
        .pipe(map((a)=> {console.log(a)
          return loadMessages()
        }))
      })
    )
  })

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store,
    private rxStompService: RxStompService
  ) {}
}
