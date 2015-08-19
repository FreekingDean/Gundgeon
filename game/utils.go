package game

import (
	"code.google.com/p/go-uuid/uuid"
)

type Position struct {
	X int
	Y int
}

func newId() string {
	return uuid.New()
}
