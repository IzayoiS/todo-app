package main

import (
	"os"
	"todo/config"
	"todo/database"
	"todo/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	config.LoadEnv()
	database.Connect()

	app.Use(cors.New(cors.Config{
        AllowOrigins: "http://localhost:3000", 
        AllowHeaders: "Origin, Content-Type, Accept, Authorization",
    }))
	
	routes.TodoRoute(app)
	routes.AuthRoute(app)
	
	port := os.Getenv("PORT")
	
	app.Listen(":" + port)
}