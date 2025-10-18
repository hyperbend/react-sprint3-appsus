
import { mailService } from '../services/mail.service.js'

export function MailIndex() {
  const [mails, setMails] = React.useState([])

  React.useEffect(() => {
    console.log('MailIndex mounted')            // עוזר לבדוק שזה רץ
    mailService.addDemoIfEmpty()
    mailService.query({ status:'inbox' }).then(ms => {
      console.log('loaded mails:', ms)          // תראה בקונסול מה הגיע
      setMails(ms)
    })
  }, [])

  return (
    <section className="mail-index">
      <h2>misterEmail</h2>
      <ul>
        {mails.map(m => <li key={m.id}>{m.subject}</li>)}
      </ul>
    </section>
  )
}
