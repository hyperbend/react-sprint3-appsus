export function MailPreview({ mail, onOpen }) {
  const unread = !mail.isRead
  function handleClick() {
    if (typeof onOpen === 'function') onOpen(mail)
  }

  return (
    <article
      className={'mail-preview ' + (unread ? 'unread' : 'read')}
      onClick={handleClick}
    >
      <strong>{mail.subject || '(No subject)'}</strong>
      <span> — {(mail.body || '').slice(0, 60)}</span>
    </article>
  )
}
