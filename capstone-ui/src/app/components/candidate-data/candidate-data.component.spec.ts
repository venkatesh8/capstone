import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDataComponent } from './candidate-data.component';

describe('CandidateDataComponent', () => {
  let component: CandidateDataComponent;
  let fixture: ComponentFixture<CandidateDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
