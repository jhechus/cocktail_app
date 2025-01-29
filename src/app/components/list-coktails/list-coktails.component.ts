import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-coktails',
  imports: [FormsModule],
  templateUrl: './list-coktails.component.html',
  styleUrl: './list-coktails.component.scss',
})
export class ListCoktailsComponent {
  filterData() {}
}
