package game

import ()

type Game struct {
	Name  string
	rooms Rooms
	id    string
}

var Games = make(map[string]*Game)

func FindGame(gameId string) *Game {
	return Games[gameId]
}

func NewGame(gameName string) *Game {
	id := newId()
	for Games[id] != nil {
		id = newId()
	}
	game := &Game{
		Name:  gameName,
		id:    id,
		rooms: make(Rooms, 0),
	}
	Games[id] = game
	return game
}

func (g *Game) AddRoom(room *Room) {
	g.rooms[room.id] = room
}

func (g *Game) GetId() string {
	return g.id
}
