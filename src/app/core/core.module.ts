import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarMenuComponent } from './nav-bar-menu/nav-bar-menu.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [NavBarMenuComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[NavBarMenuComponent]
})
export class CoreModule { }
