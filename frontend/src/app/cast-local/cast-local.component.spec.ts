import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastLocalComponent } from './cast-local.component';

describe('CastLocalComponent', () => {
  let component: CastLocalComponent;
  let fixture: ComponentFixture<CastLocalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CastLocalComponent]
    });
    fixture = TestBed.createComponent(CastLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
