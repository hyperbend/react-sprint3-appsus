import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onOpen }) {
  if (!mails || !mails.length) return <p>אין מיילים</p>

  return (
    <ul className="mail-list">
      {mails.map(m => (
        <li key={m.id}>
          <MailPreview mail={m} onOpen={onOpen} />
        </li>
      ))}
    </ul>
  )
}
