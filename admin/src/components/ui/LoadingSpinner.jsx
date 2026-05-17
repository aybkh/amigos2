// Spinner de carga centrado en pantalla o en contenedor
export default function LoadingSpinner({ fullScreen = false }) {
  const wrapper = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white/80 z-40'
    : 'flex items-center justify-center py-16'

  return (
    <div className={wrapper}>
      <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
    </div>
  )
}
