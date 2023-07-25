import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "./material/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/menu/header/header.component";
import { SidenavComponent } from "./components/menu/sidenav/sidenav.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { ProfilePopupComponent } from './components/profile-popup/profile-popup.component';

@NgModule({
  declarations: [HeaderComponent, SidenavComponent, FooterComponent, LoadingSpinnerComponent, DeleteButtonComponent, DateFormatPipe, ProfilePopupComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  exports: [
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    DeleteButtonComponent,
    DateFormatPipe,
    ProfilePopupComponent
  ],
})
export class SharedModule {}
