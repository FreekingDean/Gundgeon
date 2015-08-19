package handlers

import (
	"../game"
	"html/template"
	"net/http"
)

type Page struct {
	GameId string
}

func NewGame(w http.ResponseWriter, r *http.Request) {
	g := game.NewGame("myGame")
	p := Page{
		GameId: g.GetId(),
	}
	t, err := template.ParseFiles("views/new_game.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	t.Execute(w, p)
}
