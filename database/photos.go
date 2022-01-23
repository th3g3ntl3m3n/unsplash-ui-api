package database

import (
	"fmt"
	"server/model"
)

func (repo repository) GetPhotosByListId(listId uint) (*[]model.Photo, error) {
	var photos []model.Photo
	if err := repo.db.Raw("SELECT id,photo_url,likes FROM photos as ph LEFT JOIN list_photo_rel as lpr ON lpr.photo_id = ph.id WHERE lpr.list_id = ?", listId).Scan(&photos).Error; err != nil {
		return nil, fmt.Errorf("error getting photos")
	}
	return &photos, nil
}
func (repo repository) AddPhoto(id string, url string, likes uint) error {
	var count int64
	if err := repo.db.Table("photos").Where("id = ?", id).Count(&count).Error; err != nil {
		return fmt.Errorf("error checking photo record")
	}
	if count == 0 {
		if err := repo.db.Exec("INSERT INTO photos(id, photo_url, likes) VALUES (?, ?,?)", id, url, likes).Error; err != nil {
			return fmt.Errorf("error getting photos")
		}
	}
	return nil
}
func (repo repository) DeletePhoto(photoId string) error {
	if err := repo.db.Exec("DELETE FROM photos WHERE id = ?", photoId).Error; err != nil {
		return fmt.Errorf("cannot delete photo")
	}
	return nil
}
