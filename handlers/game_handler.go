package handlers

import (
	"../game"
	"encoding/json"
	"html/template"
	"net/http"
)

type Page struct {
	GameId string
}

func NewGame(w http.ResponseWriter, r *http.Request) {
	gameName := r.URL.Query().Get("GameName")
	var g *game.Game
	if g = game.Games[gameName]; g == nil {
		g = game.NewGame(gameName)
	}
	game := map[string]string{
		"id": g.GetId(),
	}

	js, err := json.Marshal(game)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func Game(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("views/new_game.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	t.Execute(w, nil)
}
