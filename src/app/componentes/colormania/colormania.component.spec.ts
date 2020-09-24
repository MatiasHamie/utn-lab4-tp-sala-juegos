import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColormaniaComponent } from './colormania.component';

describe('ColormaniaComponent', () => {
  let component: ColormaniaComponent;
  let fixture: ComponentFixture<ColormaniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColormaniaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColormaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
