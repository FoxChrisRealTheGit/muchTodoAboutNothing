/* Angular imports */
import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";

/* import Services */

@Component({
  templateUrl: "./app-landing.component.html",
  styleUrls: ["./app-landing.component.scss"]
})
export class SingleTaskComponent {
  public constructor(private titleService: Title) {
    this.titleService.setTitle("Much :TODO About Nothing");
  }

}
