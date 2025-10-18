// apps/mail/pages/MailIndex.jsx
import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'

export function MailIndex() {
  const [mails, setMails] = React.useState([])
  const [filterBy, setFilterBy] = React.useState({ status: 'inbox' })

  React.useEffect(() => {
    mailService.addDemoIfEmpty()
    mailService.query(filterBy).then(setMails)
  }, [filterBy])

  function onOpen(mail) {
    console.log('open mail:', mail.id) // בשלב הבא נפתח Details + סימון נקרא
  }

  return (
    <section className="mail-index">
      <h2>misterEmail</h2>

      <div className="mail-layout">
        <MailFolderList
          status={filterBy.status}
          onSet={val => setFilterBy({ ...filterBy, status: val })}
        />
        <div className="mail-main">
          <MailList mails={mails} onOpen={onOpen}/>
        </div>
      </div>
    </section>
  )
}
