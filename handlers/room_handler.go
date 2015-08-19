package handlers

import (
	"../game"
	"net/http"

	"encoding/json"
	"log"
)

func NewRoom(w http.ResponseWriter, r *http.Request) {
	roomHash := r.URL.Query().Get("RoomHash")
	gameId := r.URL.Query().Get("GameId")

	room, err := game.BuildRoom(roomHash)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	gamez := game.FindGame(gameId).AddRoom(room)

	js, err := json.Marshal(room)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}
