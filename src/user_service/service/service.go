package service

import (
	"encoding/json"
	"github.com/labstack/echo"
	"io/ioutil"
	"log"
	"net/http"
	"../user"
)

func SetupHandlers()  {
	e := echo.New()
	e.POST("/getUser", getUser)
	e.Logger.Fatal(e.Start(":1323"))
}

func getUser(ctx echo.Context) error{
	body := ctx.Request().Body
	body_b, err := ioutil.ReadAll(body)
	if err != nil {
		log.Println(err.Error())
		return echo.NewHTTPError(http.StatusInternalServerError)
	}
	var request GetUserRequest
	err = json.Unmarshal(body_b, &request)
	if err != nil {
		log.Println(err.Error())
		return echo.NewHTTPError(http.StatusInternalServerError)
	}
	user, err := user.GetUser(request.Login, request.Password)
	if err != nil {
		log.Println(err.Error())
		return ctx.NoContent(http.StatusNotFound)
	}
	if user.Login == "" || user.Password == ""{
		return ctx.NoContent(http.StatusNotFound)
	}

	return ctx.JSON(200, user)
}
