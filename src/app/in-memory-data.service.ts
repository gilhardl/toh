/* in-memory-data.service.ts : Service jouant le role de BD (on n'a pas vraiment à faire à une BD, mais à une BD en mémoire cache */

///////////////////////////////////////////////////////////
// Imports
import { InMemoryDbService } from 'angular-in-memory-web-api';

///////////////////////////////////////////////////////////
// Class du service
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      {id: 1, name: 'Mr. Nice', pv: 15, degat: 5, attaque: 15, esquive: 5, idWeapon: 1},
      {id: 2, name: 'Narco', pv: 5, degat: 10, attaque: 15, esquive: 5, idWeapon: 2},
      {id: 3, name: 'Bombasto', pv: 10, degat: 10, attaque: 15, esquive: 5, idWeapon: 3},
      {id: 4, name: 'Celeritas', pv: 15, degat: 15, attaque: 9, esquive: 1, idWeapon: 4},
      {id: 5, name: 'Magneta', pv: 5, degat: 10, attaque: 15, esquive: 5, idWeapon: 2},
      {id: 6, name: 'RubberMan', pv: 10, degat: 5, attaque: 15, esquive: 5, idWeapon: 4},
      {id: 7, name: 'Dynama', pv: 15, degat: 15, attaque: 5, esquive: 5, idWeapon: 5},
      {id: 8, name: 'Dr IQ', pv: 5, degat: 10, attaque: 10, esquive: 15, idWeapon: 8},
      {id: 9, name: 'Magma', pv: 10, degat: 5, attaque: 15, esquive: 5, idWeapon: 3},
      {id: 10, name: 'Tornado', pv: 15, degat: 5, attaque: 10, esquive: 10, idWeapon: 2}
    ];
    let weapons = [
      {id: 1, name: 'Tronconeuse', pv: 5, degat: -5, attaque: -2, esquive: 2},
      {id: 2, name: '9mm', pv: 3, degat: -3, attaque: -2, esquive: 2},
      {id: 3, name: 'AK 99', pv: 5, degat: -4, attaque: -3, esquive: 2},
      {id: 4, name: 'Minigun', pv: 5, degat: -4, attaque: -3, esquive: 2},
      {id: 5, name: 'Hache', pv: 5, degat: -4, attaque: -3, esquive: 2},
      {id: 6, name: 'Couteau', pv: 5, degat: -4, attaque: -3, esquive: 2},
      {id: 7, name: 'Bazooka', pv: 5, degat: -4, attaque: -3, esquive: 2},
      {id: 8, name: 'Lance patate', pv: 5, degat: -4, attaque: -3, esquive: 2},
      {id: 9, name: 'Arc', pv: 5, degat: -4, attaque: -3, esquive: 2}
    ];
    return {heroes, weapons};
  }
}
