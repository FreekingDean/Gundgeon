package main

import (
	"github.com/gorilla/mux"
	"net/http"

	"./handlers"
)

func NewRouter() (r *mux.Router) {
	r = mux.NewRouter()
	r.HandleFunc("/", handlers.NewGame)
	r.HandleFunc("/room/new", handlers.NewRoom)
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./assets/")))
	return
}
