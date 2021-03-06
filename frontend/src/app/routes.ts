/* Angular imports */
import { Routes } from "@angular/router";

/* Component imports */
import { TaskComponent, SingleTaskComponent } from "./tasks/index";

/* Guard imports */

export const APPROUTES: Routes = [
  { path: "", component: TaskComponent },
  { path: "task", component: TaskComponent },
  { path: "task/:id", component: SingleTaskComponent }
]; // end of APPROUTES

