export interface GooeyParticleOptions {
  animationTime?: number
  particleCount?: number
  particleDistances?: [number, number]
  particleR?: number
  timeVariance?: number
  colors?: number[]
  showPill?: boolean
}

interface ParticleConfig {
  start: [number, number]
  end: [number, number]
  time: number
  scale: number
  color: number
  rotate: number
}

const DEFAULT_OPTIONS: Required<GooeyParticleOptions> = {
  animationTime: 600,
  particleCount: 15,
  particleDistances: [90, 10],
  particleR: 100,
  timeVariance: 300,
  colors: [1, 2, 3, 1, 2, 3, 1, 4],
  showPill: false,
}

const noise = (n = 1) => n / 2 - Math.random() * n

const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
  const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180)
  return [distance * Math.cos(angle), distance * Math.sin(angle)]
}

const createParticle = (
  i: number,
  t: number,
  options: Required<GooeyParticleOptions>,
): ParticleConfig => {
  const { particleCount, particleDistances: d, particleR: r, colors } = options
  const rotate = noise(r / 10)

  return {
    start: getXY(d[0], particleCount - i, particleCount),
    end: getXY(d[1] + noise(7), particleCount - i, particleCount),
    time: t,
    scale: 1 + noise(0.2),
    color: colors[Math.floor(Math.random() * colors.length)],
    rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
  }
}

export function positionGooeyEffect(
  container: HTMLElement,
  effect: HTMLElement,
  anchor: HTMLElement,
) {
  const containerRect = container.getBoundingClientRect()
  const pos = anchor.getBoundingClientRect()

  Object.assign(effect.style, {
    left: `${pos.x - containerRect.x}px`,
    top: `${pos.y - containerRect.y}px`,
    width: `${pos.width}px`,
    height: `${pos.height}px`,
  })
}

export function playGooeyBurst(
  effect: HTMLElement,
  options: GooeyParticleOptions = {},
) {
  const config = { ...DEFAULT_OPTIONS, ...options }
  const bubbleTime = config.animationTime * 2 + config.timeVariance

  effect.style.setProperty('--time', `${bubbleTime}ms`)
  effect.classList.remove('is-active')

  const existingParticles = effect.querySelectorAll('.gooey-burst__particle')
  existingParticles.forEach((particle) => {
    particle.remove()
  })

  for (let i = 0; i < config.particleCount; i++) {
    const t = config.animationTime * 2 + noise(config.timeVariance * 2)
    const p = createParticle(i, t, config)

    setTimeout(() => {
      const particle = document.createElement('span')
      const point = document.createElement('span')

      particle.className = 'gooey-burst__particle'
      particle.style.setProperty('--start-x', `${p.start[0]}px`)
      particle.style.setProperty('--start-y', `${p.start[1]}px`)
      particle.style.setProperty('--end-x', `${p.end[0]}px`)
      particle.style.setProperty('--end-y', `${p.end[1]}px`)
      particle.style.setProperty('--time', `${p.time}ms`)
      particle.style.setProperty('--scale', `${p.scale}`)
      particle.style.setProperty('--color', `var(--color-${p.color}, white)`)
      particle.style.setProperty('--rotate', `${p.rotate}deg`)

      point.className = 'gooey-burst__point'
      particle.appendChild(point)
      effect.appendChild(particle)

      requestAnimationFrame(() => {
        if (config.showPill) {
          effect.classList.add('is-active')
        }
      })

      setTimeout(() => {
        particle.remove()
      }, t)
    }, 30)
  }
}
