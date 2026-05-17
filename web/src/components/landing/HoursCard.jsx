import { useState, useEffect } from 'react'
import { useSiteInfo } from '../../hooks/useSiteInfo'

const DAY_KEYS  = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom']
const DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

function buildSchedule(opening_hours) {
    if (!opening_hours) return []
    return DAY_KEYS.map((key, i) => {
        const val = (opening_hours[key] || 'cerrado').trim().toLowerCase()
        if (val === 'cerrado' || val === 'closed') {
            return { name: DAY_NAMES[i], closed: true, label: 'Cerrado' }
        }
        const [open, close] = val.split('-')
        const openH  = parseFloat(open?.replace(':', '.'))
        const closeH = parseFloat(close?.replace(':', '.'))
        return { name: DAY_NAMES[i], open: openH, close: closeH, closed: false, label: val }
    })
}

export default function HoursCard() {
    const { siteInfo } = useSiteInfo()
    const schedule = buildSchedule(siteInfo?.opening_hours)
    const todayIndex = (new Date().getDay() + 6) % 7

    const [status, setStatus] = useState({ text: 'Cargando…', color: '#666' })

    useEffect(() => {
        if (schedule.length === 0) return
        const check = () => {
            const now = new Date()
            const hour = now.getHours() + now.getMinutes() / 60
            const today = schedule[todayIndex]
            if (today.closed) {
                setStatus({ text: 'Cerrado hoy', color: '#a41000' })
            } else if (hour >= today.open && hour < today.close) {
                setStatus({ text: 'Abierto ahora', color: '#d87a22' })
            } else if (hour < today.open) {
                setStatus({ text: `Abre a las ${today.label.split('-')[0]}`, color: '#f1800f' })
            } else {
                setStatus({ text: 'Cerrado', color: '#E74C3C' })
            }
        }
        check()
        const interval = setInterval(check, 60000)
        return () => clearInterval(interval)
    }, [todayIndex, siteInfo])

    if (schedule.length === 0) return null

    return (
        <div className="hours-container">
            <div className="hours-card">
                <div className="hours-status-box">
                    <div className="hours-status-badge">
                        <span className="hours-status-dot" style={{ background: status.color, boxShadow: `0 0 8px ${status.color}` }} />
                        <span className="hours-status-text">{status.text}</span>
                    </div>
                </div>

                <div className="hours-grid">
                    {schedule.map((day, idx) => {
                        const isToday  = idx === todayIndex
                        const isClosed = day.closed
                        return (
                            <div key={day.name} className={`hours-row ${isToday ? 'today' : ''} ${isClosed ? 'closed' : ''}`}>
                                <div className="flex items-center gap-2">
                                    {isToday && <span className="today-dot">●</span>}
                                    <span className="day-name">{day.name}</span>
                                </div>
                                <span className="day-time">{isClosed ? 'Cerrado' : day.label}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
