/* hero-details.component.ts : Composant pour la fiche Hero de l'application */

///////////////////////////////////////////////////////////
// Imports
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { HeroService } from '../model/services/hero.service';
import { Hero } from "../model/hero";

import { WeaponService } from '../model/services/weapon.service';
import { Weapon } from '../model/weapon';

///////////////////////////////////////////////////////////
// Définition du composant
@Component({
  moduleId: module.id,
  selector: 'hero-detail',
  styleUrls: ['../static/css/toh.css'],
  templateUrl: '../view/hero-details.component.html'
})

///////////////////////////////////////////////////////////
// Class du composant
export class HeroDetailsComponent implements OnInit {

  // Constructeur : Déclaration des données applicatives
  constructor(
    private heroService: HeroService,
    private weaponService: WeaponService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  // Déclaration des données du composant
  hero: Hero;
  heroWeapon: Weapon;
  allWeapons: Weapon[];
  ptsCaractRestant: number;
  private static readonly ptsCaractMax: number = 40;


  // Initialisation
  ngOnInit(): void {
    this.weaponService.getWeapons()
      .then((weapons: Weapon[]) => {
        this.allWeapons = weapons
      });

    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      //    .switchMap : Opérateur permettant de mapper l'ID recu en paramètre (de type Observable) en un nouveau Observable
      //       getHero : Méthode du HeroService permettant de récupérer un Hero en BD à partir de son ID
      //  params['id'] : Renvoie l'ID passé en paramètre (type String)
      // +params['id'] : Renvoie l'ID passé en paramètre (type Integer)
      .subscribe((hero: Hero) => {
        this.hero = hero,                  // Affecte le Hero récupéré depuis le HeroService à la variable de classe this.hero
        this.updatePtsCaractRestants(),    // Met à jour l'affichage des pts de caractéristiques restants à attribuer
        this.weaponService.getWeapon(this.hero.idWeapon)
          .then((weapon: Weapon) => {
            this.heroWeapon = weapon
          })  // Récupère l'arme du hero
      });
  }

  // Methode au onChange dans les champs de saisie des caractéristiques
  validateCaract(): void {
    var total = this.hero.pv + this.hero.degat + this.hero.attaque + this.hero.esquive;

    if (this.hero.pv < 1 || this.hero.degat < 1 || this.hero.attaque < 1 || this.hero.esquive < 1){
      this.showSnackbar('Les caractéristiques de votre héro doivent être positives');

    } else if (total > 40) {
      this.showSnackbar('La somme des caractéristiques de votre héro ne doit pas dépasser 40');

    } else {

    }

    this.updatePtsCaractRestants()
  }

  selectedWeapon(): void {
    console.log(this.hero.idWeapon);
  }

  // Methode au clic sur le bouton "Retour"
  goBack(): void {
    this.location.back(); // Equivaut à cliquer sur le bouton "Précédent" du navigateur
  }

  // Méthode au clic sur le bouton "Save
  save(): void {
    console.log(this.hero);
    this.heroService.update(this.hero)  // Met à jour en BD à l'aide du HeroService
      .then(() => this.goBack());       // Une fois l'Hero mis à jour, on appelle la fonction goBack() (voir ci-dessus)
  }

  // Méthode pour mettre à jour le nombre de points de caractéristiques à attribuer
  updatePtsCaractRestants(): void {
    this.ptsCaractRestant = (HeroDetailsComponent.ptsCaractMax-(this.hero.pv + this.hero.degat + this.hero.attaque + this.hero.esquive));
  }

  // Méthode pour mettre à jour l'arme associée au hero
  changeHeroWeapon(id: number): void {
    this.hero.idWeapon = id;
  }

  showSnackbar(message: string): void {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerText = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
  }
}
