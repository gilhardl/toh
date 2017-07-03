/* weapons.component.ts : Composant pour la liste des armes */

///////////////////////////////////////////////////////////
// Imports
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Weapon } from '../model/weapon';
import { WeaponService } from '../model/services/weapon.service';

///////////////////////////////////////////////////////////
// Définition du composant
@Component({
  moduleId: module.id,
  selector: 'my-weapons',
  templateUrl: '../view/weapons.component.html',
  styleUrls: ['../static/css/toh.css'],
  providers: [WeaponService]
})

///////////////////////////////////////////////////////////
// Class du composant
export class WeaponsComponent implements OnInit {

  // Constructeur : Déclaration des données applicatives
  constructor(
    private router: Router,
    private weaponService: WeaponService
  ) { }

  // Déclaration des données du composant
  weapons : Weapon[];
  selectedWeapon : Weapon;


  // Initialisation
  ngOnInit(): void {
    this.getWeapons();
  }

  sortWeapons(filter): void {
    this.weapons.sort(function(a, b){
       return a[filter] - b[filter];
   });
  }

  // Fonction de sélection d'un héro
  onSelect(weapon: Weapon): void {
    this.selectedWeapon = weapon;
  }

  // Fonction de récupération des armes
  getWeapons(): void {
    this.weaponService.getWeapons()
      .then(weapons => this.weapons = weapons);
  }

  // Fonction pour afficher les détails d'une arme
  gotoDetails(): void {
    this.router.navigate(['/weapon', this.selectedWeapon.id]);
  }

  // Fonction pour ajouter une arme
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.weaponService.create(name)
      .then(hero => {
        this.weapons.push(hero);
        this.selectedWeapon = null;
      });
  }

  // Fonction pour supprimer une arme
  delete(weapon: Weapon): void {
    this.weaponService.delete(weapon.id)
      .then(() => {
        this.weapons = this.weapons.filter(h => h !== weapon);
        if (this.selectedWeapon === weapon) {
          this.selectedWeapon = null;
        }
      });
  }
}
