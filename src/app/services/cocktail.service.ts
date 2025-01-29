import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

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
}
