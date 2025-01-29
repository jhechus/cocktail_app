/**
 * Interfaz que define la estructura de un cóctel.
🔹 Este modelo será utilizado en los servicios y componentes para manejar los datos de los cócteles.
 */

export interface ICocktail {
  id: string; // Identificador único del cóctel
  name: string; // Nombre del cóctel
  img: string; // URL de la imagen del cóctel
  glass: string; // Tipo de vaso recomendado para servir el cóctel
  ingredients: string[]; // Lista de ingredientes utilizados
  instructions: string; // Instrucciones de preparación
  measures: string[]; // Cantidad de cada ingrediente en la receta
}
