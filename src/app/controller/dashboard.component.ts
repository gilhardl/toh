/* dashnoard.component.ts : Composant pour le dashboard de l'application (première page) */

///////////////////////////////////////////////////////////
// Imports
import { Component } from '@angular/core';
import {HeroService} from "../model/services/hero.service";
import {Hero} from "../model/hero";
import {WeaponService} from "../model/services/weapon.service";
import {Weapon} from "../model/weapon";

///////////////////////////////////////////////////////////
// Définition du composant
@Component({
  moduleId: module.id,
  selector: 'dashboard',                            // Selecteur (identifiant) du composant
  templateUrl: '../view/dashboard.component.html',  // Vue associée au composant
  styleUrls: ['../static/css/toh.css'],             // Style appliqué au composant
  providers: [HeroService, WeaponService]
})

///////////////////////////////////////////////////////////
// Class du composant
export class DashboardComponent {

  // Constructeur : Déclaration des données applicatives
  constructor(
      private heroService: HeroService,
      private weaponService: WeaponService
  ) { }

  // Constructeur : Déclaration des données du composant
  topHeroes : Hero[];     // Tableau contenant tous les heros à afficher dans le dashboard
  topWeapons : Weapon[];     // Tableau contenant tous les heros à afficher dans le dashboard
  selectedHero : Hero;    // Objet Hero représentant l'éventuel Hero sélectionné dans le dashboard


  // Initialisation
  ngOnInit(): void {
    this.getTopHeroes();
    this.getTopWeapons();
  }

  ///////////////////////////////////////////////////////////
  // Méthodes

  // Récupération des héros
  getTopHeroes(): void {
    this.heroService.getHeroes()                              // Appelle le service heroService pour récupérer tous les Heros
      .then(heroes => this.topHeroes = heroes.slice(1, 5));   // getHerooes() : Renvoie une Promise (objet représentant une valeur pas encore disponible)
      //  .then : Méthode de callback qui sera executée lorsque le résultat de getHeroes() sera disponible
      //          Syntaxe d'une méthode de callback : (param1, param2, paramN) => [INSTRUCTIONS]
      //                                               -> Les () sont optionnelles s'il n'y a qu'un seul paramètre
  }
  // Récupération des armes
  getTopWeapons(): void {
    this.weaponService.getWeapons()                              // Appelle le service weaponService pour récupérer les meilleurs armes
      .then(weapons => this.topWeapons = weapons.slice(1, 5));
  }

  // Sélection d'un héro
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
