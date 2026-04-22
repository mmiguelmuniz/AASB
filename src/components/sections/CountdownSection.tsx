import { useEffect, useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'

const TARGET = new Date('2026-05-02T08:00:00').getTime()

function calcTime() {
  const diff = TARGET - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000)  / 60_000),
    seconds: Math.floor((diff % 60_000)     / 1_000),
  }
}

interface UnitProps { value: number; label: string }

function Unit({ value, label }: UnitProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="
        w-20 sm:w-28 h-20 sm:h-28 rounded-2xl
        bg-white/5 border border-white/10
        flex items-center justify-center
        font-display text-4xl sm:text-5xl text-white leading-none
      ">
        {String(value).padStart(2, '0')}
      </div>
      <span className="font-heading text-[var(--gold)] text-xs tracking-widest uppercase">
        {label}
      </span>
    </div>
  )
}

export default function CountdownSection() {
  const [time, setTime] = useState(calcTime)

  useEffect(() => {
    const id = setInterval(() => setTime(calcTime()), 1_000)
    return () => clearInterval(id)
  }, [])

  const started = TARGET <= Date.now()

  return (
    <section className="py-20 bg-[var(--navy)] relative overflow-hidden">
      {/* subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200,16,46,0.12) 0%, transparent 70%)' }}
      />

      <div className="relative section-padding max-w-7xl mx-auto text-center">
        <SectionHeader
          eyebrow={started ? 'Tournament is live!' : 'Tournament begins in'}
          title={started ? 'May 2 – 8, 2026' : 'Countdown'}
          light
          centered
          className="mb-12"
        />

        {!started ? (
          <div className="flex justify-center gap-4 sm:gap-6">
            <Unit value={time.days}    label="Days" />
            <div className="font-display text-4xl sm:text-5xl text-white/30 self-center pb-8">:</div>
            <Unit value={time.hours}   label="Hours" />
            <div className="font-display text-4xl sm:text-5xl text-white/30 self-center pb-8">:</div>
            <Unit value={time.minutes} label="Minutes" />
            <div className="font-display text-4xl sm:text-5xl text-white/30 self-center pb-8">:</div>
            <Unit value={time.seconds} label="Seconds" />
          </div>
        ) : (
          <p className="font-display text-5xl text-[var(--gold)]">🏆 THE GAMES ARE ON!</p>
        )}
      </div>
    </section>
  )
}
