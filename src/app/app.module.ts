/* app.module.ts : Module principal de l'application */

///////////////////////////////////////////////////////////
// Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "./app-routing.module";

// Chargement et configuration de l'in-memory web API (simulation de serveur web)
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './controller/app.component';
import { DashboardComponent } from "./controller/dashboard.component";
import { HeroesComponent } from './controller/heroes.component';
import { HeroDetailsComponent } from './controller/hero-details.component'
import { HeroSearchComponent } from "./controller/hero-search.component";
import { WeaponsComponent } from './controller/weapons.component';
import { WeaponDetailsComponent } from './controller/weapon-details.component';

import { HeroService } from "./model/services/hero.service";
import { WeaponService } from './model/services/weapon.service';


@NgModule({
  // Déclaration des modules utilisés par l'application en général
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  // Déclaration des composant de l'application
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailsComponent,
    HeroSearchComponent,
    WeaponsComponent,
    WeaponDetailsComponent
  ],
  // Déclaration des services faisant office de DAO
  providers: [
      HeroService,
      WeaponService
  ],
  // Déclaration du composant de démarrage de l'application
  bootstrap: [AppComponent]
})

export class AppModule { }
