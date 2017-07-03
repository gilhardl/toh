/* hero-search.service.ts : Service pour la recherche de hero */

///////////////////////////////////////////////////////////
// Imports
import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hero }           from '../hero';

///////////////////////////////////////////////////////////
// Class du service
@Injectable()
export class HeroSearchService {
  // Constructeur : Déclaration de d'attributs de classe PRIVES
  constructor(
    private http: Http
  ) { }

  // Déclaration des variables de classe PRIVES
  private heroesUrl = 'api/heroes';  // URL to web api

  search(term: string): Observable<Hero[]> {
    return this.http
      .get(`app/heroes/?name=${term}`)
      .map(response => response.json().data as Hero[]);
  }
}
