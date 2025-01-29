import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IFilter } from '../models/filter.modeel';
import { first, map } from 'rxjs';
import { ICocktail } from '../models/cocktail.model';

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
      map((data: any) => this.parseDrinks(data))
    );
  }

  /** Procesa los datos de la API y extrae solo la información relevante.

  - `data['drinks']`: Extrae la lista de cócteles desde la API.
  - Se mapea cada objeto `drink` para extraer solo los campos requeridos.
  - Se utiliza `parseArray()` para obtener ingredientes y medidas correctamente.

  🔹 Este método filtra los datos antes de enviarlos al componente. */
  private parseDrinks(data: any) {
    if (!data) {
      return [];
    }
    const drinks = data['drinks'] as any[];
    if (!drinks) {
      return []; // Si no hay un id no muestra nada
    }
    return drinks.map((drink) => {
      return {
        id: drink['idDrink'],
        name: drink['strDrink'],
        glass: drink['srtGlass'],
        img: drink['strDrinkThumb'],
        instructions: drink['strInstructionsES'] || drink['strInstructions'],
        ingredients: this.parseArray(drink, 'strIngredient'),
        measures: this.parseArray(drink, 'strMeasure'),
      } as ICocktail;
    });
  }

  /** Extrae una lista de ingredientes o medidas desde la estructura de la API.

  - `Object.keys(drink)`: Obtiene todas las claves del objeto `drink`.
  - `filter(key => key.startsWith(property))`: Filtra las claves que inician con `strIngredient` o `strMeasure`.
  - `map(key => drink[key] as string)`: Obtiene el valor correspondiente.

  🔹 Se usa en `parseDrinks()` para obtener ingredientes y medidas antes de enviarlos al componente. */
  private parseArray(drink: any, property: string): string[] {
    return Object.keys(drink)
      .filter((key) => key.startsWith(property) && drink[key])
      .map((key) => drink[key] as string);
  }

  getCocktailbyId(id: string) {
    /**  Construye la URL con el ID del cóctel para la petición a la API.
    - Se usa `lookup.php?i=` para buscar un cóctel específico por su ID. */
    const additionalUrl = `lookup.php?i=${id}`;
    return this.http.get(this.URL_BASE + additionalUrl).pipe(
      first(),
      map((data: any) => {
        /**  Extrae la lista de cócteles de la respuesta de la API.
        - `data['drinks']` contiene la lista de resultados.
        - Si `drinks` es `null`, retorna `undefined` para manejar el caso de cóctel no encontrado. */
        const listCocktails = this.parseDrinks(data);
        return listCocktails[0];
      })
    );
  }
}
