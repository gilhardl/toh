/* hero-search.component.ts : Composant pour la recherche de Hero */

///////////////////////////////////////////////////////////
// Imports
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
  // Observable class extensions
import 'rxjs/add/observable/of';
  // Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from '../model/services/hero-search.service';
import { Hero } from '../model/hero';

///////////////////////////////////////////////////////////
// Définition du composant
@Component({
  moduleId: module.id,
  selector: 'hero-search',
  templateUrl: '../view/hero-search.component.html',
  styleUrls: ['../static/css/toh.css'],
  providers: [HeroSearchService]
})

///////////////////////////////////////////////////////////
// Class du composant
export class HeroSearchComponent implements OnInit {

  // Constructeur : Déclaration des données applicatives
  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router
  ) {}

  // Déclaration des données du composant
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();   // Un Subject est un producteur de flux evenementiel d'Observables - searchTerms produit donc des Observables de string


  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.heroSearchService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Hero[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }


  // Methode au KeyUp dans le champ de saisie de recherche
  search(term: string): void {
    this.searchTerms.next(term);  // Met une nouvelle string dans le flux de le flux d'Observables du Subject searchTerm
  }

  // Méthode au clic sur un résultat de la recherche
  gotoDetail(hero: Hero): void {
    let link = ['/details', hero.id];
    this.router.navigate(link);
  }
}
