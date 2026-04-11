const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (!reduceMotion) {
  let rafId = null
  let latestPoint = null

  const applyPoint = (pointerX, pointerY) => {
    const x = pointerX.toFixed(2)
    const y = pointerY.toFixed(2)
    const xp = (pointerX / window.innerWidth).toFixed(2)
    const yp = (pointerY / window.innerHeight).toFixed(2)
    document.documentElement.style.setProperty('--x', x)
    document.documentElement.style.setProperty('--xp', xp)
    document.documentElement.style.setProperty('--y', y)
    document.documentElement.style.setProperty('--yp', yp)
  }

  const syncPointer = (pointerX, pointerY) => {
    latestPoint = { pointerX, pointerY }
    if (rafId) return

    rafId = requestAnimationFrame(() => {
      if (!latestPoint) {
        rafId = null
        return
      }

      applyPoint(latestPoint.pointerX, latestPoint.pointerY)

      rafId = null
    })
  }

  // Start glow from viewport center so it is visible even before first pointer move.
  applyPoint(window.innerWidth / 2, window.innerHeight / 2)

  window.addEventListener('pointermove', (event) => {
    syncPointer(event.clientX, event.clientY)
  }, { passive: true })

  window.addEventListener('pointerdown', (event) => {
    syncPointer(event.clientX, event.clientY)
  }, { passive: true })

  window.addEventListener('touchmove', (event) => {
    const touch = event.touches && event.touches[0]
    if (!touch) return
    syncPointer(touch.clientX, touch.clientY)
  }, { passive: true })

  window.addEventListener('resize', () => {
    if (!latestPoint) {
      applyPoint(window.innerWidth / 2, window.innerHeight / 2)
    }
  }, { passive: true })
}