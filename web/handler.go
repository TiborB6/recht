package web

import (
	"fmt"
	"html/template"
	"net/http"

	"github.com/go-chi/chi/v5"
)

type Handler struct {
	chi.Mux
}

func NewHandler() *Handler {
	h := &Handler{
		Mux: *chi.NewMux(),
	}

	legal := LegalHandler{}

	h.Get("/", h.Home())
	h.Get("/services", h.Services())
	h.Get("/kontakt", h.Kontakt())
	h.Post("/kontakt", h.Mail())

	h.Route("/legal", func(r chi.Router) {
		r.Get("/agb", legal.AGB())
		r.Get("/impressum", legal.Impressum())
		r.Get("/privacy", legal.Privacy())
	})

	return h
}

func (h *Handler) Home() http.HandlerFunc {
	tmpl := template.Must(template.ParseFiles("static/templates/layout.html", "static/templates/home.html"))

	return func(w http.ResponseWriter, r *http.Request) {
		tmpl.Execute(w, nil)
	}
}

func (h *Handler) Services() http.HandlerFunc {
	tmpl := template.Must(template.ParseFiles("static/templates/layout.html", "static/templates/services.html"))

	return func(w http.ResponseWriter, r *http.Request) {
		tmpl.Execute(w, nil)
	}
}

func (h *Handler) Kontakt() http.HandlerFunc {
	tmpl := template.Must(template.ParseFiles("static/templates/layout.html", "static/templates/kontakt.html"))

	return func(w http.ResponseWriter, r *http.Request) {
		tmpl.Execute(w, nil)
	}
}

func (h *Handler) Mail() http.HandlerFunc {
	tmplFail := template.Must(template.ParseFiles("static/templates/layout.html", "static/templates/kontakt.html"))
	tmplSuccess := template.Must(template.ParseFiles("static/templates/layout.html", "static/templates/success.html"))

	type data struct {
		ContactModelForm
	}

	return func(w http.ResponseWriter, r *http.Request) {
		form := ContactModelForm{
			Name:    r.FormValue("name"),
			Email:   r.FormValue("email"),
			Tel:     r.FormValue("tel"),
			Message: r.FormValue("message"),
		}

		if !form.Validate() {
			fmt.Print(form.Errors)
			tmplFail.Execute(w, data{
				ContactModelForm: form,
			})
			http.Redirect(w, r, r.Referer(), http.StatusFound)
		}

		err := SendEmail(form)
		if err != nil {
			panic(err)
		}

		tmplSuccess.Execute(w, nil)
	}
}
