// mail service
export const mailService = {
    addDemoIfEmpty,
    query,
    getById,
    toggleRead,
    remove,
    getUnreadCount,
    save,          // ← חדש
    resetDemo,     // ← חדש
}

const MAIL_KEY = 'mailDB'
const loggedinUser = { email: 'user@appsus.com', fullname: 'Appsus User' }

function addDemoIfEmpty() {
    const exist = JSON.parse(localStorage.getItem(MAIL_KEY))
    if (exist && exist.length) return
    const demo = [
        { id: 'm101', subject: 'ברוך הבא', body: 'בהצלחה בספרינט', from: 'mentor@coding.academy', to: loggedinUser.email, isRead: false, removedAt: null, sentAt: null, createdAt: Date.now() },
        { id: 'm102', subject: 'בדיקה', body: 'Mail דמו', from: loggedinUser.email, to: 'friend@appsus.com', isRead: true, removedAt: null, sentAt: Date.now(), createdAt: Date.now() }
    ]
    localStorage.setItem(MAIL_KEY, JSON.stringify(demo))
}

function _load() { return JSON.parse(localStorage.getItem(MAIL_KEY)) || [] }
function _save(m) { localStorage.setItem(MAIL_KEY, JSON.stringify(m)) }

function query(filterBy = {}) {
    let mails = _load()
    const status = filterBy.status || 'inbox'
    mails = mails.filter(m => {
        if (status === 'inbox') return !m.removedAt && m.to === loggedinUser.email
        if (status === 'sent') return !m.removedAt && m.from === loggedinUser.email
        if (status === 'trash') return !!m.removedAt
        if (status === 'draft') return !!m.isDraft
    })
    return Promise.resolve(mails)
}

function getById(id) {
    const mail = _load().find(m => m.id === id)
    return Promise.resolve(mail)
}

function toggleRead(id, isRead) {
    const mails = _load()
    const mail = mails.find(m => m.id === id)
    if (mail) mail.isRead = (typeof isRead === 'boolean') ? isRead : !mail.isRead
    _save(mails)
    return Promise.resolve(mail)
}

function remove(id) { // ל-Trash
    const mails = _load()
    const mail = mails.find(m => m.id === id)
    if (mail) mail.removedAt = Date.now()
    _save(mails)
    return Promise.resolve()
}

function getUnreadCount() {
    const mails = _load()
    const count = mails.filter(m =>
        !m.removedAt && m.to === loggedinUser.email && !m.isRead
    ).length
    return Promise.resolve(count)
}

// -------- חדש: יצירת מייל (נכנס ל-Sent) --------
function save({ to, subject, body }) {
    const mails = _load()
    const mail = {
        id: _makeId(),
        from: loggedinUser.email,
        to,
        subject: subject || '',
        body: body || '',
        isRead: true,           // ב-Sent זה כבר נקרא 
        removedAt: null,
        sentAt: Date.now(),
        createdAt: Date.now(),
    }
    mails.unshift(mail) // מקדימה
    _save(mails)
    return Promise.resolve(mail)
}

// -------- חדש: איפוס ודמו --------
function resetDemo() {
    localStorage.removeItem(MAIL_KEY)
    addDemoIfEmpty()
    return Promise.resolve()
}

function _makeId(len = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let id = ''
    for (let i = 0; i < len; i++) id += chars.charAt(Math.floor(Math.random() * chars.length))
    return id
}
