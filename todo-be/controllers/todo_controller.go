package controllers

import (
	"errors"
	"strconv"
	"todo/database"
	"todo/services"

	"github.com/gofiber/fiber/v2"
)

func getUserID(c *fiber.Ctx) (uint, error) {
	userIDVal := c.Locals("user_id")
	if userIDVal == nil {
		return 0, errors.New("Unauthorized")
	}

	userID, ok := userIDVal.(uint)
	if !ok {
		return 0, errors.New("invalid user_id format")
	}

	return userID, nil
}


func GetTodos(c *fiber.Ctx) error {
	userId, err := getUserID(c)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": err.Error()})
	}

	todos, err := services.GetTodos(database.DB, userId)
	if err != nil {
		return c.SendStatus(500)
	}
	return c.JSON(todos)
}

func GetTodoByID(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	userId, err := getUserID(c)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": err.Error()})
	}

	GetByID, err := services.GetTodoByID(database.DB, uint(id), userId)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
	}

	return c.JSON(fiber.Map{
		"todo": GetByID,
	})
}

func AddTodo(c *fiber.Ctx) error {
	var body struct {
		Title string `json:"title"`
	}
	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	userId, err := getUserID(c)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": err.Error()})
	}

	createdTodo, err := services.AddTodo(database.DB, body.Title, userId)
	if err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to create todo"})
    }
	
	return c.Status(201).JSON(fiber.Map{
        "message": "Todo created successfully",
        "todo":    createdTodo,
    })

}

func ToggleTodo(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	userId, err := getUserID(c)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": err.Error()})
	}

	toggleTodo, err := services.ToggleTodo(database.DB, uint(id), userId)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
	}
	message := "Todo has been marked as incomplete"
	if toggleTodo.Completed {
		message = "Todo has been completed"
	}

	return c.JSON(fiber.Map{
		"message": message,
		"todo": toggleTodo,
	})
}

func DeleteTodo(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	userId, err := getUserID(c)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": err.Error()})
	}

	err = services.DeleteTodo(database.DB, uint(id), userId)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
	}
	return c.JSON(fiber.Map{
		"message": "Todo deleted successfully",
	})
}
