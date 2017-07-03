/* weapon-details.component.ts : Composant pour la fiche d'une arme de l'application */

///////////////////////////////////////////////////////////
// Imports
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { WeaponService } from '../model/services/weapon.service';
import { Weapon } from "../model/weapon";

///////////////////////////////////////////////////////////
// Définition du composant
@Component({
  moduleId: module.id,
  selector: 'weapon-detail',
  styleUrls: ['../static/css/toh.css'],
  templateUrl: '../view/weapon-details.component.html'
})

///////////////////////////////////////////////////////////
// Class du composant
export class WeaponDetailsComponent implements OnInit {

  // Constructeur : Déclaration des données applicatives
  constructor(
    private weaponService: WeaponService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  // Déclaration des données du composant
  weapon: Weapon;
  caractOK: boolean;


  // Initialisation
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.weaponService.getWeapon(+params['id']))
      .subscribe((weapon: Weapon) => {
        this.weapon = weapon
      });
  }

  // Methode au onChange dans les champs de saisie des caractéristiques
  validateCaract(): void {
    var total = this.weapon.pv + this.weapon.degat + this.weapon.attaque + this.weapon.esquive;

    if (total != 0){
      this.caractOK = false;
      this.showSnackbar('La somme des caractéristiques de votre arme doit être à 0');

    } else {
      this.caractOK = true;
    }
  }

  // Methode au clic sur le bouton "Retour"
  goBack(): void {
    this.location.back(); // Equivaut à cliquer sur le bouton "Précédent" du navigateur
  }

  // Méthode au clic sur le bouton "Save
  save(): void {
    this.weaponService.update(this.weapon)  // Met à jour en BD à l'aide du WeaponService
      .then(() => this.goBack());       // Une fois l'arme mise à jour, on appelle la fonction goBack() (voir ci-dessus)
  }

  showSnackbar(message: string): void {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerText = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
  }
}
