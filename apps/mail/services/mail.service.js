// mail service

export const mailService = { addDemoIfEmpty, query }

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

function query(filterBy = {}) {
    let mails = JSON.parse(localStorage.getItem(MAIL_KEY)) || []
    const status = filterBy.status || 'inbox' // inbox | sent | trash | draft
    mails = mails.filter(m => {
        if (status === 'inbox') return !m.removedAt && m.to === loggedinUser.email
        if (status === 'sent') return !m.removedAt && m.from === loggedinUser.email
        if (status === 'trash') return !!m.removedAt
        if (status === 'draft') return !!m.isDraft
    })
    return Promise.resolve(mails)
}
