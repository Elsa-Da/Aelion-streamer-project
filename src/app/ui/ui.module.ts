import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ...UiModule.materials
  ]
})
export class UiModule {
  public static materials = [
    MatToolbarModule
  ]
}
