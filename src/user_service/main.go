package main

import (
	"./service"
	"log"
)

func main()  {
	log.Println("Start user service")
	service.SetupHandlers()
}
