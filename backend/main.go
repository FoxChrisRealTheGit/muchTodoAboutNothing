package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"time"
	"todo/controllers"
	"todo/models"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	var entry string
	var static string
	flag.StringVar(&entry, "entry", "./build/index.html", "the entrypoint to serve.")
	flag.StringVar(&static, "static", "./build", "the directory to serve static files from.")
	boolPtr := flag.Bool("prod", false, "Provide this flag in production. This ensures that a .config file is provided before the application starts.")
	flag.Parse()
	cfg := LoadConfig(*boolPtr)
	dbCfg := cfg.Database

	services, err := models.NewServices(
		models.WithPostgres(dbCfg.Dialect(), dbCfg.Connection()),
		models.WithTask(),
	)
	if err != nil {
		// services couldnt be made, should probably panic?
		log.Println(err)
		return
	}
	defer services.Close()

	// Toggle these to destroy or rebuild the db!
	// services.DestructiveReset()
	// services.Rebuilder()

	r := mux.NewRouter()
	// declare controllers
	tasksC := controllers.NewTasks(services.Task, r)

	// declare middleware


	// Task routes
	r.HandleFunc("/api/tasks", tasksC.All).Methods("GET")
	r.HandleFunc("/api/task", tasksC.Create).Methods("POST").Name(controllers.TaskCreateName)
	r.HandleFunc("/api/task/{id}", tasksC.Edit).Methods("PUT").Name(controllers.TaskEditName)
	r.HandleFunc("/api/task/done/{id}", tasksC.MarkDone).Methods("PUT")
	r.HandleFunc("/api/task/{id}", tasksC.Delete).Methods("DELETE").Name(controllers.TaskDeleteName)
	r.HandleFunc("/api/task/{id}", tasksC.ByID).Methods("GET")
	r.HandleFunc("/api/tasks/{name}", tasksC.ByName).Methods("GET")

	if cfg.Env == "prod" {	
		// Serve static assets directly.
		r.PathPrefix("/").Handler(http.FileServer(http.Dir(static)))
		// Catch-all: Serve our JavaScript application's entry-point (index.html).
		r.PathPrefix("/").HandlerFunc(IndexHandler(entry))
	}

	// establishes the server contraints and information
	srv := &http.Server{
		Handler:      handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}), handlers.AllowedOrigins([]string{"http://http://ec2-18-216-70-175.us-east-2.compute.amazonaws.com:80"}))(r),
		Addr:         fmt.Sprintf(":%d", cfg.Port),
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	// runs the server
	log.Println("Running on port: ", cfg.Port)
	log.Fatal(srv.ListenAndServe())
}

func IndexHandler(entrypoint string) func(w http.ResponseWriter, r *http.Request) {
	fn := func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, entrypoint)
	}

	return http.HandlerFunc(fn)
}