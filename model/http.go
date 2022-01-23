package model

type BaseResponse struct {
	Status  uint        `json:"status,omitempty"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

func NewReponse(Status uint, Message string, Data interface{}) BaseResponse {
	return BaseResponse{Status, Message, Data}
}
