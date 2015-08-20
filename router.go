package main

import (
	"github.com/gorilla/mux"
	"net/http"

	"./handlers"
)

func NewRouter() (r *mux.Router) {
	r = mux.NewRouter()
	r.HandleFunc("/", handlers.Game)
	r.HandleFunc("/room/new", handlers.NewRoom)
	r.HandleFunc("/game/new", handlers.NewGame)
	r.HandleFunc("/stream/player", handlers.PlayerStream)
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./assets/")))
	return
}
