import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCharacter } from './form-character';

describe('FormCharacter', () => {
  let component: FormCharacter;
  let fixture: ComponentFixture<FormCharacter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCharacter],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCharacter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
