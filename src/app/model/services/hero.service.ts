/* hero.service.ts : Service jouant le role de DAO pour l'entité Hero */

///////////////////////////////////////////////////////////
// Imports
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Hero } from '../hero';

///////////////////////////////////////////////////////////
// Class du service
@Injectable()
export class HeroService {
  // Constructeur : Déclaration de d'attributs de classe PRIVES
  constructor(
    private http: Http
  ) { }

  // Déclaration de variables de classe PRIVES
  private heroesUrl = '../../api/heroes';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  // SELECT
  getHeroes(): Promise<Hero[]> {
    // Définition de la requête HTTP (SELECT * FROM hero;)
    const req = this.heroesUrl;

    // Exécution de la requête grâce à une promesse
    return this.http.get(req)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }  
  getHero(id: number): Promise<Hero> {
    // Définition de la requête HTTP (SELECT * FROM hero WHERE id={ id };)
    const req = `${this.heroesUrl}/${id}`;

    // Exécution de la requête grâce à une promesse
    return this.http.get(req)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  // CREATE
  create(name: string): Promise<Hero> {
    const req = this.heroesUrl;
    return this.http.post(req, JSON.stringify({name: name, pv: 10, degat: 10, attaque: 10, esquive: 10}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // UPDATE
  update(hero: Hero): Promise<Hero> {
    // Requête de récupération du hero (SELECT * FROM hero WHERE id={ hero.id };)
    const req = `${this.heroesUrl}/${hero.id}`;

    // Met a jour l'enregistrement de Hero récupéré avec le Hero reçu en paramètres
    return this.http.put(req, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  // DELETE
  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  // Fonction exécutée lorsqu'on rencontre une erreur dans les requêtes HTTP
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
  return Promise.reject(error.message || error);
  }
}
