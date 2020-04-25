/* Angular imports */
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ExtraOptions } from "@angular/router";
/* Route imports */
import { APPROUTES } from "./routes";


const routerOptions: ExtraOptions = {
  useHash: true,
  scrollPositionRestoration: "enabled",
  anchorScrolling: "enabled",
  // onSameUrlNavigation: 'reload'
  // enableTracing = true
  // ...any other options you'd like to use
};

@NgModule({
  imports: [
    RouterModule.forRoot(APPROUTES, routerOptions)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
