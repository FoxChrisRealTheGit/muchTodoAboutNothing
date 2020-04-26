/* Angular imports */
import { Injectable } from "@angular/core";
import {
  HttpClient,
} from "@angular/common/http";
import { Observable } from "rxjs";
/* Service imports */
import { SnackbarService } from "../snackbar/snackbar.service";
import { FormMakerService } from "../utility/system/form-maker.service";
/* Interface imports */
import { ITask } from "../../interfaces/task/task.model";
import { APIResponse, APIListResponse } from "../../interfaces/responses/response.model";

/* Environment import */
import { ENVIRONMENT } from "../../../../environments/environment";

/**
 * Service used for Tasks and Task related stuff
 */
@Injectable()
export class TaskService {
  allTasks = [];      // global storage item for all of the Tasks

  singleTask;         // global storage for a single Task


  constructor(
    private http: HttpClient,
    private snackBar: SnackbarService,
    private formmaker: FormMakerService
  ) { }


  /**
   * GET all Tasks
   *  it gets all Tasks
   */
  GetAll = () => {
    return this.http.get<APIListResponse>(`${ENVIRONMENT.apiUrl}/tasks`).subscribe(data => {
      this.allTasks = data.response;
    });
  } // end GetAllTasks


  /**
   * GET One Task by id
   * @param id : number - the id of the Task to get
   */
  FetchByID = (id: number) => {
    return this.http.get<APIResponse>(`${ENVIRONMENT.apiUrl}/task/${id}`).subscribe(data => {
      this.singleTask = data.response;
    });
  } // end GetTaskByID

  /**
   * POST One Task
   * @param newTask - the Task to post
   */
  Create = (newTask) => {
    // make the body so the backend can parse
    const FORMBODY = this.formmaker.makeForm(newTask);
    this.allTasks.unshift(newTask);
    console.log(FORMBODY)
    return this.http.post<APIResponse>(`${ENVIRONMENT.apiUrl}/task`, FORMBODY, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    }).subscribe(data => {
      console.log(data);
      this.allTasks[0].id = data.response.id;
      this.snackBar.GeneralMessageSnack("Successfully made task!");
    });
  } // end of PostTask


  /**
   * PUT One Task
   * @param id - the id of the Task
   * @param Task - the Task
   */
  Update = (id, Task): Observable<void> => {
    this.snackBar.GeneralMessageSnack("Task has been edited!");
    return this.http.put<void>(`${ENVIRONMENT.apiUrl}/task/${id}`, Task);
  } // end of PutTask
  /**
   * Mark the task as done
   * @param TaskID : number - the id of the Task
   */
  MarkDone = (TaskID, index) => {
    this.allTasks[index].done = true;
    this.snackBar.GeneralMessageSnack("Task has marked as done!");
    return this.http.put(`${ENVIRONMENT.apiUrl}/task/done/${TaskID}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    }).subscribe();
  } // end of DeleteTask

  /**
   * DELETE One Task
   * @param TaskID : number - the id of the Task
   */
  Delete = (TaskID, index) => {
    this.allTasks.splice(index, 1);
    this.snackBar.GeneralMessageSnack("Task has been deleted!");
    return this.http.delete(`${ENVIRONMENT.apiUrl}/task/${TaskID}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    }).subscribe();
  } // end of DeleteTask

  /* PUT OTHER METHODS HERE */

} // end of Service
