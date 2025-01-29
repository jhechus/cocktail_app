import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs';

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
      },
    });
  }
}
