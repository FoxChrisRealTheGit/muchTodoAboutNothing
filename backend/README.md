# Much @TODO about nothing


# To Run the project

in development, from the root, run:

```
go run .
```  

or run:

```
go build .
```

This project also prefers a running postgres instance. There is a default configuration for a databse; however, it is extremely unlikely that that will work for yourself. To fix this, include a .config file into your build. This config file will also dictate what port and environment the application is running on and should look alot like this:
```
{
  "port": 9000,
  "env": "dev",
  "database": {
    "host": "localhost",
    "port": 5432,
    "user": "postgres",
    "password": "somepasswordthatismoresecurethanthisbutstillneat",
    "dbname": "the-name-of-your-db"
  }
}
```