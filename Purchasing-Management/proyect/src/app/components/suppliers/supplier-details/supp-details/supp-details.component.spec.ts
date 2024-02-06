import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppDetailsComponent } from './supp-details.component';

describe('SuppDetailsComponent', () => {
  let component: SuppDetailsComponent;
  let fixture: ComponentFixture<SuppDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuppDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
