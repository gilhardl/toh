/* app.component.ts : Composant de base de l'application */

///////////////////////////////////////////////////////////
// Imports
import { Component } from '@angular/core';

///////////////////////////////////////////////////////////
// Définition du composant
@Component({
  moduleId: module.id,
  selector: 'toh',                            // Sélecteur (identifiant) du composant
  templateUrl: '../view/app.component.html',  // Vue associée au composant
  styleUrls: ['../static/css/toh.css']        // Style appliqué au composant
})

///////////////////////////////////////////////////////////
// Class du composant
export class AppComponent {
  pageTitle = 'Tour of Heroes';
}
