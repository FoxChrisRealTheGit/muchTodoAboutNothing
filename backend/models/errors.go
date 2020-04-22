package models

import "strings"

const (
	// ErrNotFound is returned when a resource cannot be found
	// in the database
	ErrNotFound modelError = "models: resource not found"
	// ErrPasswordIncorrect is returned when an invalid password
	// is used when attempting to authenticate a user.
	ErrPasswordIncorrect modelError = "models: incorrect password provided"
	ErrPasswordTooShort  modelError = "models: password must be at least 12 characters long"
	ErrPasswordRequired  modelError = "models: password is required"
	ErrEmailRequired     modelError = "models: Email address is required"
	ErrEmailInvalid      modelError = "models: Email address is not valid"
	ErrEmailTaken        modelError = "models: Email address is already taken."
	ErrTeamTitleRequired modelError = "models: title is required"

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
