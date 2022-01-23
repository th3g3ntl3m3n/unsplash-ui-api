package apihandler

import (
	"os"
	"server/database"
	"server/external/unsplash"

	"github.com/gin-gonic/gin"
)

type httpHandler struct {
	repo database.Database
}

func NewHttpHandler(repo database.Database, router *gin.RouterGroup) {
	handler := httpHandler{repo}

	unspApi := unsplash.NewUnsplashApi(os.Getenv("UNSPLASH_CLIENT_ID"))

	router.GET("", unspApi.GetImages)
	router.GET("/search", unspApi.GetImagesBySearch)

	listsRouter := router.Group("/lists")
	listsRouter.GET("", handler.getList)
	listsRouter.POST("", handler.addList)
	listsRouter.PUT("", handler.editList)
	listsRouter.DELETE("", handler.deleteList)

	photoRouter := listsRouter.Group("/photos")
	photoRouter.GET("", handler.getPhoto)
	photoRouter.POST("", handler.addPhote)
	photoRouter.DELETE("", handler.deletePhote)

}
