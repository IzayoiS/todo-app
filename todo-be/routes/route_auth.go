package routes

import (
	"todo/controllers"
	"todo/middlewares"

	"github.com/gofiber/fiber/v2"
)

func AuthRoute(app *fiber.App) {
	app.Post("/register", controllers.Register)
	app.Post("/login", controllers.Login)
	app.Post("/check",middlewares.Auth, controllers.CheckUser)
}