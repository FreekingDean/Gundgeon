package main

import (
	"net/http"
)

func main() {
	r := NewRouter()
	http.Handle("/", r)
	http.ListenAndServe(":8080", nil)
}
