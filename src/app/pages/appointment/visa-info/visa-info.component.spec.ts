import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaInfoComponent } from './visa-info.component';

describe('VisaInfoComponent', () => {
  let component: VisaInfoComponent;
  let fixture: ComponentFixture<VisaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisaInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VisaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
