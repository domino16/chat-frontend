import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./features/home/home.component";
import { AuthGuard } from "./core/auth/auth.guard";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "chat",
    loadChildren: () => import("./features/chat/chat.module").then((m) => m.ChatModule),
    canActivate: [AuthGuard],
  },
  {
    path: "signup",
    loadChildren: () => import("./core/auth/auth.module").then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
