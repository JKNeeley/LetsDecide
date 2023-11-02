import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDraftedVoteComponent } from './edit-drafted-vote.component';

describe('EditDraftedVoteComponent', () => {
  let component: EditDraftedVoteComponent;
  let fixture: ComponentFixture<EditDraftedVoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDraftedVoteComponent]
    });
    fixture = TestBed.createComponent(EditDraftedVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
