import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TileComponent } from './dashboard/components/tile/tile.component';
import { StudentModule } from './student/student.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StudentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
