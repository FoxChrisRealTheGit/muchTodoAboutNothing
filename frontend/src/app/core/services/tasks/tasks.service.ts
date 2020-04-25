/* Angular imports */
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
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
  selfTasks = [];     // global storage item for user Task
  allTasks = [];      // global storage item for all of the Tasks
  allUserTasks = [];  // global storage item for specific user Task
  allTopicTasks = []; // global storage item for specific topic Tasks

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
    // call the snackBar to update view experience and check for levelup
    return this.http.post<APIResponse>(`${ENVIRONMENT.apiUrl}/Task`, FORMBODY).subscribe(data => {
      this.selfTasks.unshift(data.response);
    });
  } // end of PostTask


  /**
   * PUT One Task
   * @param id - the id of the Task
   * @param Task - the Task
   */
  Update = (id, Task): Observable<void> => {
    this.snackBar.GeneralMessageSnack("Task has been edited!");
    return this.http.put<void>(`${ENVIRONMENT.apiUrl}/Task/single/${id}`, Task);
  } // end of PutTask


  /**
   * DELETE One Task
   * @param TaskID : number - the id of the Task
   */
  Delete = (TaskID: number): Observable<void> => {
    this.snackBar.GeneralMessageSnack("Task has been deleted!");
    return this.http.delete<void>(`${ENVIRONMENT.apiUrl}/Task/single/${TaskID}`);
  } // end of DeleteTask


  //  private handleHttpError(error: HttpErrorResponse): Observable<IError>{
  //    let dataError = new IError();

  //    return throwError(dataError)
  //  }

}
