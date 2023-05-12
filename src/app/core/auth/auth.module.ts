import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, SharedModule],
})
export class AuthModule {}
