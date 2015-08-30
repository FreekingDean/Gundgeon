package game

import ()

type Player struct {
	Name     string
	Position Position
	Friends  Players
	Room     *Room
	id       string
	//Bag    Items
}

type Players map[string]*Player

type PlayerMovement struct {
	PlayerId string
	OldPos   Position
	NewPos   Position
	Up       bool
	Down     bool
	Right    bool
	Left     bool
}

func NewPlayer(playerName string, gameId string) *Player {
	id := newId()
	for Games[id] != nil {
		id = newId()
	}
	room := Games[gameId].StartRoom
	player := &Player{
		Name: playerName,
		id:   id,
		Room: room,
		Position: Position{
			X: 0,
			Y: 0,
		},
	}
	Games[gameId].players[id] = player
	return player
}

func (p *Player) GetId() string {
	return p.id
}
