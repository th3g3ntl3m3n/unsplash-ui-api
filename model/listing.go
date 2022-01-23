package model

type Listing struct {
	Id    uint   `json:"id,omitempty"`
	Name  string `json:"name,omitempty"`
	Count uint   `json:"count,omitempty"`
}
