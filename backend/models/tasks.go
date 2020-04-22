package models

import (
	"database/sql"
)

// User represents the team model stored in our database
type Post struct {
	Title  string `schema:"title"`
	UserID string `schema:"userid"`
}

// Teamservice is a set of methods used to manipulate and
// work with the team model
type PostService interface {
	PostDB
}

// TeamDB is used to interact with the users database.
//
type PostDB interface {
	ByUserID(id string) ([]Post, error)
	ByID(id string) (*Post, error)
	Create(team *Post) error
	Update(team *Post) error
	Delete(id string) error
}

func NewPostService(db *sql.DB) PostService {
	return &postService{
		PostDB: &postValidator{&postSQL{db}},
	}
}

type postService struct {
	PostDB
}

type postValidator struct {
	PostDB
}

func (pv *postValidator) Create(p *Post) error {
	if err := runPostValFuncs(p,
		pv.userIDRequired,
		pv.titleRequired); err != nil {
		return err
	}

	return pv.PostDB.Create(p)
}

func (pv *postValidator) Update(p *Post) error {
	if err := runPostValFuncs(p,
		pv.userIDRequired,
		pv.titleRequired); err != nil {
		return err
	}

	return pv.PostDB.Update(p)
}

// Delete will delete the user with the provided ID
func (pv *postValidator) Delete(id string) error {
	if id == "" {
		return ErrIDInvalid
	}
	return pv.PostDB.Delete(id)
}

func (pv *postValidator) userIDRequired(p *Post) error {
	if p.UserID == "" {
		return ErrUserIDRequired
	}
	return nil
}

func (pv *postValidator) titleRequired(p *Post) error {
	if p.Title == "" {
		return ErrTeamTitleRequired
	}
	return nil
}

type postValFunc func(*Post) error

func runPostValFuncs(post *Post, fns ...postValFunc) error {
	for _, fn := range fns {
		if err := fn(post); err != nil {
			return err
		}
	}
	return nil
}

var _ PostDB = &postSQL{} // safety check

type postSQL struct {
	db *sql.DB
}

// ByID will look up by the id provided.
// If the user is found, we will return a nil error
// If the user is not found, we will return ErrNotFound
// If there is another error, we will return an error with
// more information about what went wrong. This may not be
// an error generated by the models package.
//
// As a general rule, any error but ErrNotFound should
// probably result in a 500 error.
func (psql *postSQL) ByID(id string) (*Post, error) {
	var post Post
	//do the sql
	
	return &post, nil
}

func (psql *postSQL) ByName(userID string) ([]Post, error) {
	var posts []Post
	// do the sql
	
	return posts, nil
}

func (psql *postSQL) All(userID string) ([]Post, error) {
	var posts []Post
	// do the sql
	
	return posts, nil
}

// Create will create the provided team and backfill data
// like the ID, CreatedAt, and UpdatedAt fields
func (psql *postSQL) Create(post *Post) error {
	return nil
}

// Update will update the provided team
func (psql *postSQL) Update(post *Post) error {
	return nil
}

// Delete will delete the provided team
func (psql *postSQL) Delete(id string) error {
	// ts.db.exec()
	return nil
}


