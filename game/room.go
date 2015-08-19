package game

import (
	"crypto/md5"
	"encoding/json"
	"fmt"
	"log"
	"math/big"
	"math/rand"
)

type Room struct {
	Width   int
	Height  int
	PadX    int
	PadY    int
	ExitPos Position
	MD5     string //How to create the room

	id    string //How to refrence the room
	rando int
}

type Rooms map[string]*Room

func BuildRoom(roomHash string) (*Room, error) {
	bi := big.NewInt(0)
	bi.SetString(roomHash, 16)
	seed := bi.Uint64()

	log.Println(int64(seed))

	rand.Seed(int64(seed))
	room := &Room{
		Width:  rand.Intn(18) + 3,
		Height: rand.Intn(18) + 3,
		rando:  rand.Intn(10000), //For added entropy
	}

	if exitSide := rand.Intn(4); exitSide%2 == 0 {
		room.ExitPos = Position{
			X: rand.Intn(room.Width) + 1,
			Y: (((exitSide + 1) % 2) * (room.Height - 1)) + 1,
		}
	} else {
		room.ExitPos = Position{
			X: (((exitSide + 1) % 2) * (room.Width - 1)) + 1,
			Y: rand.Intn(room.Height) + 1,
		}
	}
	room.PadX = (20 - room.Width) / 2
	room.PadY = (20 - room.Height) / 2

	js, err := json.Marshal(room)
	if err != nil {
		return nil, err
	}

	room.MD5 = fmt.Sprintf("%x", md5.Sum(js))
	return room, nil
}
