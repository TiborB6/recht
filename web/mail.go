package web

import "gopkg.in/gomail.v2"

func SendEmail(mailData ContactModelForm) error {
	m := gomail.NewMessage()
	m.SetHeader("From", "v.stoelner@gmx.at")
	m.SetHeader("To", "v.stoelner@gmx.at")
	m.SetHeader("Subject", "Gartenpflege Anfrage")

	bodyText := `<h1>Anfrage</h1>
		<p>` + mailData.Name + `</p>
		<p>` + mailData.Email + `</p>
		<p>` + mailData.Tel + `</p>
		<br>
		<p>` + mailData.Message + `</p>`

	m.SetBody("text/html", bodyText)

	d := gomail.NewDialer("mail.gmx.net", 587, "v.stoelner@gmx.at", "")

	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil
}
