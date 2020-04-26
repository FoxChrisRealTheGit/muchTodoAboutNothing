/* Angular imports */
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
/* Service imports */

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent  {
  constructor(private router: Router) {
  }

} // end of HeaderComponent class
