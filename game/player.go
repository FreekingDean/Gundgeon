package game

import ()

type Player struct {
	Name     string
	Position Position
	Friends  Players
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
