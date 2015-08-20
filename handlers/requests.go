package handlers

type PlayerRequest struct {
	movements MoveRequest
}

type MoveRequest struct {
	left  bool
	right bool
	up    bool
	down  bool
}
