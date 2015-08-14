package handlers

import (
	"html/template"
	"net/http"
)

func NewGame(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("views/new_game.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	t.Execute(w, nil)
}
