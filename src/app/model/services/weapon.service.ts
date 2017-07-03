/* weapon.service.ts : Service jouant le role de DAO pour l'entité Weapon */

///////////////////////////////////////////////////////////
// Imports
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Weapon } from '../weapon';

///////////////////////////////////////////////////////////
// Class du service
@Injectable()
export class WeaponService {
  // Constructeur : Déclaration des données applicatives
  constructor(
    private http: Http
  ) { }

  // Constructeur : Déclaration des données du service
  private weaponsUrl = '../../api/weapons';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  // SELECT
  getWeapons(): Promise<Weapon[]> {
    // Définition de la requête HTTP (SELECT * FROM hero;)
    const req = this.weaponsUrl;

    // Exécution de la requête grâce à une promesse
    return this.http.get(req)
      .toPromise()
      .then(response => response.json().data as Weapon[])
      .catch(this.handleError);
  }
  getWeapon(id: number): Promise<Weapon> {
    // Définition de la requête HTTP (SELECT * FROM hero WHERE id={ id };)
    const req = `${this.weaponsUrl}/${id}`;

    // Exécution de la requête grâce à une promesse
    return this.http.get(req)
      .toPromise()
      .then(response => response.json().data as Weapon)
      .catch(this.handleError);
  }

  // CREATE
  create(name: string): Promise<Weapon> {
    const req = this.weaponsUrl;
    return this.http.post(req, JSON.stringify({name: name, pv: 0, degat: 0, attaque: 0, esquive: 0}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // UPDATE
  update(weapon: Weapon): Promise<Weapon> {
    // Requête de récupération du weapon (SELECT * FROM hero WHERE id={ hero.id };)
    const req = `${this.weaponsUrl}/${weapon.id}`;

    // Met a jour l'enregistrement de Hero récupéré avec le Hero reçu en paramètres
    return this.http.put(req, JSON.stringify(weapon), {headers: this.headers})
      .toPromise()
      .then(() => weapon)
      .catch(this.handleError);
  }

  // DELETE
  delete(id: number): Promise<void> {
    const url = `${this.weaponsUrl}/${id}`;
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
