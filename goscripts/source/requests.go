package game

type PlayerRequest struct {
	PlayerId  string
	Movements MoveRequest
}

type MoveRequest struct {
	left  bool
	right bool
	up    bool
	down  bool
}
