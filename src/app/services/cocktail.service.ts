import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IFilter } from '../models/filter.modeel';
import { first, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  /** URL base de la API de TheCocktailDB.
    Se usará para construir las peticiones HTTP dinámicamente. */
  private URL_BASE = 'https://www.thecocktaildb.com/api/json/v1/1/';

  /** HTTPClient para realizar peticiones a la API.
    Se inyecta automáticamente mediante `inject(HttpClient)`. */
  private http = inject(HttpClient);

  /** Obtiene una lista de cócteles filtrados según el criterio seleccionado.

    - Recibe un objeto `IFilter` con los valores ingresados en el formulario.
    - Construye la URL dinámica en base al criterio (`searchBy`) y el valor (`value`).
    - Realiza una petición HTTP GET a la API y devuelve la respuesta.

    🔹 Este método será utilizado en `ListCoktailsComponent` para mostrar los resultados. */
  getCocktails(filter: IFilter) {
    let additionalUrl = ''; // Variable para almacenar el endpoint específico según el filtro seleccionado

    // Determina la ruta de la API según el criterio de búsqueda seleccionado
    if (filter.searchBy == 'name') {
      additionalUrl = 'search.php?s='; // Búsqueda por nombre
    } else {
      additionalUrl = 'filter.php?'; // Filtros por tipo de vaso, categoría o ingrediente
      if (filter.searchBy == 'glass') {
        additionalUrl += 'g=';
      } else if (filter.searchBy == 'category') {
        additionalUrl += 'c=';
      } else {
        additionalUrl += 'i='; // Por defecto, se asume búsqueda por ingrediente
      }
    }

    // Agrega el valor ingresado por el usuario a la URL
    additionalUrl += filter.value;

    /** Petición HTTP GET a la API con la URL construida.
    - `first()` toma solo la primera respuesta y completa la suscripción.
    - `map(data => data)` transforma la respuesta antes de enviarla al componente. */
    return this.http.get(this.URL_BASE + additionalUrl).pipe(
      first(),
      map((data: any) => data)
    );
  }
}
