package routes

import (
	"todo/controllers"
	"todo/middlewares"

	"github.com/gofiber/fiber/v2"
)

func TodoRoute(router fiber.Router) {
    todo := router.Group("/todo",middlewares.Auth)
    todo.Get("/", controllers.GetTodos)
    todo.Post("/", controllers.AddTodo)
    todo.Patch("/:id", controllers.ToggleTodo)
    todo.Get("/:id", controllers.GetTodoByID)
    todo.Delete("/:id", controllers.DeleteTodo)
}
