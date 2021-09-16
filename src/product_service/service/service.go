package service

import (
	"encoding/json"
	"github.com/labstack/echo"
	"io/ioutil"
	"log"
	"net/http"
	"../product"
	"strconv"
)

func SetupHandlers()  {
	e := echo.New()
	e.Use(auth)
	e.GET("/", getAll)
	e.GET("/:id", get)
	e.POST("/", create)
	e.PUT("/", update)
	e.DELETE("/:id", delete)
	e.Logger.Fatal(e.Start(":1323"))
}

func getAll(ctx echo.Context) error{
	products, err := product.GetAll()
	if err != nil {
		log.Println(err.Error())
		return ctx.NoContent(http.StatusNotFound)
	}
	return ctx.JSON(200, products)
}

func get(ctx echo.Context) error{
	id_param := ctx.Param("id")
	id, err := strconv.Atoi(id_param)
	if err != nil {
		log.Println(err.Error())
		return ctx.NoContent(http.StatusInternalServerError)
	}
	product, err := product.Get(id)
	if err != nil {
		log.Println(err.Error())
		return ctx.NoContent(http.StatusNotFound)
	}
	return ctx.JSON(200, product)
}

func create(ctx echo.Context) error{
	body := ctx.Request().Body
	body_b, err := ioutil.ReadAll(body)
	if err != nil {
		log.Println(err.Error())
		return echo.NewHTTPError(http.StatusInternalServerError)
	}
	var request product.CreateProductRequest
	err = json.Unmarshal(body_b, &request)
	if err != nil {
		log.Println(err.Error())
		return echo.NewHTTPError(http.StatusInternalServerError)
	}
	err = request.Create()
	if err != nil {
		log.Println(err.Error())
		return ctx.NoContent(http.StatusNotFound)
	}
	return ctx.NoContent(200)
}

func update(ctx echo.Context) error{
	body := ctx.Request().Body
	body_b, err := ioutil.ReadAll(body)
	if err != nil {
		log.Println(err.Error())
		return echo.NewHTTPError(http.StatusInternalServerError)
	}
	var request product.Product
	err = json.Unmarshal(body_b, &request)
	if err != nil {
		log.Println(err.Error())
		return echo.NewHTTPError(http.StatusInternalServerError)
	}
	err = request.Update()
	if err != nil {
		log.Println(err.Error())
		return ctx.NoContent(http.StatusNotFound)
	}
	return ctx.NoContent(200)
}

func delete(ctx echo.Context) error{
	id_param := ctx.Param("id")
	id, err := strconv.Atoi(id_param)
	if err != nil {
		log.Println(err.Error())
		return ctx.NoContent(http.StatusInternalServerError)
	}
	err = product.Delete(id)
	if err != nil {
		log.Println(err.Error())
		return ctx.NoContent(http.StatusNotFound)
	}
	return ctx.NoContent(200)
}