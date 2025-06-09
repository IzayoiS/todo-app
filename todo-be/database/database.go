package database

import (
	"log"
	"os"
	"todo/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	var err error
	DB, err = gorm.Open(postgres.New(postgres.Config{
		DSN:                  os.Getenv("DB_URL"),
		PreferSimpleProtocol: true,
	}), &gorm.Config{})
	
	if err != nil {
		log.Fatal("Database connection failed: ", err)
	}

	if err := DB.AutoMigrate(&models.User{}, &models.Todo{}); err != nil {
		log.Fatal("Migration failed: ", err)
	}

	log.Println("Database connected")
}