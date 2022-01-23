package database

import (
	"server/model"

	"gorm.io/gorm"
)

type listingDatabase interface {
	GetAll() (*[]model.Listing, error)
	GetListsByPhotoId(id string) (interface{}, error)
	CreateList(name string) (interface{}, error)
	UpdateList(id uint, name string) error
	DeleteList(ids []uint) error
}

type photosDatabase interface {
	GetPhotosByListId(listId uint) (*[]model.Photo, error)
	AddPhoto(id string, url string, likes uint) error
	DeletePhoto(id string) error
}

type listPhotoRelDatabase interface {
	CreateLink(listId uint, photoId string) error
	RemoveLink(listId uint, photoId string) error
}

type Database interface {
	listingDatabase
	photosDatabase
	listPhotoRelDatabase
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) Database {
	newRepo := repository{db}
	return &newRepo
}
