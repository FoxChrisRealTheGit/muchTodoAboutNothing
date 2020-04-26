package models

import (
	"database/sql"
	"github.com/lib/pq"
	"log"
	"time"
)

// Task represents the task model stored in our database
type Task struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Info  string `json:"info"`
	Done  bool   `json:"done"`
}

// TaskService is a set of methods used to manipulate and
// work with the task model
type TaskService interface {
	TaskDB
}

// TaskDB is used to interact with the users database.
type TaskDB interface {
	ByID(id string) (*Task, error)
	ByName(name string) ([]Task, error)
	All() ([]Task, error)
	Create(task *Task) error
	Update(task *Task) error
	MarkDone(id int) error
	Delete(id int) error
}

// NewTaskService is the service for tasks
func NewTaskService(db *sql.DB) TaskService {
	return &taskService{
		TaskDB: &taskValidator{&taskSQL{db}},
	}
}

type taskService struct {
	TaskDB
}

type taskValidator struct {
	TaskDB
}

func (tv *taskValidator) Create(p *Task) error {
	if err := runTaskValFuncs(p,
		tv.titleRequired,
		tv.titleLength); err != nil {
		return err
	}

	return tv.TaskDB.Create(p)
}

func (tv *taskValidator) Update(p *Task) error {
	if err := runTaskValFuncs(p,
		tv.titleRequired,
		tv.titleLength,
		tv.infoLength); err != nil {
		return err
	}

	return tv.TaskDB.Update(p)
}

// Delete will delete the user with the provided ID
func (tv *taskValidator) Delete(id int) error {
	if id <= 0 {
		return ErrIDInvalid
	}
	return tv.TaskDB.Delete(id)
}

func (tv *taskValidator) titleRequired(p *Task) error {
	if p.Title == "" {
		return ErrTaskTitleRequired
	}
	return nil
}

func (tv *taskValidator) titleLength(p *Task) error {
	if len(p.Title) > 64 {
		return ErrTaskTitleTooLong
	}
	return nil
}

func (tv *taskValidator) infoLength(p *Task) error {
	if len(p.Info) > 1024 {
		return ErrTaskInfoTooLong
	}
	return nil
}

type taskValFunc func(*Task) error

func runTaskValFuncs(task *Task, fns ...taskValFunc) error {
	for _, fn := range fns {
		if err := fn(task); err != nil {
			return err
		}
	}
	return nil
}

var _ TaskDB = &taskSQL{} // safety check

type taskSQL struct {
	db *sql.DB
}

// ByID will look up by the id provided.
func (tsql *taskSQL) ByID(id string) (*Task, error) {
	var task Task
	query := `
		SELECT 
			id, 
			title,
			COALESCE(info, ''),
			done 
		FROM tasks
		WHERE id=$1;`
	err := tsql.db.QueryRow(query, id).Scan(&task.ID, &task.Title, &task.Info, &task.Done)
	if err != nil {
		log.Println(err)
		return &task, err
	}
	return &task, nil
}

// ByName will return all tasks that match the name(title)
// provided
func (tsql *taskSQL) ByName(name string) ([]Task, error) {
	var tasks []Task
	// do the sql
	query := `
		SELECT * FROM tasks
		WHERE title ILIKE $1;`
	rows, err := tsql.db.Query(query, "%"+name+"%")
	defer rows.Close()
	for rows.Next() {
		var b Task

		err := rows.Scan(&b.ID, &b.Title)

		if err == nil {
			tasks = append(tasks, b)

		} else {
			log.Println(err)
			return tasks, err
		}

	}
	if err = rows.Err(); err != nil {
		log.Println(err)
		return nil, err
	}
	return tasks, nil
}

// All will return the id, title, and done status of
// all tasks currently in the database
func (tsql *taskSQL) All() ([]Task, error) {
	var tasks []Task
	// do the sql
	query := `SELECT id, title, done FROM tasks;`
	rows, err := tsql.db.Query(query)
	defer rows.Close()
	for rows.Next() {
		var b Task

		err := rows.Scan(&b.ID, &b.Title, &b.Done)

		if err == nil {
			tasks = append(tasks, b)

		} else {
			log.Println(err)
			return tasks, err
		}

	}
	if err = rows.Err(); err != nil {
		log.Println(err)
		return nil, err
	}
	return tasks, nil
}

// Create will create the provided task and backfill data
// like the ID, CreatedAt
func (tsql *taskSQL) Create(task *Task) error {
	query := `
		INSERT INTO tasks
		(title)
		VALUES($1)
		RETURNING id`
	//Delete
	var ID int
	err := tsql.db.QueryRow(query, task.Title).Scan(&ID)
	if err != nil {
		log.Println(err)
		return err
	}
	// assign ID to task
	task.ID = ID

	return err
}

// Update will update the provided task and backfill data
// like updated_at
func (tsql *taskSQL) Update(task *Task) error {
	t := time.Now()
	query := `
		UPDATE tasks
		SET title = $2,
			info = $3,
			done = false,
			updated_at = $4
		WHERE id = $1`
	//Delete
	_, err := tsql.db.Exec(query, task.ID, task.Title, task.Info, pq.FormatTimestamp(t))
	if err != nil {
		return err
	}

	return err
}

// MarkDone will update the provided task's done status and
// backfill data like updated_at and completed_at
func (tsql *taskSQL) MarkDone(id int) error {
	t := time.Now()
	query := `
		UPDATE tasks
		SET done = true,
		updated_at = $2,
		completed_at = $2
		WHERE id = $1`
	//Delete
	_, err := tsql.db.Exec(query, id, pq.FormatTimestamp(t))
	if err != nil {
		return err
	}

	return err
}

// Delete will remove the provided task from the database
func (tsql *taskSQL) Delete(id int) error {
	query := `DELETE FROM tasks 
	WHERE id = $1`
	//Delete
	_, err := tsql.db.Exec(query, id)
	if err != nil {
		log.Println(err)
		return err
	}

	return err
}
