package views

import (
	"encoding/json"
	"net/http"
)

type ResponseHeader struct {
	Error    *Alert      `json:"error"`
	Response interface{} `json:"response"`
}

// SendHeader is a generic method for setting and sending headers to
// our front end
func SendHeader(w http.ResponseWriter, status int, err *Alert, data interface{}) {
	res := &ResponseHeader{
		Error:    err,
		Response: data,
	}
	w.Header().Set("Content-Type", "application/json")
	// w.WriteHeader(status)
	json.NewEncoder(w).Encode(res)
	return
}
