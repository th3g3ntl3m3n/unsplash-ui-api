package apihandler

import (
	"log"
	"server/model"

	"github.com/gin-gonic/gin"
)

func (handler httpHandler) getList(ctx *gin.Context) {
	photoId := ctx.Query("id")
	if photoId != "" {

		listing, err := handler.repo.GetListsByPhotoId(photoId)
		if err != nil {
			ctx.JSON(500, model.NewReponse(0, "error", "somethign went wrong"))
			return
		}
		ctx.JSON(200, model.NewReponse(1, "ok", listing))
		return
	}
	listings, err := handler.repo.GetAll()
	if err != nil {
		ctx.JSON(500, model.NewReponse(0, "error", "somethign went wrong"))
		return
	}

	ctx.JSON(200, model.NewReponse(1, "ok", listings))
}
func (handler httpHandler) addList(ctx *gin.Context) {

	var ll model.Listing
	if err := ctx.BindJSON(&ll); err != nil {
		log.Println(ll)
		ctx.JSON(400, model.NewReponse(0, "error", "bad request"))
		return
	}

	listing, err := handler.repo.CreateList(ll.Name)

	if err != nil {
		ctx.JSON(500, model.NewReponse(0, "error", "somethign went wrong"))
		return
	}

	ctx.JSON(200, model.NewReponse(1, "ok", listing))
}

func (handler httpHandler) editList(ctx *gin.Context) {
	var ll model.Listing
	if err := ctx.BindJSON(&ll); err != nil {
		ctx.JSON(400, model.NewReponse(0, "error", "bad request"))
		return
	}

	if err := handler.repo.UpdateList(ll.Id, ll.Name); err != nil {
		ctx.JSON(500, model.NewReponse(0, "error", "somethign went wrong"))
		return
	}

	ctx.JSON(200, model.NewReponse(1, "ok", ll))
}

func (handler httpHandler) deleteList(ctx *gin.Context) {
	var ll model.Listing
	if err := ctx.BindJSON(&ll); err != nil {
		ctx.JSON(400, model.NewReponse(0, "error", "bad request"))
		return
	}

	if err := handler.repo.DeleteList([]uint{ll.Id}); err != nil {
		ctx.JSON(500, model.NewReponse(0, "error", "somethign went wrong"))
		return
	}

	ctx.JSON(200, model.NewReponse(1, "ok", ll))
}
