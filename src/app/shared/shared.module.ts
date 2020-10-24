import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpperFirstLetterPipe } from './upper-first-letter.pipe';



@NgModule({
  declarations: [UpperFirstLetterPipe],
  imports: [
    CommonModule
  ],
  exports: [CommonModule, UpperFirstLetterPipe]
})
export class SharedModule { }
