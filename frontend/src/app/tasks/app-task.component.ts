/* Angular imports */
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

/* import Services */
import { TaskService } from "../core/services/tasks/tasks.service";
import { PaginationService } from "../core/services/utility/system/pagination-service";


@Component({
  templateUrl: "./app-task.component.html",
  styleUrls: ["./app-task.component.scss"]
})
export class TaskComponent implements OnInit {
  math = Math;

  firstFormGroup: FormGroup;

  public constructor(
    private fb: FormBuilder,
    private titleService: Title,
    public taskService: TaskService,
    public paginationService: PaginationService
  ) {
    this.titleService.setTitle("Much :TODO About Nothing");
  }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      title: ["", Validators.required],
    });
  } // end of ngOnInit


  /* PUT OTHER METHODS HERE*/

} // end of class
