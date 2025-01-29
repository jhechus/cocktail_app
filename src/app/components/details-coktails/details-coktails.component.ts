import { CocktailService } from './../../services/cocktail.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs';
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

  ngOnInit() {
    /** Suscripción a los parámetros de la URL.

      - `this.activateRoute.params`: Observa los cambios en los parámetros de la ruta.
      - `pipe(first())`: Obtiene solo el primer valor y completa la suscripción.
      - `subscribe((params: Params) => {...})`: Captura el parámetro `id` de la URL.

      🔹 `id` será el identificador del cóctel seleccionado y se usará para cargar sus detalles. */
    this.activateRoute.params.pipe(first()).subscribe({
      next: (params: Params) => {
        const id = params['id']; // Extrae el ID de la URL
        console.log(id); // Muestra el ID en la consola (para prueba

        // Si hay un ID, busca el cóctel en la API
        this.cocktailService.getCocktailbyId(id).subscribe({
          next: (cocktail: ICocktail) => {
            this.cocktail = cocktail; // Almacena el cóctel obtenido
            console.log(cocktail);
          },
        });
      },
    });
  }
}
