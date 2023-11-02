import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoomVoteComponent } from './create-room-vote.component';

describe('CreateRoomVoteComponent', () => {
  let component: CreateRoomVoteComponent;
  let fixture: ComponentFixture<CreateRoomVoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRoomVoteComponent]
    });
    fixture = TestBed.createComponent(CreateRoomVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
