export function MailFolderList({ status, onSet }) {
  const curr = status || 'inbox'
  const Btn = (val, txt) =>
    <button className={curr===val ? 'active' : ''} onClick={() => onSet(val)}>{txt}</button>

  return (
    <aside className="mail-folders">
      {Btn('inbox','Inbox')}
      {Btn('sent','Sent')}
      {Btn('trash','Trash')}
      {Btn('draft','Draft')}
    </aside>
  )
}
