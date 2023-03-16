import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './student/list/list.component';

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
      path: 'student/list',
      component: ListComponent
    },
    {
      path: 'course',
      loadChildren: () => import('./course/course.module')
      .then((m) => m.CourseModule)},
    {
      path: '**',
      redirectTo: 'dashboard', // Or any 404 component you want !
      pathMatch: 'full'
    }
  ]
 }
