/* Angular imports */
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";

/* import Services */
import { TaskService } from "../../core/services/tasks/tasks.service";

@Component({
  templateUrl: "./app-single-task.component.html",
  styleUrls: ["./app-single-task.component.scss"]
})
export class SingleTaskComponent implements OnInit {

  firstFormGroup: FormGroup;

  public constructor(
    private fb: FormBuilder,
    private titleService: Title,
    public taskService: TaskService
  ) {
    this.titleService.setTitle("Much :TODO About Nothing");
  }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      title: [this.taskService.singleTask.title, [Validators.required, Validators.maxLength(64)]],
      info: [this.taskService.singleTask.info, Validators.maxLength(1024)]
    });

  }

  /**
   *
   */
  onHandleUpdate() {
    const UTASK = {
      id: this.taskService.singleTask.id,
      title: this.firstFormGroup.value.title,
      info: this.firstFormGroup.value.info
    };
    this.taskService.Update(this.taskService.singleTask.id, UTASK);
  } // end of onHandleUpdate

  /* PUT OTHER METHODS HERE */
} // end class
