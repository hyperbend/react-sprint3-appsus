import { mailService }     from '../services/mail.service.js'
import { MailList }        from '../cmps/MailList.jsx'
import { MailFolderList }  from '../cmps/MailFolderList.jsx'
import { MailDetails }     from '../cmps/MailDetails.jsx'
import { MailCompose }     from '../cmps/MailCompose.jsx' 

export function MailIndex() {
  const [mails, setMails] = React.useState([])
  const [filterBy, setFilterBy] = React.useState({ status: 'inbox' })
  const [unread, setUnread] = React.useState(0)
  const [selected, setSelected] = React.useState(null)
  const [isCompose, setIsCompose] = React.useState(false) 

  React.useEffect(() => {
    mailService.addDemoIfEmpty()
    load()
  }, [filterBy])

  function load() {
    mailService.query(filterBy).then(setMails)
    mailService.getUnreadCount().then(setUnread)
  }

  function onOpen(mail) {
    mailService.toggleRead(mail.id, true).then(() => {
      setSelected(mail)
      load()
    })
  }
  function onBack()   { setSelected(null) }
  function onDelete(id) { mailService.remove(id).then(() => { setSelected(null); load() }) }

  // שליחת מייל חדש
  function onSend(mailToSave) {
    mailService.save(mailToSave).then(() => {
      setIsCompose(false)
      setSelected(null)
      setFilterBy({ status: 'sent' }) // אחרי שליחה – עבור ל-Sent
      load()
    })
  }

  // איפוס דמו (כפתור למפתח)
  function onReset() {
    mailService.resetDemo().then(load)
  }

  // מצב פרטים
  if (selected) {
    return (
      <section className="mail-index">
        <header className="mail-header">
          <h2>misterEmail</h2>
          <span>Unread: {unread}</span>
          <div className="spacer" />
          <button onClick={() => setIsCompose(true)}>Compose</button>
          <button onClick={onReset} title="Reset demo">Reset</button>
        </header>

        {isCompose
          ? <MailCompose onSend={onSend} onCancel={() => setIsCompose(false)} />
          : <MailDetails mail={selected} onBack={onBack} onDelete={onDelete} />
        }
      </section>
    )
  }

  // מצב רשימה
  return (
    <section className="mail-index">
      <header className="mail-header">
        <h2>misterEmail</h2>
        <span>Unread: {unread}</span>
        <div className="spacer" />
        <button onClick={() => setIsCompose(true)}>Compose</button>
        <button onClick={onReset} title="Reset demo">Reset</button>
      </header>

      {isCompose ? (
        <MailCompose onSend={onSend} onCancel={() => setIsCompose(false)} />
      ) : (
        <div className="mail-layout">
          <MailFolderList
            status={filterBy.status}
            onSet={val => setFilterBy({ ...filterBy, status: val })}
          />
          <div className="mail-main">
            <MailList mails={mails} onOpen={onOpen} />
          </div>
        </div>
      )}
    </section>
  )
}
