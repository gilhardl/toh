/* heroes.component.ts : Composant pour la liste des Hero */

///////////////////////////////////////////////////////////
// Imports
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Hero } from '../model/hero';
import { HeroService } from '../model/services/hero.service';

///////////////////////////////////////////////////////////
// Définition du composant
@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: '../view/heroes.component.html',
  styleUrls: ['../static/css/toh.css'],
  providers: [HeroService]
})

///////////////////////////////////////////////////////////
// Class du composant
export class HeroesComponent implements OnInit {

  // Constructeur : Déclaration des données applicatives
  constructor(
    private router: Router,
    private heroService: HeroService
  ) { }

  // Déclaration des données du composant
  heroes : Hero[];
  selectedHero : Hero;


  // Initialisation
  ngOnInit(): void {
    this.getHeroes();
  }

  // Fonction de sélection d'un héro
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  // Fonction de récupération des héros
  getHeroes(filter = undefined): void {
    this.heroService.getHeroes()
    .then(heroes => this.heroes = heroes);
  }

  sortHeroes(filter): void {
    this.heroes.sort(function(a, b){
       return a[filter] - b[filter];
   });
  }

  // Fonction pour afficher les détails d'un héro
  gotoDetails(): void {
    this.router.navigate(['/details', this.selectedHero.id]);
  }

  // Fonction pour ajouter un Hero
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  // Fonction pour supprimer un Hero
  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
  }
}
