package database

import "fmt"

func (repo repository) CreateLink(listId uint, photoId string) error {
	if err := repo.db.Exec("INSERT INTO list_photo_rel(list_id, photo_id) VALUES (?,?)", listId, photoId).Error; err != nil {
		return fmt.Errorf("could not tag photo to list")
	}
	return nil
}
func (repo repository) RemoveLink(listId uint, photoId string) error {
	if err := repo.db.Exec("DELETE FROM list_photo_rel WHERE list_id = ? AND photo_id = ?", listId, photoId).Error; err != nil {
		return fmt.Errorf("could not un-tag photo to list")
	}
	return nil
}
