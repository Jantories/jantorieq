export type SparkleColor = [number, number, number, number]

export interface InkSparkle {
  spawn: (clientX: number, clientY: number) => void
  resize: () => void
  destroy: () => void
}

interface Ripple {
  startTime: number
  centerX: number
  centerY: number
  maxRadius: number
  circles: [number, number][]
  angleOffsets: number[]
  angleSpeeds: number[]
}

const DURATION_MS = 1400
const MAX_RIPPLES = 12

const UNIFORM_NAMES = [
  'u_size',
  'u_composite_1',
  'u_circle1',
  'u_rotation1',
  'u_circle2',
  'u_rotation2',
  'u_circle3',
  'u_rotation3',
  'u_resolution_scale',
  'u_noise_scale',
  'u_max_radius',
  'u_center',
  'u_noise_phase',
  'u_color',
] as const

type UniformName = (typeof UNIFORM_NAMES)[number]

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1)
  return t * t * (3 - 2 * t)
}

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) throw new Error('Unable to create shader')
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(`Shader compile failed: ${log}`)
  }
  return shader
}

export function createInkSparkle(
  canvas: HTMLCanvasElement,
  fragmentSource: string,
  vertexSource: string,
  color: SparkleColor,
): InkSparkle | null {
  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true })
  if (!gl) return null

  const program = gl.createProgram()
  if (!program) return null
  let vertexShader: WebGLShader | null = null
  let fragmentShader: WebGLShader | null = null
  try {
    vertexShader = compile(gl, gl.VERTEX_SHADER, vertexSource)
    fragmentShader = compile(gl, gl.FRAGMENT_SHADER, fragmentSource)
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`Program link failed: ${gl.getProgramInfoLog(program)}`)
    }
  } catch (error) {
    if (vertexShader) gl.deleteShader(vertexShader)
    if (fragmentShader) gl.deleteShader(fragmentShader)
    gl.deleteProgram(program)
    throw error
  }
  gl.useProgram(program)

  const uniforms = {} as Record<UniformName, WebGLUniformLocation | null>
  for (const name of UNIFORM_NAMES) uniforms[name] = gl.getUniformLocation(program, name)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const positionLocation = gl.getAttribLocation(program, 'a_position')
  gl.enableVertexAttribArray(positionLocation)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

  let ripples: Ripple[] = []
  let frame = 0
  let width = 1
  let height = 1
  let dpr = 1

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.getBoundingClientRect()
    width = Math.max(1, Math.round(rect.width * dpr))
    height = Math.max(1, Math.round(rect.height * dpr))
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }
    gl.viewport(0, 0, width, height)
  }

  const draw = (now: number) => {
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    ripples = ripples.filter((r) => now - r.startTime < DURATION_MS)

    gl.uniform2f(uniforms.u_size, width, height)
    gl.uniform2f(uniforms.u_resolution_scale, 1 / width, 1 / height)
    gl.uniform2f(uniforms.u_noise_scale, 1.5 * dpr, 1.5 * dpr)
    gl.uniform4f(uniforms.u_color, color[0], color[1], color[2], color[3])

    for (const ripple of ripples) {
      const elapsed = now - ripple.startTime
      const t = elapsed / DURATION_MS
      const seconds = elapsed / 1000

      const radiusScale = easeOutCubic(Math.min(t / 0.7, 1))
      const fillAlpha = Math.min(t / 0.08, 1) * (1 - smoothstep(0.35, 1, t))
      const sparkleAlpha = Math.min(t / 0.12, 1) * (1 - smoothstep(0.55, 1, t))
      const blur = 0.3 + 0.7 * t

      gl.uniform4f(uniforms.u_composite_1, fillAlpha, sparkleAlpha, blur, radiusScale)
      gl.uniform1f(uniforms.u_max_radius, ripple.maxRadius)
      gl.uniform2f(uniforms.u_center, ripple.centerX, ripple.centerY)
      gl.uniform1f(uniforms.u_noise_phase, seconds * 3)

      const circleLocations = [uniforms.u_circle1, uniforms.u_circle2, uniforms.u_circle3]
      const rotationLocations = [uniforms.u_rotation1, uniforms.u_rotation2, uniforms.u_rotation3]
      for (let i = 0; i < 3; i++) {
        const angle = ripple.angleOffsets[i] + seconds * ripple.angleSpeeds[i]
        gl.uniform2f(circleLocations[i], ripple.circles[i][0], ripple.circles[i][1])
        gl.uniform2f(rotationLocations[i], Math.cos(angle), Math.sin(angle))
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
  }

  const tick = (now: number) => {
    draw(now)
    frame = ripples.length > 0 ? requestAnimationFrame(tick) : 0
  }

  const spawn = (clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect()
    const x = (clientX - rect.left) * dpr
    const y = (clientY - rect.top) * dpr
    const maxRadius = Math.hypot(Math.max(x, width - x), Math.max(y, height - y))
    const now = performance.now()

    ripples.push({
      startTime: now,
      centerX: x,
      centerY: y,
      maxRadius,
      circles: [0, 1, 2].map(() => [Math.random() * 4, Math.random() * 4] as [number, number]),
      angleOffsets: [0, 1, 2].map(() => Math.random() * Math.PI * 2),
      angleSpeeds: [0, 1, 2].map(() => (Math.random() > 0.5 ? 1 : -1) * (0.6 + Math.random() * 0.8)),
    })
    if (ripples.length > MAX_RIPPLES) ripples.shift()
    if (!frame) frame = requestAnimationFrame(tick)
  }

  const handleContextLost = (event: Event) => {
    event.preventDefault()
    cancelAnimationFrame(frame)
    frame = 0
    ripples = []
  }
  canvas.addEventListener('webglcontextlost', handleContextLost)

  resize()

  return {
    spawn,
    resize,
    destroy: () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      cancelAnimationFrame(frame)
      frame = 0
      ripples = []
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteBuffer(buffer)
    },
  }
}
