package web

import (
	"html/template"
	"net/http"

	"github.com/gorilla/csrf"
)

type LegalHandler struct{}

func (h *LegalHandler) Privacy() http.HandlerFunc {
	tmpl := template.Must(template.ParseFiles("static/templates/layout.html", "static/templates/legal/privacy.html"))
	type data struct{ CSRF template.HTML }
	return func(w http.ResponseWriter, r *http.Request) {
		tmpl.Execute(w, data{CSRF: csrf.TemplateField(r)})
	}
}

func (h *LegalHandler) Impressum() http.HandlerFunc {
	tmpl := template.Must(template.ParseFiles("static/templates/layout.html", "static/templates/legal/impressum.html"))
	type data struct{ CSRF template.HTML }
	return func(w http.ResponseWriter, r *http.Request) {
		tmpl.Execute(w, data{CSRF: csrf.TemplateField(r)})
	}
}

func (h *LegalHandler) AGB() http.HandlerFunc {
	tmpl := template.Must(template.ParseFiles("static/templates/layout.html", "static/templates/legal/agb.html"))
	type data struct{ CSRF template.HTML }
	return func(w http.ResponseWriter, r *http.Request) {
		tmpl.Execute(w, data{CSRF: csrf.TemplateField(r)})
	}
}

func (h *LegalHandler) Accessibility() http.HandlerFunc {
	tmpl := template.Must(template.ParseFiles("static/templates/layout.html", "static/templates/legal/accessibility.html"))
	type data struct{ CSRF template.HTML }
	return func(w http.ResponseWriter, r *http.Request) {
		tmpl.Execute(w, data{CSRF: csrf.TemplateField(r)})
	}
}

func (h *LegalHandler) Copyright() http.HandlerFunc {
	tmpl := template.Must(template.ParseFiles("static/templates/layout.html", "static/templates/legal/copyright.html"))
	type data struct{ CSRF template.HTML }
	return func(w http.ResponseWriter, r *http.Request) {
		tmpl.Execute(w, data{CSRF: csrf.TemplateField(r)})
	}
}

func (h *LegalHandler) License() http.HandlerFunc {
	tmpl := template.Must(template.ParseFiles("static/templates/layout.html", "static/templates/legal/license.html"))
	type data struct{ CSRF template.HTML }
	return func(w http.ResponseWriter, r *http.Request) {
		tmpl.Execute(w, data{CSRF: csrf.TemplateField(r)})
	}
}
