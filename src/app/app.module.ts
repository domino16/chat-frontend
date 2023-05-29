import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeModule } from "./features/home/home.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthModule } from "./core/auth/auth.module";
import { SharedModule } from "./shared/shared.module";
import { ChatModule } from "./features/chat/chat.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { authReducer } from "./store/auth/auth.reducer";
import { AuthEffects } from "./store/auth/auth.effects";
import { chatReducer } from "./store/chat/chat.reducer";
import { ChatEffects } from "./store/chat/chat.effects";


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    AuthModule,
    ChatModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot( { chat: chatReducer, auth: authReducer }),
    EffectsModule.forRoot([AuthEffects, ChatEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
