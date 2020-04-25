/* Angular imports */
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
/* Service imports */
import { AuthService } from "../../../core/services/auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {
  }

  ngOnInit() { }

  /**
   * Handles user logout and redirects to auth screen
   */
  onHandleLogout() {
    // first check if there is a user
    if (this.auth.isAuthenticated) {
      // run logout command from service
      this.auth.logoutUser();
      // redirect
      this.router.navigate(["/login"]);
    }
    // if no user, do nothing
  } // end of onHandleLogout
} // end of HeaderComponent class
