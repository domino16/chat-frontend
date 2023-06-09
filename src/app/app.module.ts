import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HomeModule } from "./features/home/home.module";
import { AuthModule } from "./core/auth/auth.module";
import { SharedModule } from "./shared/shared.module";
import { ChatModule } from "./features/chat/chat.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { jwtInterceptorProvider } from "./core/interceptors/token.interceptor";



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HomeModule,
    AuthModule,
    ChatModule,
    SharedModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [jwtInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {
}
