import { CocktailService } from './../../services/cocktail.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { first, switchMap } from 'rxjs';
import { ICocktail } from '../../models/cocktail.model';

@Component({
  selector: 'app-details-coktails',
  imports: [],
  templateUrl: './details-coktails.component.html',
  styleUrl: './details-coktails.component.scss',
})
export class DetailsCoktailsComponent {
  /** Inyección del servicio `ActivatedRoute` para obtener los parámetros de la URL.
    - `ActivatedRoute` proviene de `@angular/router`.
    - Se usa `inject(ActivatedRoute)` en lugar del constructor para mayor eficiencia.
    - Permite capturar el parámetro `id` que identifica el cóctel seleccionado.*/
  private activateRoute = inject(ActivatedRoute);

  /** Inyección del servicio `CocktailService` para obtener los datos del cóctel.
    - `CocktailService` proviene de `src/app/services/cocktail.service.ts`.
    - Se usa para realizar la petición a la API y obtener los detalles del cóctel. */
  private cocktailService = inject(CocktailService);

  /** Variable donde se almacenará el cóctel obtenido de la API.
    - Se usa en `details-coktails.component.html` para mostrar los detalles.
    - Si no se encuentra el cóctel, quedará `undefined`.*/
  public cocktail!: ICocktail;

  /** Variable que controla la visibilidad del `spinner` de carga en la vista de detalles.
  - Se inicializa en `false` para que el `spinner` se muestre mientras se obtiene la información.
  - Se cambia a `true` cuando la petición finaliza, permitiendo mostrar los datos del cóctel.
  - Se usa en `details-coktails.component.html` con `@if (loadCocktail)` para mostrar u ocultar el contenido. */
  public loadCocktail: boolean = false;

  ngOnInit() {
    /** Suscripción a los parámetros de la URL para obtener el ID del cóctel.

    🔹 `this.activateRoute.params` → Escucha los cambios en los parámetros de la ruta.
    🔹 `pipe(first())` → Obtiene solo el primer valor y completa la suscripción.
    🔹 `switchMap((params: Params) => {...})` → Toma el `id` y lo usa para hacer otra petición a la API.
    🔹 `subscribe((cocktail: ICocktail) => {...})` → Recibe el cóctel y lo almacena en la variable `cocktail`. */
    this.activateRoute.params
      .pipe(
        first(), // Solo toma el primer valor y finaliza la suscripción.
        switchMap((params: Params) => {
          const id = params['id']; // Extrae el ID de la URL
          console.log(id); // Muestra el ID en la consola (para depuracion)
          return this.cocktailService.getCocktailbyId(id); // Llama al servicio con el ID y devuelve un nuevo observable.
        })
      )
      .subscribe({
        next: (cocktail: ICocktail) => {
          this.cocktail = cocktail; // Almacena el cóctel obtenido.
          console.log(cocktail); // Muestra los datos en la consola (para depuración).
        },
        complete: () => {
          this.loadCocktail = true; // Oculta el spinner cuando la carga termina.
        },
      });
  }
}
