import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public static readonly routes: Routes = [
    {
      path: '', // Mean http://localhost:4200
      redirectTo: 'dashboard', // Redirect to another Route object
      pathMatch: 'full' // Mean Angular read the whole URI instead of the first matching occurence
    },
    { 
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: '**',
      redirectTo: 'dashboard', // Or any 404 component you want !
      pathMatch: 'full'
    }
  ]
 }
