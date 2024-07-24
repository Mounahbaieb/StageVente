import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MondalLivreurComponent } from './mondal-livreur.component';

describe('MondalLivreurComponent', () => {
  let component: MondalLivreurComponent;
  let fixture: ComponentFixture<MondalLivreurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MondalLivreurComponent]
    });
    fixture = TestBed.createComponent(MondalLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
