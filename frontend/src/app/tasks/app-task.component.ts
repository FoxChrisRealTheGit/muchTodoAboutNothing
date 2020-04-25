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
      title: ["", [Validators.required, Validators.maxLength(75)]],
    });
  } // end of ngOnInit

  /**
   *
   */
  onHandleSubmit() {
    const INPUT = {
      title: this.firstFormGroup.value.title
    };
    this.taskService.Create(INPUT);
    this.firstFormGroup.reset();
  } // end of onHandleSubmit

  /**
   *
   * @param index - the index of the item to delete
   */
  onHandleDelete(task, index) {
    this.taskService.Delete(task, index);
  } // end of onHandleSubmit
  /* PUT OTHER METHODS HERE*/

} // end of class
