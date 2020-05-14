import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaeaderComponent } from './haeader.component';

describe('HaeaderComponent', () => {
  let component: HaeaderComponent;
  let fixture: ComponentFixture<HaeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
