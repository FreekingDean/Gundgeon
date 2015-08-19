package main

import (
	"./game"
	"log"
	"net/http"
)

func main() {
	games := game.Games
	log.Println(games)
	r := NewRouter()
	http.Handle("/", r)
	http.ListenAndServe(":8080", nil)
}
