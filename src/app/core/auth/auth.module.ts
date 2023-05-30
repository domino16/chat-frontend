import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignupComponent } from "./signup/signup.component";
import { SharedModule } from "../../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { authReducer } from "src/app/store/auth/auth.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "src/app/store/auth/auth.effects";

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature("auth", authReducer),
    EffectsModule.forFeature(AuthEffects),
  ],
})
export class AuthModule {}
