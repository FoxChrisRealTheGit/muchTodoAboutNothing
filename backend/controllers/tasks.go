package controllers

import (
	"cyog/context"
	"cyog/models"
	"cyog/views"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

const (
	// PostCreateName is the const for the Post Create method
	PostCreateName = "post_create"
	// PostUpdateName is the const for the Post Update method
	PostUpdateName = "post_update"
	// PostDeleteName is the const for the Post Delete method
	PostDeleteName = "post_delete"
)

// NewPosts is used to create a new Posts controller.
func NewPosts(ps models.PostService, r *mux.Router) *Posts {
	return &Posts{
		ps: ps,
		r:  r,
	}
}

// Posts is the struc for posts
type Posts struct {
	ps models.PostService
	r  *mux.Router
}

type postForm struct {
	Title string `schema:"title"`
}


// Create is a method
// POST /posts
func (p *Posts) Create(w http.ResponseWriter, r *http.Request) {
	var form postForm
	if err := parseForm(r, &form); err != nil {
		log.Println(err)
		alert := views.AlertError(views.AlertLvlError, views.AlertMsgGeneric)
		views.SendHeader(w, 500, alert, form)
		return
	}
	user := context.User(r.Context())
	if user == nil {
		// middleware is broken, send headers
		return
	}
	post := models.Post{
		Title: form.Title,
	}
	if err := p.ps.Create(&post); err != nil {
		// error creating post
		alert := views.AlertError(views.AlertLvlError, views.AlertMsgGeneric)
		views.SendHeader(w, 500, alert, post)
		return
	}
	// success
	alert := views.AlertError(views.AlertLvlSuccess, "Successfully created post!")
	views.SendHeader(w, 200, alert, post)
	return
}

// Update is a method
// PUT /posts/:id
func (p *Posts) Update(w http.ResponseWriter, r *http.Request) {
	post, err := p.postByID(w, r)
	if err != nil {
		return
	}

	user := context.User(r.Context())
	if post.UserID != user.ID {
		// user ids dont match, so send header where resource is not found
		return
	}
	var form postForm
	if err := parseForm(r, &form); err != nil {
		// error parseing form
		log.Println(err)
		alert := views.AlertError(views.AlertLvlError, views.AlertMsgGeneric)
		views.SendHeader(w, 500, alert, form)
		return
	}

	post.Title = form.Title
	// call team service
	err = p.ps.Update(post)
	if err != nil {
		// error updating the form
		alert := views.AlertError(views.AlertLvlError, views.AlertMsgGeneric)
		views.SendHeader(w, 500, alert, post)
		return
	}
	alert := views.AlertError(views.AlertLvlSuccess, "Post successfully updated!")
	views.SendHeader(w, 500, alert, post)
	return

}


// Delete is a method
// DELETE /posts/:id
func (p *Posts) Delete(w http.ResponseWriter, r *http.Request) {
	post, err := p.postByID(w, r)
	if err != nil {
		return
	}

	user := context.User(r.Context())
	if post.UserID != user.ID {
		// TODO: user ids dont match, so send header where resource is not found
		return
	}
	err = p.ps.Delete(post.UserID)
	if err != nil {
		// error deleteing post
		alert := views.AlertError(views.AlertLvlError, views.AlertMsgGeneric)
		views.SendHeader(w, 500, alert, post)
		return
	}

	alert := views.AlertError(views.AlertLvlSuccess, "Successfully deleted post!")
	views.SendHeader(w, 200, alert, post)
	return

}

func (p *Posts) postByID(w http.ResponseWriter, r *http.Request) (*models.Post, error) {
	vars := mux.Vars(r)
	idStr := vars["id"]
	team, err := p.ps.ByID(idStr)
	if err != nil {
		switch err {
		case models.ErrNotFound:
			// render header for not found, http.StatusNotFound
		default:
			// something went wrong, http.StatusInternalStatusError
		}
		return nil, err
	}
	return team, nil
}
