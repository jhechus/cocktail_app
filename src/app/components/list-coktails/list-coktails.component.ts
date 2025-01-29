import { CocktailService } from './../../services/cocktail.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IFilter } from '../../models/filter.modeel';
import { ICocktail } from '../../models/cocktail.model';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list-coktails',
  imports: [FormsModule, RouterLink, NgxPaginationModule],
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

  /** Lista donde se almacenarán los cócteles obtenidos de la API.
    🔹 Se usa en `list-coktails.component.html` para mostrar los resultados dinámicamente.  */
  public ListCoktails: ICocktail[] = [];

  /** Variable que indica si el usuario ha realizado una búsqueda.
  - Se inicializa en `false` para mostrar el mensaje de bienvenida.
  - Se cambia a `true` cuando el usuario envía un filtro.
  - Se usa en `list-coktails.component.html` para mostrar mensajes dinámicos.*/
  public searched: boolean = false;

  /** Variable que controla la visibilidad del spinner de carga.
  - Se inicializa en `true` para mostrar el loader por defecto.
  - Se cambia a `false` al iniciar la búsqueda y vuelve a `true` al finalizar.
  - Se usa en `list-coktails.component.html` para mostrar un indicador de carga.*/
  public loadCocktails: boolean = true;

  /**  Variable que almacena la página actual en la paginación.
  - Se inicializa en `1` para empezar desde la primera página.
  - Se actualiza dinámicamente cuando el usuario cambia de página.
  - Se usa en `list-coktails.component.html` dentro del componente de paginación.

  Cantidad de elementos que se mostrarán por página.
  - Se inicializa en `12`, pero puede modificarse según necesidades.
  - Se usa en `list-coktails.component.html` para calcular si se muestra la paginación. */
  public currentPage = 1;
  public itemsPerPage = 12;

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

  /* * Método que se ejecuta cuando el usuario envía el formulario de filtrado.

  - Es llamado desde `(ngSubmit)="filterData()"` en el `<form>`.
  - Envía los valores de `filter` al servicio `CocktailService.getCocktails()`.
  - Recibe los datos procesados y los almacena en `cocktails` para mostrarlos en la interfaz. */
  filterData() {
    console.log(this.filter); // Muestra los valores ingresados en el formulario
    this.searched = true; // Indica que se realizó una búsqueda
    this.loadCocktails = false; // Muestra el spinner de carga
    this.CocktailService.getCocktails(this.filter).subscribe({
      next: (ListCoktails: ICocktail[]) => {
        this.ListCoktails = ListCoktails; // Guarda los datos en la lista para mostrarlos en el HTML
      },
      error: (error) => {
        console.error(error); // Muestra el error en caso de fallo en la petición
      },
      complete: () => {
        this.loadCocktails = true; // Oculta el spinner cuando se completa la carga
      },
    });
  }

  /** Método que se ejecuta cuando el usuario cambia de página en la paginación.
    - Recibe el número de la nueva página como parámetro.
    - Actualiza `currentPage` con el nuevo valor.
    - Se enlaza en `list-coktails.component.html` al evento `(pageChange)`. */
  pageChange(page: number) {
    this.currentPage = page;
  }
}
