package models

import (
	"database/sql"
	_ "github.com/lib/pq" // supposed to be here
	"io/ioutil"
	"log"
)

// ServicesConfig does stuff
type ServicesConfig func(*Services) error

// WithPostgres creates the postgres service
func WithPostgres(dialect string, connectionInfo string) ServicesConfig {
	return func(s *Services) error {
		db, err := sql.Open(dialect, connectionInfo)
		if err != nil {
			return err
		}
		s.db = db
		return nil
	}
}

// WithTask creates the task service
func WithTask() ServicesConfig {
	return func(s *Services) error {
		s.Task = NewTaskService(s.db)
		return nil
	}
}

// NewServices makes a new services
func NewServices(cfgs ...ServicesConfig) (*Services, error) {
	var s Services
	for _, cfg := range cfgs {
		if err := cfg(&s); err != nil {
			return nil, err
		}
	}
	return &s, nil
}

// Services is the struct for services
type Services struct {
	Task TaskService
	db   *sql.DB
}

// Close will close the database connection
func (s *Services) Close() error {
	return s.db.Close()
}

// DestructiveReset drops all tables and rebuilds it
func (s *Services) DestructiveReset() error {
	log.Println("DROPING THE TABLES!")
	// drops all tables
	s.db.Exec(`
		DROP SCHEMA public CASCADE;
		CREATE SCHEMA public;
		GRANT ALL ON SCHEMA public TO postgres;
		GRANT ALL ON SCHEMA public TO public;
		`)

	return s.Rebuilder()
}

// Rebuilder will attempt to automatically rebuild all tables
func (s *Services) Rebuilder() error {
	log.Println("REBUILDING THE TABLES!")
	// rebuilds tables
	query, err := ioutil.ReadFile("../scripts/sql/V!_to_do_table.sql")
	if err != nil {
		panic(err)
	}
	s.db.Exec(string(query))

	log.Println("SEEDING THE TABLES!")
	// seeds for control
	// query, err = ioutil.ReadFile("../scripts/sql/seeds/??.sql")
	// if err != nil {
	// 	panic(err)
	// }
	// s.db.Exec(string(query))

	return nil
}
