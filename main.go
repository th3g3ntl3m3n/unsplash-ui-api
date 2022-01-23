package main

import (
	"fmt"
	"log"
	"os"

	"server/apihandler"
	"server/database"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type PhotoList struct {
	Id        int      `json:"id,omitempty"`
	Name      string   `json:"name,omitempty"`
	CreatedAt string   `json:"created_at,omitempty"`
	Photos    []string `json:"photos,omitempty"`
}

type ListType []PhotoList

var db *gorm.DB

func getListing() ListType {
	var lp = ListType{}
	db.Raw("SELECT id,name FROM lists").Scan(&lp)
	return lp
}

func main() {
	godotenv.Load()
	DB_NAME := os.Getenv("DB_NAME")
	DB_USER := os.Getenv("DB_USER")
	DB_HOST := os.Getenv("DB_HOST")
	DB_PORT := os.Getenv("DB_PORT")
	DB_PASS := os.Getenv("DB_PASS")
	router := gin.Default()
	router.SetTrustedProxies([]string{"127.0.0.1"})
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Kolkata", DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT)
	dbc, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Println(err)
	}

	db = dbc
	log.Println("HERE IS YOUR DB", db, dbc)

	api := router.Group("/api")

	// /api

	repo := database.NewRepository(db)

	apihandler.NewHttpHandler(repo, api)

	router.Run(":9099")
}

// func main() {
// 	const MAX_NUM = 50
// 	jobs := make(chan int, MAX_NUM)
// 	results := make(chan int, MAX_NUM)

// 	go worker(jobs, results)
// 	go worker(jobs, results)
// 	go worker(jobs, results)
// 	go worker(jobs, results)
// 	go worker(jobs, results)

// 	for i := 1; i <= MAX_NUM; i++ {
// 		jobs <- i
// 	}
// 	close(jobs)

// 	for i := 1; i <= MAX_NUM; i++ {
// 		fmt.Println(<-results)
// 	}
// }

// func worker(jobs <-chan int, results chan<- int) {
// 	for n := range jobs {
// 		results <- fib(n)
// 	}
// }

// func fib(n int) int {
// 	if n <= 1 {
// 		return n
// 	}
// 	return fib(n-1) + fib(n-2)
// }
