/* Angular imports */
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  currentYear: number;
  constructor() {}

  ngOnInit() {
    // sets currentYear to the currentYear
    this.currentYear = new Date().getFullYear();
  } // end of ngOnInit
} // end of class
