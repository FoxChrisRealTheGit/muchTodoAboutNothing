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
import { APIResponse } from "../../interfaces/responses/response.model";

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
    return this.http.get<APIResponse>(`${ENVIRONMENT.apiUrl}/all-Tasks`).subscribe(data => {
      // this.allTasks = data.response;
    });
  } // end GetAllTasks


  /**
   * GET One Task by id
   * @param id : number - the id of the Task to get
   */
  FetchByID = (id: number) => {
    return this.http.get<APIResponse>(`${ENVIRONMENT.apiUrl}/Task/single/${id}`).subscribe(data => {
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
    console.log(this.allTasks);

    return this.http.post<APIResponse>(`${ENVIRONMENT.apiUrl}/Task`, FORMBODY).subscribe(data => {
      this.allTasks[0].ID = data.response.ID;
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
   * DELETE One Task
   * @param TaskID : number - the id of the Task
   */
  Delete = (TaskID: number, index): Observable<void> => {
    console.log(index)
    this.allTasks.splice(index, 1);
    this.snackBar.GeneralMessageSnack("Task has been deleted!");
    return this.http.delete<void>(`${ENVIRONMENT.apiUrl}/task/${TaskID}`);
  } // end of DeleteTask

  /* PUT OTHER METHODS HERE */

} // end of Service
