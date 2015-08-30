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
	playerName := r.URL.Query().Get("PlayerName")
	var g *game.Game
	if len(game.Games) > 0 {
		g = game.Games[game.MasterGame]
	} else {
		g = game.NewGame("MasterGame")
	}
	p := game.NewPlayer(playerName, g.GetId())
	game := map[string]string{
		"game_id":   g.GetId(),
		"player_id": p.GetId(),
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
