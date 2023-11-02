import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVotingFormComponent } from './create-voting-form.component';

describe('CreateVotingFormComponent', () => {
  let component: CreateVotingFormComponent;
  let fixture: ComponentFixture<CreateVotingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateVotingFormComponent]
    });
    fixture = TestBed.createComponent(CreateVotingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
