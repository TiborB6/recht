package main

import (
	"net/http"

	"github.com/TiborB6/baum/web"
)

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	h := web.NewHandler()
	http.Handle("/", h)

	http.ListenAndServe(":3002", nil)
}
