import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Should have 'dashboard works! in a paragraph`, () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('dashboard works!');
  });

  it(`Should have 3 tile rendered if isAdmin is true`, () => {
    const fixture = TestBed.createComponent(DashboardComponent);

    const app = fixture.componentInstance;
    app.isAdmin = true;

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.tile')?.length).toBe(3);
  })

  it(`Should have 2 tile rendered if isAdmin is false`, () => {
    const fixture = TestBed.createComponent(DashboardComponent);

    const app = fixture.componentInstance;
    app.isAdmin = false;

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.tile')?.length).toBe(2);
  })
});
