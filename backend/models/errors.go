package models

import "strings"

const (
	// ErrNotFound is returned when a resource cannot be found
	// in the database
	ErrNotFound modelError = "models: resource not found"
	
	ErrTaskTitleRequired modelError = "models: title is required"

	// ErrIDInvalid is returned when an invalid ID is provided
	// to a method like Delete
	ErrIDInvalid        privateError = "models: ID provided was invalid"
	ErrRememberTooShort privateError = "models: Remember token must be at least 32 bytes"
	ErrRememberRequired privateError = "models: remember token is required"
	ErrUserIDRequired   privateError = "models: user ID is required"
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
