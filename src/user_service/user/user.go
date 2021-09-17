package user

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"os"
)

type User struct {
	Id int `json:"id"`
	Login string `json:"login"`
	Password string `json:"password"`
}

var sql_con *sql.DB

func init()  {
	host := os.Getenv("MYSQL_HOST")
	username := os.Getenv("MYSQL_USER")
	password := os.Getenv("MYSQL_PASSWORD")
	database := os.Getenv("MYSQL_DATABASE")
	var err error
	sql_con, err = sql.Open("mysql", username + ":"+password+"@tcp("+host+")/"+database)
	// if there is an error opening the connection, handle it
	if err != nil {
		panic(err.Error())
	}
}

func GetUser(login string, password string) (User, error) {
	var user User
	err := sql_con.QueryRow("SELECT * FROM `user` where login = ? and password = ?", login, password).Scan(&user.Id, &user.Login, &user.Password)
	log.Println(user)
	if err != nil {
		return user, err
	}
	if (User{}) == user {
		return user, fmt.Errorf("User not found")
	}
	return user, nil
}