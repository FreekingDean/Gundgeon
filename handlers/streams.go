package handlers

import (
	"encoding/json"
	"github.com/gorilla/websocket"
	"net/http"

	"../game"
)

var (
	PLAYER_NOT_FOUND = map[string]interface{}{
		"success":  false,
		"error":    "Player not found",
		"code":     "not_found",
		"resource": "player",
	}
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func PlayerStream(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for {
		messageType, p, err := conn.ReadMessage()
		var pq game.PlayerRequest
		json.Unmarshal(p, &pq)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		var resp interface{}
		if player := game.GetMasterGame().FindPlayer(pq.PlayerId); player != nil {
			//resp = game.MovePlayer(player, pq.MoveRequest)
		} else {
			resp = PLAYER_NOT_FOUND
		}
		respString, _ := json.Marshal(resp)
		if err = conn.WriteMessage(messageType, respString); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
