package unsplash

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"server/model"

	"github.com/gin-gonic/gin"
)

type UnsplashApi struct {
	clientID string
}

func NewUnsplashApi(clientID string) *UnsplashApi {
	return &UnsplashApi{clientID}
}

func (api UnsplashApi) randomImagesApi() (string, error) {
	if len(api.clientID) < 1 {
		return "", fmt.Errorf("error: no config provided")
	}
	return fmt.Sprintf("https://api.unsplash.com/photos/?per_page=15&client_id=%s", api.clientID), nil
}

func (api UnsplashApi) searchImagesApi(searchTerm string) (string, error) {
	if len(api.clientID) < 1 {
		return "", fmt.Errorf("error: no config provided")
	}
	return fmt.Sprintf("https://api.unsplash.com/search/photos/?per_page=15&client_id=%s&query=%s", api.clientID, searchTerm), nil
}

func (api UnsplashApi) GetImagesBySearch(ctx *gin.Context) {
	queryString := ctx.Query("query")

	if len(queryString) < 1 {
		ctx.JSON(400, model.NewReponse(0, "bad", "bad request"))
		return
	}

	url, err := api.searchImagesApi(queryString)
	if err != nil {
		ctx.JSON(500, model.NewReponse(0, "bad", err))
		return
	}

	resp, err := http.Get(url)
	if err != nil {
		log.Println(err)
	}

	var responseImages model.SearchResponseOb

	err = json.NewDecoder(resp.Body).Decode(&responseImages)
	if err != nil {
		ctx.JSON(500, model.NewReponse(0, "bad", "internal server error"))
		return
	}

	defer resp.Body.Close()

	ctx.JSON(200, model.NewReponse(1, "ok", responseImages))
}

func (api UnsplashApi) GetImages(ctx *gin.Context) {

	url, err := api.randomImagesApi()
	if err != nil {
		ctx.JSON(500, model.NewReponse(0, "bad", err))
		return
	}

	resp, err := http.Get(url)
	if err != nil {
		log.Println(err)
	}

	var responseImages = []model.UnsplashPhoto{}

	err = json.NewDecoder(resp.Body).Decode(&responseImages)

	if err != nil {
		ctx.JSON(500, model.NewReponse(0, "bad", "internal server error"))
		return
	}

	defer resp.Body.Close()

	ctx.JSON(200, model.NewReponse(1, "ok", responseImages))
}
