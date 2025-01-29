import { Routes } from '@angular/router';

// Importamos los componentes que se utilizarán en las rutas
import { ListCoktailsComponent } from './components/list-coktails/list-coktails.component';
import { DetailsCoktailsComponent } from './components/details-coktails/details-coktails.component';

export const routes: Routes = [
  // Ruta para la lista de cócteles
  { path: 'list-cocktails', component: ListCoktailsComponent },

  // Ruta para los detalles de un cóctel específico
  // El ':id' indica un parámetro dinámico en la URL que representa el ID del cóctel
  { path: 'detail-cocktail/:id', component: DetailsCoktailsComponent },

  // Redirección para cualquier ruta desconocida
  // Si el usuario ingresa una URL que no existe, se lo redirige a 'list-cocktails'
  { path: '**', redirectTo: 'list-cocktails' },
];
