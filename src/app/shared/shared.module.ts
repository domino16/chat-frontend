import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/menu/header/header.component';
import { SidenavComponent } from './components/menu/sidenav/sidenav.component';

@NgModule({
  declarations: [HeaderComponent, SidenavComponent, FooterComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  exports: [
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
})
export class SharedModule {}
