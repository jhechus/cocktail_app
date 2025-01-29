import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCoktailsComponent } from './details-coktails.component';

describe('DetailsCoktailsComponent', () => {
  let component: DetailsCoktailsComponent;
  let fixture: ComponentFixture<DetailsCoktailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCoktailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCoktailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
