import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetsFormComponent } from './datasets-form.component';

describe('DatasetsFormComponent', () => {
  let component: DatasetsFormComponent;
  let fixture: ComponentFixture<DatasetsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
