export function MailCompose({ onSend, onCancel }) {
  const [to, setTo] = React.useState('')
  const [subject, setSubject] = React.useState('')
  const [body, setBody] = React.useState('')

  function onSubmit(ev) {
    ev.preventDefault()
    onSend({ to, subject, body })
  }

  return (
    <section className="mail-compose">
      <h3>New message</h3>
      <form onSubmit={onSubmit}>
        <div><label>To: </label><input value={to} onChange={ev => setTo(ev.target.value)} required/></div>
        <div><label>Subject: </label><input value={subject} onChange={ev => setSubject(ev.target.value)} /></div>
        <div><textarea rows="6" value={body} onChange={ev => setBody(ev.target.value)} placeholder="Write your email..."/></div>
        <div className="actions">
          <button type="submit">Send</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </section>
  )
}
