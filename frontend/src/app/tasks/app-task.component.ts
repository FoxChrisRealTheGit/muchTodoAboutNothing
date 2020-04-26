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
      title: ["", [Validators.required, Validators.maxLength(64)]],
    });

    this.taskService.GetAll();
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
  onHandleDelete(id, index) {
    this.taskService.Delete(id, index);
  } // end of onHandleSubmit


  /**
   *
   * @param id - the id of the task to complete
   */
  onHandleComplete(id, index) {
    if (this.paginationService.page > 1) {
      index += (10 * (this.paginationService.page - 1));
    }
    if (this.taskService.allTasks[index].done) {
      return;
    }

    this.taskService.MarkDone(id, index);
  } // end of onHandleComplete


  /**
   *
   * @param id - the ide of the task to edit
   */
  onHandleEdit(task, i) {
    if (this.paginationService.page > 1) {
      i += (10 * (this.paginationService.page - 1));
    }
    this.taskService.index = i;
    this.taskService.singleTask = task;
  } // end of onHandleComplete
  /* PUT OTHER METHODS HERE*/

} // end of class
