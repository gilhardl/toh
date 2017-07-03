/* app-routing.module.ts : Module pour le routing */

///////////////////////////////////////////////////////////
// Imports
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from "./controller/dashboard.component";
import { HeroesComponent } from './controller/heroes.component';
import { HeroDetailsComponent } from './controller/hero-details.component'
import { WeaponsComponent } from './controller/weapons.component';
import { WeaponDetailsComponent } from './controller/weapon-details.component';

// Déclaration des routes de l'application
const routes: Routes = [ {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }, {
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'heroes',
    component: HeroesComponent
  }, {
    path: 'details/:id',
    component: HeroDetailsComponent
  }, {
    path: 'weapons',
    component: WeaponsComponent
  }, {
    path: 'weapon/:id',
    component: WeaponDetailsComponent
  }
];

// Déclaration des routes dans le RouterModule puis propagation du RouteurModule
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
