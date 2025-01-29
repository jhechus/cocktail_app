import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IFilter } from '../../models/filter.modeel';

@Component({
  selector: 'app-list-coktails',
  imports: [FormsModule],
  templateUrl: './list-coktails.component.html',
  styleUrl: './list-coktails.component.scss',
})
export class ListCoktailsComponent {
  /**
   * Objeto que almacena los criterios de filtrado seleccionados por el usuario.
   *
   * - `searchBy`: Define el criterio de búsqueda (nombre, vaso, ingrediente o categoría).
   * - `value`: Es el valor que el usuario ingresa en el campo de texto.
   *
   * 🔹 Estos datos se enlazan dinámicamente en el formulario (`list-coktails.component.html`).
   *    - `[(ngModel)]="filter.searchBy"` en el `<select>` para seleccionar el criterio.
   *    - `[(ngModel)]="filter.value"` en el `<input>` para capturar el valor de búsqueda.
   */

  public filter: IFilter = {
    searchBy: 'name', // Criterio de búsqueda por defecto
    value: '', // Valor ingresado por el usuario
  };

  /**
   * Método que se ejecuta cuando el usuario envía el formulario de filtrado.
   * - Es llamado desde `(ngSubmit)="filterData()"` en el `<form>`.
   * - Actualmente solo imprime los valores en la consola.
   * - En el futuro, puede conectarse a un servicio para buscar cócteles.
   */

  filterData() {
    console.log(this.filter);
  }
}
