/* Angular imports */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

/* Service imports */

/* Module imports */
import { AppModule } from "../app.module";
/* Component imports */
import { TaskComponent } from "./index";

describe("TaskComponent", () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [AppModule],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have as title 'Much :TODO About Nothing'", () => {
    fixture = TestBed.createComponent(TaskComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.titleService.getTitle()).toEqual(
      "Much :TODO About Nothing"
    );
  });
});
