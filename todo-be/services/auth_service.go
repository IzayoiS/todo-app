package services

import (
	"errors"
	"log"
	"todo/database"
	"todo/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func RegisterUser(username, email, password string) (*models.User, error) {
	var existing models.User
	err := database.DB.Where("email = ?",email).First(&existing).Error
	if err == nil {
		return nil, errors.New("email already registered")
	}

	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, errors.New("failed to hash password")
	}

	newUser := &models.User{
		Username: username,
		Email: email,
		Password: string(hashed),
	}

	if err := database.DB.Create(newUser).Error; err != nil {
		return nil, err
	}

	return newUser, nil
}

func LoginUser(email, password string) (*models.User, error) {
	var user models.User

	if err := database.DB.Where("email = ?", email).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			log.Println("User not found with the given email")
		}
		return nil, errors.New("invalid email or password")
	}



	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, errors.New("invalid email or password")
	}

	return &user, nil
}

func CheckUser(db *gorm.DB, id uint) (*models.User, error) {
	var user models.User
	if err := db.First(&user, id).Error; err != nil {
		return nil, err
	}
	return &user, nil
}