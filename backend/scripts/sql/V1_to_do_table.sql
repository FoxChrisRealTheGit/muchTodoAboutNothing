CREATE TABLE tasks (
    id PRIMARY KEY,
    task_name VARCHAR(128),
    description VARCHAR(2048),
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    completed_at TIMESTAMP,
    done BOOLEAN DEFAULT FALSE,
    meta JSON DEFAULT '{}'
)