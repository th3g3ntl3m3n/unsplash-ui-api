package model

type Photo struct {
	Id       string `json:"id,omitempty"`
	PhotoUrl string `json:"url,omitempty"`
	Likes    uint   `json:"likes,omitempty"`
}

type ListPhoto struct {
	ListId   uint   `json:"list_id,omitempty"`
	PhotoId  string `json:"photo_id,omitempty"`
	PhotoUrl string `json:"photo_url,omitempty"`
	Likes    uint   `json:"likes,omitempty"`
}
