package handlers

import (
	"net/http"

	"encoding/json"
	"fmt"
	"log"

	"crypto/md5"
	"math/big"
	"math/rand"
)

type Room struct {
	Width  int
	Height int
	PadX   int
	PadY   int
	Rando  int

	MD5 string
}

func NewRoom(w http.ResponseWriter, r *http.Request) {
	roomHash := r.URL.Query().Get("RoomHash")

	bi := big.NewInt(0)
	bi.SetString(roomHash, 16)
	seed := bi.Uint64()

	log.Println(int64(seed))

	rand.Seed(int64(seed))
	room := &Room{
		Width:  rand.Intn(19) + 2,
		Height: rand.Intn(19) + 2,
		Rando:  rand.Intn(10000), //For added entropy
	}
	room.PadX = (20 - room.Width) / 2
	room.PadY = (20 - room.Height) / 2

	js, err := json.Marshal(room)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	room.MD5 = fmt.Sprintf("%x", md5.Sum(js))

	js, err = json.Marshal(room)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}
