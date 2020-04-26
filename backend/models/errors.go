package models

import "strings"

const (
	// ErrNotFound is returned when a resource cannot be found
	// in the database
	ErrNotFound modelError = "models: resource not found"
	
	ErrTaskTitleRequired modelError = "models: title is required"
	ErrTaskTitleTooLong modelError = "models: title must be less than 64 characters"
	ErrTaskInfoTooLong modelError = "models: info must be less than 1024 characters"
	// ErrIDInvalid is returned when an invalid ID is provided
	// to a method like Delete
	ErrIDInvalid        privateError = "models: ID provided was invalid"
	
)

type modelError string

func (e modelError) Error() string {
	return string(e)
}

func (e modelError) Public() string {
	s := strings.Replace(string(e), "models: ", "", 1)
	return strings.Title(s)
}

type privateError string

func (e privateError) Error() string {
	return string(e)
}
