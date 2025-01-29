import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoktailsComponent } from './list-coktails.component';

describe('ListCoktailsComponent', () => {
  let component: ListCoktailsComponent;
  let fixture: ComponentFixture<ListCoktailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCoktailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCoktailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
