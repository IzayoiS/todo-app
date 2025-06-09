package services

import (
	"todo/models"

	"gorm.io/gorm"
)

func GetTodos(db *gorm.DB, userId uint) ([]models.Todo, error) {
	var todos []models.Todo
	err := db.Preload("User").Where("user_id = ?", userId).Find(&todos).Error
	return todos, err
}

func AddTodo(db *gorm.DB, title string, userId uint) (*models.Todo, error) {
	todo := models.Todo{Title: title, UserID: userId}
	if err := db.Create(&todo).Error; err != nil {
        return nil, err
    }
	if err := db.Preload("User").First(&todo).Error; err != nil {
        return nil, err
    }
    
    return &todo, nil
}

func GetTodoByID(db *gorm.DB,todoId uint, userId uint) (*models.Todo, error) {
	var todo models.Todo
	if err := db.Preload("User").Where("user_id = ?", userId).First(&todo,todoId).Error; err != nil {
		return nil, err
	}
	return &todo, nil
}

func ToggleTodo(db *gorm.DB, todoId uint, userId uint) (*models.Todo, error) {
	var todo models.Todo
	if err := db.Preload("User").First(&todo, todoId).Error; err != nil {
		return nil, err
	}
	if todo.UserID != userId {
		return nil,  gorm.ErrRecordNotFound
	}
	todo.Completed = !todo.Completed

	if err := db.Save(&todo).Error; err != nil {
        return nil, err
    }
	return &todo, nil
}

func DeleteTodo(db *gorm.DB, todoId uint, userId uint) error {
	return db.Where("id = ? AND user_id = ?", todoId, userId).Delete(&models.Todo{}).Error
}
