package models

import "time"

type Todo struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Title    string `json:"title"`
	Completed bool `json:"completed"`

	UserID uint  `json:"user_id"`
	User   User `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	
	createdAt time.Time
	updatedAt time.Time
}