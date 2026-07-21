'use client'

import { useState, type ChangeEvent, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bluetooth,
  Camera,
  Flashlight,
  Moon,
  Plane,
  Signal,
  Smartphone,
  SunMedium,
  Timer,
  Volume2,
  Wifi,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMotionSafe } from '@/components/motion/use-motion-safe'
import { GlassSurface } from './glass-surface'

interface ToggleItem {
  id: string
  label: string
  icon: LucideIcon
  tint: 'primary' | 'accent' | 'warm' | 'cool' | 'neutral'
}

const QUICK_TOGGLES: ToggleItem[] = [
  { id: 'signal', label: 'Signal', icon: Signal, tint: 'accent' },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi, tint: 'primary' },
  { id: 'bluetooth', label: 'Bluetooth', icon: Bluetooth, tint: 'cool' },
  { id: 'airplane', label: 'Airplane', icon: Plane, tint: 'warm' },
]

const ACTION_TOGGLES: ToggleItem[] = [
  { id: 'moon', label: 'Focus', icon: Moon, tint: 'cool' },
  { id: 'flashlight', label: 'Light', icon: Flashlight, tint: 'warm' },
  { id: 'timer', label: 'Timer', icon: Timer, tint: 'primary' },
  { id: 'camera', label: 'Capture', icon: Camera, tint: 'accent' },
]

export const GlassControls = () => {
  const reduceMotion = useMotionSafe()
  const [active, setActive] = useState<Record<string, boolean>>({
    wifi: true,
    bluetooth: true,
    signal: true,
  })
  const [brightness, setBrightness] = useState(62)
  const [volume, setVolume] = useState(44)

  const handleToggle = (id: string) => {
    setActive((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="mx-auto grid w-full max-w-md gap-4 sm:max-w-lg sm:gap-5">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <GlassSurface className="rounded-[2rem] p-3 sm:rounded-[2.25rem] sm:p-4" tint="neutral" breathe>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {QUICK_TOGGLES.map((item) => {
              const Icon = item.icon
              const isOn = Boolean(active[item.id])
              return (
                <GlassSurface
                  key={item.id}
                  asButton
                  active={isOn}
                  tint={isOn ? item.tint : 'neutral'}
                  ariaLabel={`${item.label}, ${isOn ? 'on' : 'off'}`}
                  onClick={() => handleToggle(item.id)}
                  className="aspect-square rounded-full"
                >
                  <div className="flex h-full min-h-16 items-center justify-center sm:min-h-20">
                    <Icon
                      className={cn(
                        'glass-icon h-6 w-6 sm:h-7 sm:w-7',
                        isOn ? 'text-white' : 'text-white/70',
                      )}
                      aria-hidden
                    />
                  </div>
                </GlassSurface>
              )
            })}
          </div>
        </GlassSurface>

        <GlassSurface className="rounded-[2rem] p-4 sm:rounded-[2.25rem] sm:p-5" tint="primary" breathe>
          <div className="flex h-full min-h-[9.5rem] flex-col justify-between sm:min-h-[11rem]">
            <div className="space-y-1 text-left">
              <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-white/55 uppercase">
                DAIEGO
              </p>
              <p className="text-sm font-medium text-white sm:text-base">Liquid ops</p>
              <p className="text-xs text-white/55">Modular glass controls</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              {['prev', 'play', 'next'].map((key) => (
                <GlassSurface
                  key={key}
                  asButton
                  ariaLabel={key}
                  tint="neutral"
                  className="flex h-11 w-11 items-center justify-center rounded-full sm:h-12 sm:w-12"
                  onClick={() => undefined}
                >
                  <span className="text-xs font-semibold tracking-wide text-white/85 uppercase">
                    {key === 'play' ? '▶' : key === 'prev' ? '⟨⟨' : '⟩⟩'}
                  </span>
                </GlassSurface>
              ))}
            </div>
          </div>
        </GlassSurface>
      </div>

      <div className="grid grid-cols-[1fr_auto_auto] gap-3 sm:gap-4">
        <GlassSurface className="rounded-[2rem] px-4 py-3 sm:rounded-[2.25rem] sm:px-5 sm:py-4" tint="cool">
          <div className="flex items-center justify-between gap-3">
            <GlassSurface
              asButton
              active={Boolean(active.moon)}
              tint={active.moon ? 'cool' : 'neutral'}
              ariaLabel={`Focus, ${active.moon ? 'on' : 'off'}`}
              onClick={() => handleToggle('moon')}
              className="flex h-12 w-12 items-center justify-center rounded-full"
            >
              <Moon className="glass-icon h-5 w-5 text-white" aria-hidden />
            </GlassSurface>
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-sm font-semibold text-white">JUST SHIP IT</p>
              <p className="truncate text-xs text-white/50">Focus mode for builders</p>
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={active.moon ? 'on' : 'off'}
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                className="text-[0.65rem] font-semibold tracking-[0.18em] text-primary uppercase"
              >
                {active.moon ? 'On' : 'Off'}
              </motion.span>
            </AnimatePresence>
          </div>
        </GlassSurface>

        <GlassSlider
          label="Brightness"
          value={brightness}
          onChange={setBrightness}
          icon={<SunMedium className="glass-icon h-5 w-5 text-white" aria-hidden />}
          tint="warm"
        />
        <GlassSlider
          label="Volume"
          value={volume}
          onChange={setVolume}
          icon={<Volume2 className="glass-icon h-5 w-5 text-white" aria-hidden />}
          tint="primary"
        />
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
        {ACTION_TOGGLES.map((item) => {
          const Icon = item.icon
          const isOn = Boolean(active[item.id])
          return (
            <GlassSurface
              key={item.id}
              asButton
              active={isOn}
              tint={isOn ? item.tint : 'neutral'}
              ariaLabel={`${item.label}, ${isOn ? 'on' : 'off'}`}
              onClick={() => handleToggle(item.id)}
              className="aspect-square rounded-full"
            >
              <div className="flex h-full min-h-14 flex-col items-center justify-center gap-1 sm:min-h-16">
                <Icon className="glass-icon h-5 w-5 text-white sm:h-6 sm:w-6" aria-hidden />
                <span className="text-[0.6rem] font-medium tracking-wide text-white/60 uppercase">
                  {item.label}
                </span>
              </div>
            </GlassSurface>
          )
        })}
      </div>

      <GlassSurface className="rounded-[2rem] px-4 py-3 sm:rounded-[2.25rem]" tint="accent">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
            <Smartphone className="glass-icon h-5 w-5 text-white" aria-hidden />
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="text-sm font-semibold text-white">Touch-ready glass</p>
            <p className="text-xs text-white/55">Tap toggles · drag sliders · specular follows</p>
          </div>
        </div>
      </GlassSurface>
    </div>
  )
}

interface GlassSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  icon: ReactNode
  tint: 'primary' | 'warm'
}

const GlassSlider = ({ label, value, onChange, icon, tint }: GlassSliderProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value))
  }

  return (
    <GlassSurface
      className="relative flex h-full min-h-[9.5rem] w-16 flex-col justify-between overflow-hidden rounded-[2rem] p-2 sm:min-h-[11rem] sm:w-[4.5rem] sm:rounded-[2.25rem]"
      tint={tint}
      ariaLabel={`${label} ${value}%`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-white/35 via-white/10 to-transparent transition-[height] duration-150"
        style={{ height: `${value}%` }}
        aria-hidden
      />
      <div className="relative z-10 flex justify-center pt-2">{icon}</div>
      <label className="relative z-10 flex flex-1 items-center justify-center pb-1">
        <span className="sr-only">{label}</span>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={handleChange}
          className="glass-vertical-range"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-label={label}
        />
      </label>
    </GlassSurface>
  )
}
