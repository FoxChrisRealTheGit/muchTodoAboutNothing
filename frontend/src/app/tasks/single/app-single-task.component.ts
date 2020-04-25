/* Angular imports */
import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";

/* import Services */

@Component({
  templateUrl: "./app-single-task.component.html",
  styleUrls: ["./app-single-task.component.scss"]
})
export class SingleTaskComponent {
  public constructor(private titleService: Title) {
    this.titleService.setTitle("Much :TODO About Nothing");
  }

}
