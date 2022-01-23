package apihandler

import (
	"log"
	"net/http"
	"server/model"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (handler httpHandler) getPhoto(ctx *gin.Context) {
	listId := ctx.Query("id")
	if listId != "" {

		id, err := strconv.Atoi(listId)
		if err != nil {
			ctx.JSON(400, model.NewReponse(0, "error", "bad request"))
			return
		}
		photos, err := handler.repo.GetPhotosByListId(uint(id))
		if err != nil {
			ctx.JSON(500, model.NewReponse(0, "error", "somethign went wrong"))
			return
		}
		ctx.JSON(200, model.NewReponse(1, "ok", photos))
		return
	}
	ctx.JSON(400, model.NewReponse(0, "error", "bad request"))
}

func (handler httpHandler) addPhote(ctx *gin.Context) {
	var ll model.ListPhoto
	if err := ctx.BindJSON(&ll); err != nil {
		ctx.JSON(400, model.NewReponse(0, "error", "bad request"))
		return
	}

	if err := handler.repo.AddPhoto(ll.PhotoId, ll.PhotoUrl, ll.Likes); err != nil {
		ctx.JSON(500, model.NewReponse(0, "error", "something went wrong"))
		return
	}

	if err := handler.repo.CreateLink(ll.ListId, ll.PhotoId); err != nil {
		ctx.JSON(500, model.NewReponse(0, "error", "something went wrong"))
		return
	}

	ctx.JSON(200, model.NewReponse(1, "ok", ll))
}

func (handler httpHandler) deletePhote(ctx *gin.Context) {
	var ll model.ListPhoto
	if err := ctx.BindJSON(&ll); err != nil {
		ctx.String(http.StatusBadRequest, "bad request")
		return
	}

	if err := handler.repo.RemoveLink(ll.ListId, ll.PhotoId); err != nil {
		ctx.JSON(500, model.NewReponse(0, "error", "something went wrong"))
		return
	}

	if err := handler.repo.DeletePhoto(ll.PhotoId); err != nil {
		log.Println(err)
	}

	ctx.JSON(200, model.NewReponse(1, "ok", ll))
}
