package auth

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type User struct {
	Id int `json:"id"`
	Login string `json:"login"`
	Password string `json:"password"`
}

type LoginUserRequest struct {
	Login string `json:"login"`
	Password string `json:"password"`
}
type LoginResponce struct {
	Tocken string `json:"tocken"`
}

func (req *LoginUserRequest)GetUser() (User, error)  {
	json_data, e := json.Marshal(req)
	if e != nil{
		log.Fatal(e)
		return User{}, e
	}
	resp, err := http.Post("http://user_service:1323/getUser", "application/json",
		bytes.NewBuffer(json_data))

	if err != nil {
		log.Fatal(err)
		return User{}, e
	}
	if resp.StatusCode != 200{
		return User{}, fmt.Errorf("User not found")
	}

	var res User
	json.NewDecoder(resp.Body).Decode(&res)
	return res, nil
}