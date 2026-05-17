const DAYS = [
  { key: 'lun', label: 'Lunes' },
  { key: 'mar', label: 'Martes' },
  { key: 'mie', label: 'Miércoles' },
  { key: 'jue', label: 'Jueves' },
  { key: 'vie', label: 'Viernes' },
  { key: 'sab', label: 'Sábado' },
  { key: 'dom', label: 'Domingo' },
]

function parseDay(value) {
  if (!value || value === 'cerrado') {
    return { open: false, t1from: '13:00', t1to: '23:00', hasT2: false, t2from: '00:00', t2to: '03:00' }
  }
  // Legacy string format: "13:00-23:00"
  if (typeof value === 'string') {
    const [t1from = '13:00', t1to = '23:00'] = value.split('-')
    return { open: true, t1from, t1to, hasT2: false, t2from: '00:00', t2to: '03:00' }
  }
  // New object format: { t1: "12:30-23:59", t2: "00:00-03:00" }
  const [t1from = '13:00', t1to = '23:00'] = (value.t1 || '13:00-23:00').split('-')
  const hasT2 = !!value.t2
  const [t2from = '00:00', t2to = '03:00'] = hasT2 ? (value.t2).split('-') : []
  return { open: true, t1from, t1to, hasT2, t2from, t2to }
}

function serializeDay({ open, t1from, t1to, hasT2, t2from, t2to }) {
  if (!open) return 'cerrado'
  return { t1: `${t1from}-${t1to}`, t2: hasT2 ? `${t2from}-${t2to}` : null }
}

const timeInputCls = 'border border-stone-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400'

export default function HoursEditor({ value = {}, onChange }) {
  function update(key, patch) {
    const current = parseDay(value[key])
    const updated = serializeDay({ ...current, ...patch })
    onChange({ ...value, [key]: updated })
  }

  return (
    <div className="space-y-2">
      {DAYS.map(({ key, label }) => {
        const { open, t1from, t1to, hasT2, t2from, t2to } = parseDay(value[key])
        return (
          <div key={key} className="p-3 bg-stone-50 rounded-lg">

            {/* Row principal */}
            <div className="flex items-center gap-3">
              <span className="w-24 flex-shrink-0 text-sm font-medium text-stone-700">{label}</span>

              {/* Toggle ON/OFF */}
              <button
                type="button"
                onClick={() => update(key, { open: !open })}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
                  open ? 'bg-amber-500' : 'bg-stone-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  open ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>

              {open ? (
                <div className="flex-1">
                  {/* Turno 1 */}
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="time"
                      value={t1from}
                      onChange={e => update(key, { t1from: e.target.value })}
                      className={timeInputCls}
                    />
                    <span className="text-stone-400">–</span>
                    <input
                      type="time"
                      value={t1to}
                      onChange={e => update(key, { t1to: e.target.value })}
                      className={timeInputCls}
                    />
                    {!hasT2 && (
                      <button
                        type="button"
                        onClick={() => update(key, { hasT2: true })}
                        className="text-xs text-amber-600 hover:text-amber-700 font-medium border border-amber-300 hover:border-amber-400 rounded px-2 py-1 transition-colors"
                      >
                        + 2º turno
                      </button>
                    )}
                  </div>

                  {/* Turno 2 (opcional) */}
                  {hasT2 && (
                    <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-stone-200">
                      <span className="text-xs text-stone-400 w-14 flex-shrink-0">2º turno</span>
                      <input
                        type="time"
                        value={t2from}
                        onChange={e => update(key, { t2from: e.target.value })}
                        className={timeInputCls}
                      />
                      <span className="text-stone-400">–</span>
                      <input
                        type="time"
                        value={t2to}
                        onChange={e => update(key, { t2to: e.target.value })}
                        className={timeInputCls}
                      />
                      <button
                        type="button"
                        onClick={() => update(key, { hasT2: false })}
                        className="text-xs text-stone-400 hover:text-red-500 transition-colors font-medium"
                        aria-label="Eliminar 2º turno"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-sm text-stone-400 italic">Cerrado</span>
              )}
            </div>

          </div>
        )
      })}
    </div>
  )
}
