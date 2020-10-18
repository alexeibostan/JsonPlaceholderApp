import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarMenuComponent } from './nav-bar-menu/nav-bar-menu.component';



@NgModule({
  declarations: [NavBarMenuComponent],
  imports: [
    CommonModule
  ],
  exports:[NavBarMenuComponent]
})
export class CoreModule { }
