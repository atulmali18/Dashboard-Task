import React, { useEffect } from 'react'

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose && onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div className="relative card w-full max-w-lg p-5" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="flex items-start justify-between gap-4">
          <h3 id="modal-title" className="text-lg font-semibold">{title}</h3>
          <button className="btn" onClick={onClose} aria-label="Close dialog">Close</button>
        </div>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  )
}


