const GESTURE_ATTRIBUTE = 'data-gesture'

let releaseTimer: ReturnType<typeof setTimeout> | undefined

// While a scroll, pull or pinch is running, the holographic shimmer and seal animations pause
// (see globals.css and HoloIdCard) so the main thread only has to serve the gesture.
export function beginGesture() {
  clearTimeout(releaseTimer)
  const root = document.documentElement
  if (!root.hasAttribute(GESTURE_ATTRIBUTE)) root.setAttribute(GESTURE_ATTRIBUTE, '')
}

export function endGesture(delayMs = 200) {
  clearTimeout(releaseTimer)
  releaseTimer = setTimeout(() => document.documentElement.removeAttribute(GESTURE_ATTRIBUTE), delayMs)
}

const layerTimers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>()

// Keeps the element on its own GPU layer while it moves, then lets the browser re-rasterise it
// at the final scale so zoomed text stays sharp.
export function promoteLayer(el: HTMLElement, releaseMs = 260) {
  el.style.willChange = 'transform'
  clearTimeout(layerTimers.get(el))
  layerTimers.set(
    el,
    setTimeout(() => {
      el.style.willChange = ''
    }, releaseMs),
  )
}
