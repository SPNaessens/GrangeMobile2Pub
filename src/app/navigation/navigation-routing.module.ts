import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavigationPage } from './navigation.page';

const routes: Routes = [

  {
    path: 'navigation',
    component: NavigationPage,
    children: [   

    {
      path: 'events',
      loadChildren: () => import('../events/events.module').then( m => m.EventsPageModule)
    },
    {
      path: 'tab1',
      loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
    },
    {
      path: 'tab2',
      loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
    },
    {
      path: 'tab3',
      loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
    },
    {
      path: 'news',
      loadChildren: () => import('../news/news.module').then(m => m.NewsPageModule)
    },
    {
      path: 'addstudent',
      loadChildren: () => import('../addstudent/addstudent.module').then(m => m.AddStudentPageModule)
    },
    {
      path: '',
      redirectTo: '/navigation/events',
      pathMatch: 'full'
    },
  ]
  },
  {
    path: '',
    redirectTo: '/navigation/events',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavigationPageRoutingModule {}
