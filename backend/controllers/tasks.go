package controllers

import (
	"log"
	"net/http"
	"todo/models"
	"todo/views"

	"github.com/gorilla/mux"
)

const (
	// TaskCreateName is the const for the Task Create method
	TaskCreateName = "task_create"
	// TaskUpdateName is the const for the Task Update method
	TaskUpdateName = "task_update"
	// TaskDeleteName is the const for the Task Delete method
	TaskDeleteName = "task_delete"
	// TaskEditName is the const for the Task Edit method
	TaskEditName = "task_edit"
)

// NewTasks is used to create a new Tasks controller.
func NewTasks(ts models.TaskService, r *mux.Router) *Tasks {
	return &Tasks{
		ts: ts,
		r:  r,
	}
}

// Tasks is the struc for tasks
type Tasks struct {
	ts models.TaskService
	r  *mux.Router
}

type taskForm struct {
	Title string `schema:"title"`
}

// All is a method
// Get /tasks
func (t *Tasks) All(w http.ResponseWriter, r *http.Request) {
	var tasks []models.Task
	tasks, err := t.ts.All()
	if err != nil {
		// error creating task
		alert := views.AlertError(views.AlertLvlError, views.AlertMsgGeneric)
		views.SendHeader(w, 500, alert, tasks)
		return
	}
	// success
	alert := views.AlertError(views.AlertLvlSuccess, "Successfully found tasks!")
	views.SendHeader(w, 200, alert, tasks)
	return
}

// Edit is a method
// Get /tasks
func (t *Tasks) Edit(w http.ResponseWriter, r *http.Request) {
	var form taskForm
	if err := parseForm(r, &form); err != nil {
		log.Println(err)
		alert := views.AlertError(views.AlertLvlError, views.AlertMsgGeneric)
		views.SendHeader(w, 500, alert, form)
		return
	}
	task := models.Task{
		Title: form.Title,
	}
	if err := t.ts.Create(&task); err != nil {
		// error creating task
		alert := views.AlertError(views.AlertLvlError, views.AlertMsgGeneric)
		views.SendHeader(w, 500, alert, task)
		return
	}
	// success
	alert := views.AlertError(views.AlertLvlSuccess, "Successfully created task!")
	views.SendHeader(w, 200, alert, task)
	return
}

// ByID is a method
// Get /tasks
func (t *Tasks) ByID(w http.ResponseWriter, r *http.Request) {
	var form taskForm
	if err := parseForm(r, &form); err != nil {
		log.Println(err)
		alert := views.AlertError(views.AlertLvlError, views.AlertMsgGeneric)
		views.SendHeader(w, 500, alert, form)
		return
	}
	task := models.Task{
		Title: form.Title,
	}
	if err := t.ts.Create(&task); err != nil {
		// error creating task
		alert := views.AlertError(views.AlertLvlError, views.AlertMsgGeneric)
		views.SendHeader(w, 500, alert, task)
		return
	}
	// success
	alert := views.AlertError(views.AlertLvlSuccess, "Successfully created task!")
	views.SendHeader(w, 200, alert, task)
	return
}

// ByName is a method
// Get /tasks
func (t *Tasks) ByName(w http.ResponseWriter, r *http.Request) {
	var form taskForm
	if err := parseForm(r, &form); err != nil {
		log.Println(err)
		alert := views.AlertError(views.AlertLvlError, views.AlertMsgGeneric)
		views.SendHeader(w, 500, alert, form)
		return
	}
	task := models.Task{
		Title: form.Title,
	}
	if err := t.ts.Create(&task); err != nil {
		// error creating task
		alert := views.AlertError(views.AlertLvlError, views.AlertMsgGeneric)
		views.SendHeader(w, 500, alert, task)
		return
	}
	// success
	alert := views.AlertError(views.AlertLvlSuccess, "Successfully created task!")
	views.SendHeader(w, 200, alert, task)
	return
}

// Create is a method
// POST /task
func (t *Tasks) Create(w http.ResponseWriter, r *http.Request) {
	var form taskForm
	if err := parseForm(r, &form); err != nil {
		log.Println(err)
		alert := views.AlertError(views.AlertLvlError, views.AlertMsgGeneric)
		views.SendHeader(w, 500, alert, form)
		return
	}
	task := models.Task{
		Title: form.Title,
	}
	if err := t.ts.Create(&task); err != nil {
		// error creating task
		alert := views.AlertError(views.AlertLvlError, views.AlertMsgGeneric)
		views.SendHeader(w, 500, alert, task)
		return
	}
	// success
	alert := views.AlertError(views.AlertLvlSuccess, "Successfully created task!")
	views.SendHeader(w, 200, alert, task)
	return
}

// Update is a method
// PUT /tasks/:id
func (t *Tasks) Update(w http.ResponseWriter, r *http.Request) {
	task, err := t.taskByID(w, r)
	if err != nil {
		return
	}
	var form taskForm
	if err := parseForm(r, &form); err != nil {
		// error parseing form
		log.Println(err)
		alert := views.AlertError(views.AlertLvlError, views.AlertMsgGeneric)
		views.SendHeader(w, 500, alert, form)
		return
	}

	task.Title = form.Title
	// call team service
	err = t.ts.Update(task)
	if err != nil {
		// error updating the form
		alert := views.AlertError(views.AlertLvlError, views.AlertMsgGeneric)
		views.SendHeader(w, 500, alert, task)
		return
	}
	alert := views.AlertError(views.AlertLvlSuccess, "Task successfully updated!")
	views.SendHeader(w, 500, alert, task)
	return

}

// Delete is a method
// DELETE /tasks/:id
func (t *Tasks) Delete(w http.ResponseWriter, r *http.Request) {
	task, err := t.taskByID(w, r)
	if err != nil {
		return
	}
	err = t.ts.Delete("something")
	if err != nil {
		// error deleteing task
		alert := views.AlertError(views.AlertLvlError, views.AlertMsgGeneric)
		views.SendHeader(w, 500, alert, task)
		return
	}

	alert := views.AlertError(views.AlertLvlSuccess, "Successfully deleted task!")
	views.SendHeader(w, 200, alert, task)
	return

}

func (t *Tasks) taskByID(w http.ResponseWriter, r *http.Request) (*models.Task, error) {
	vars := mux.Vars(r)
	idStr := vars["id"]
	task, err := t.ts.ByID(idStr)
	if err != nil {
		switch err {
		case models.ErrNotFound:
			// render header for not found, http.StatusNotFound
		default:
			// something went wrong, http.StatusInternalStatusError
		}
		return nil, err
	}
	return task, nil
}
