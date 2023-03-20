import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



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
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
}
