package views

import (

)

const (
	AlertLvlError   = "danger"
	AlertLvlWarning = "warning"
	AlertLvlInfo    = "info"
	AlertLvlSuccess = "success"

	// AlertMsgGeneric is displayed when any random error
	// is encountered by our backend
	AlertMsgGeneric = "Something went wrong. Please try again, and contact us if the problem persists."
)

// Alert is used to render Alert messages in templates
type Alert struct {
	Level   string `json:"level"`
	Message string `json:"message"`
}

// Data is the top level structure that views expect data
// to come in
type Data struct {
	Alert *Alert
	// User *models.User
}

func AlertError(alertType string, msg string) *Alert {
	return &Alert{
		Level:   alertType,
		Message: msg,
	}
}
