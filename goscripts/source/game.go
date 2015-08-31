package game

import ()

type Game struct {
	Name      string
	StartRoom *Room
	rooms     Rooms
	players   Players
	id        string
}

var Games = make(map[string]*Game)
var MasterGame = "master"

func GetMasterGame() *Game {
	return Games[MasterGame]
}

func FindGame(gameId string) *Game {
	return Games[gameId]
}

func NewGame(gameName string) *Game {
	//id := newId()
	id := "master"
	for Games[id] != nil {
		id = newId()
	}
	game := &Game{
		Name:    gameName,
		id:      id,
		rooms:   make(Rooms, 0),
		players: make(Players),
	}
	Games[id] = game
	return game
}

func (g *Game) AddRoom(room *Room) {
	g.rooms[room.id] = room
	g.StartRoom = room
}

func (g *Game) GetId() string {
	return g.id
}

func (g *Game) FindPlayer(playerId string) *Player {
	return g.players[playerId]
}
