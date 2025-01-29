/** * Interfaz para definir los criterios de filtrado de cócteles. */

export interface IFilter {
  /** * Propiedad que define el criterio de búsqueda (por nombre, categoría, ingrediente, etc.).*/
  searchBy: string;

  /*** Valor específico que se usará para filtrar los cócteles.   */
  value: string;
}
