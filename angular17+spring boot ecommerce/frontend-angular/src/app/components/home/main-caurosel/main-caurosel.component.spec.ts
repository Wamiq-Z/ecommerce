import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCauroselComponent } from './main-caurosel.component';

describe('MainCauroselComponent', () => {
  let component: MainCauroselComponent;
  let fixture: ComponentFixture<MainCauroselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCauroselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCauroselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
