package database

import (
	"fmt"
	"server/model"
)

func (repo repository) GetAll() (*[]model.Listing, error) {
	var listings []model.Listing
	if err := repo.db.Raw("select id, name , count(p.photo_id) as count from lists left join list_photo_rel as p on p.list_id = id group by id").Scan(&listings).Error; err != nil {
		return nil, fmt.Errorf("error getting listing data")
	}
	return &listings, nil
}
func (repo repository) GetListsByPhotoId(id string) (interface{}, error) {
	var list []model.ListPhoto
	if err := repo.db.Raw("SELECT list_id  FROM list_photo_rel WHERE photo_id = ?", id).Scan(&list).Error; err != nil {
		return nil, fmt.Errorf("error getting listing object")
	}
	var resp = make(map[uint]bool)
	for _, l := range list {
		resp[l.ListId] = true
	}
	return resp, nil
}
func (repo repository) CreateList(name string) (interface{}, error) {
	type Listing struct {
		Id   uint   `json:"id,omitempty"`
		Name string `json:"name,omitempty"`
	}
	var list Listing

	list.Name = name
	if err := repo.db.Table("lists").Create(&list).Error; err != nil {
		return nil, fmt.Errorf("error creating list")
	}
	return list, nil
}
func (repo repository) UpdateList(id uint, name string) error {

	if err := repo.db.Table("lists").Where("id = ?", id).UpdateColumn("name", name).Error; err != nil {
		return fmt.Errorf("error udpating list")
	}
	return nil
}
func (repo repository) DeleteList(ids []uint) error {

	if err := repo.db.Exec("DELETE FROM lists WHERE id in (?)", ids).Error; err != nil {
		return fmt.Errorf("error deleting list")
	}
	return nil
}
