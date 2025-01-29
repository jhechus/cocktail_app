import { CocktailService } from './../../services/cocktail.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IFilter } from '../../models/filter.modeel';

@Component({
  selector: 'app-list-coktails',
  imports: [FormsModule],
  templateUrl: './list-coktails.component.html',
  styleUrl: './list-coktails.component.scss',
})
export class ListCoktailsComponent {
  /** Inyección del servicio `CocktailService` en el componente.

  - `CocktailService` proviene de `src/app/services/cocktail.service.ts`.
  - Se usa `inject(CocktailService)` para obtener la instancia del servicio sin constructor.
  - Este servicio se conecta a la API de cócteles y obtiene los datos según los filtros aplicados.

  🔹 Los datos obtenidos se enviarán a `filterData()` para ser procesados y luego
    serán almacenados en una lista para mostrarlos en `list-coktails.component.html`. */
  private CocktailService = inject(CocktailService);

  /** Objeto que almacena los criterios de filtrado seleccionados por el usuario.

    - `searchBy`: Define el criterio de búsqueda (nombre, vaso, ingrediente o categoría).
    - `value`: Es el valor que el usuario ingresa en el campo de texto.

    🔹 Estos datos se enlazan dinámicamente en el formulario (`list-coktails.component.html`).
      - `[(ngModel)]="filter.searchBy"` en el `<select>` para seleccionar el criterio.
      - `[(ngModel)]="filter.value"` en el `<input>` para capturar el valor de búsqueda. */
  public filter: IFilter = {
    searchBy: 'name', // Criterio de búsqueda por defecto
    value: '', // Valor ingresado por el usuario
  };

  /** Método que se ejecuta cuando el usuario envía el formulario de filtrado.

    - Es llamado desde `(ngSubmit)="filterData()"` en el `<form>`.
    - Envía los valores de `filter` al servicio `CocktailService.getCocktails()`.
    - Recibe los resultados y los imprime en la consola.*/

  filterData() {
    console.log(this.filter); // Muestra los valores ingresados en el formulario
    this.CocktailService.getCocktails(this.filter).subscribe({
      next: (data: any) => {
        console.log(data); // Imprime la respuesta de la API en la consola
      },
      error: (error) => {
        console.error(error); // Muestra el error en caso de fallo en la petición
      },
      complete: () => {},
    });
  }
}
