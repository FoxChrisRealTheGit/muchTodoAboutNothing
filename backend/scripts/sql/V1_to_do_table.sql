CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    info VARCHAR(1024),
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP,
    completed_at TIMESTAMP,
    done BOOLEAN DEFAULT FALSE,
    meta JSON DEFAULT '{}'
)