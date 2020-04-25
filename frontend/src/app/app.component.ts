/* Angular imports */
import { Component } from "@angular/core";
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel
} from "@angular/router";
import { MatDialog } from "@angular/material";
/* Service imports */
import { PageLoadService } from "./core/services/utility/system/global-loading.service";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public loadService: PageLoadService) {

    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  } // end of constructor

  /**
   * Check if router is loading and if should show loading splash screen or not
   * @param routerEvent - the Evenet from router
   */
  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loadService.loading = true;
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loadService.loading = false;
    }
  } // end of checkRouterEvent

  /* Add More Methods Here */
} // end of class
