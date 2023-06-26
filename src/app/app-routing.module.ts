import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./features/home/home.component";
import { SignupComponent } from "./core/auth/signup/signup.component";
import { ChatComponent } from "./features/chat/chat.component";
import { AuthGuard } from "./core/auth/auth.guard";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "signup", component: SignupComponent },
  { path: "chat", component: ChatComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
