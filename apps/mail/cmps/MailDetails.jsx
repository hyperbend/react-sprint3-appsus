export function MailDetails({ mail, onBack, onDelete }) {
  if (!mail) return null

  return (
    <section className="mail-details">
      <button onClick={onBack}>Back</button>
      <h2>{mail.subject || '(No subject)'}</h2>
      <h4>From: {mail.from} → To: {mail.to}</h4>
      <p>{mail.body}</p>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => onDelete(mail.id)}>Delete</button>
      </div>
    </section>
  )
}
