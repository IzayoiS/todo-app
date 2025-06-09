package models

import "time"

type User struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Username string `gorm:"unique" json:"username"`
	Email    string `gorm:"unique" json:"email"`
	Password string `json:"-"`

	Todos []Todo `json:"todos,omitempty" gorm:"foreignKey:UserID"`
	
	createdAt time.Time
	updatedAt time.Time
}