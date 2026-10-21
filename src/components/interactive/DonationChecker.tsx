// "Can I donate this?" Device → (condition, for computers) → result with next steps.
// Rules come from Compudopt's Donate page (facts.donation): computers are accepted broken
// as long as the hard drive is in; Micro Center takes working laptops/desktops only;
// CRTs, large TVs, printers and copiers aren't accepted.
import { useRef, useState, type ReactNode } from 'react'
import { copy } from '../../content/copy'
import { facts } from '../../data/types'
import { Prose } from '../Cite'

const c = copy.takeAction.checker
const d = copy.takeAction.dropOff
type Device = keyof typeof c.devices
type Condition = keyof typeof c.conditions
type Result = keyof typeof c.results

const COMPUTERS: Device[] = ['laptop', 'desktop']
const NOT_ACCEPTED: Device[] = ['crt', 'printer']
const ZERO_WASTE_HUB = 'https://sustain.gatech.edu/zero-waste-resource-hub/'
const TEL = `tel:+1${facts.volunteer.phone.replace(/\D/g, '')}`

function resultFor(device: Device | null, condition: Condition | null): Result | null {
  if (!device) return null
  if (NOT_ACCEPTED.includes(device)) return 'notAccepted'
  if (!COMPUTERS.includes(device)) return 'acceptedCompudopt'
  if (!condition) return null
  return { works: 'accepted', broken: 'compudoptOnly', noDrive: 'callFirst' }[condition] as Result
}

const ICON: Record<Device, ReactNode> = {
  laptop: <path d="M6 9h20v12H6zM3 24h26" />,
  desktop: <path d="M5 6h22v15H5zM12 26h8M16 21v5" />,
  tablet: <path d="M9 4h14v24H9zM15 24h2" />,
  phone: <path d="M11 4h10v24H11zM15 24h2" />,
  monitor: <path d="M4 7h24v15H4zM16 22v5M11 27h10" />,
  crt: <path d="M5 6h22v16H5zM9 10h14v8H9zM10 22l-2 5M22 22l2 5" />,
  printer: <path d="M9 4h14v7H9zM5 11h22v11H5zM9 18h14v10H9z" />,
  parts: <path d="M9 9h14v14H9zM13 13h6v6h-6zM13 5v4M19 5v4M13 23v4M19 23v4M5 13h4M5 19h4M23 13h4M23 19h4" />,
}

const STATUS: Record<Result, { tone: string; icon: ReactNode; label: string }> = {
  accepted: { tone: 'border-green-mark', icon: <path d="M7 16l6 6 12-13" />, label: 'Accepted' },
  acceptedCompudopt: { tone: 'border-green-mark', icon: <path d="M7 16l6 6 12-13" />, label: 'Accepted' },
  compudoptOnly: { tone: 'border-[#B26B00]', icon: <path d="M16 7v11M16 23v1" />, label: 'Accepted with a condition' },
  callFirst: { tone: 'border-[#B26B00]', icon: <path d="M16 7v11M16 23v1" />, label: 'Call first' },
  notAccepted: { tone: 'border-[#A33A3A]', icon: <path d="M9 9l14 14M23 9L9 23" />, label: 'Not accepted' },
}
const ICON_COLOR: Record<Result, string> = {
  accepted: 'bg-green-mark',
  acceptedCompudopt: 'bg-green-mark',
  compudoptOnly: 'bg-[#B26B00]',
  callFirst: 'bg-[#B26B00]',
  notAccepted: 'bg-[#A33A3A]',
}

function Choice<T extends string>({ name, value, checked, onChange, children }: { name: string; value: T; checked: boolean; onChange: (v: T) => void; children: ReactNode }) {
  return (
    <label className="block cursor-pointer">
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="peer sr-only" />
      <span className="flex h-full min-h-14 items-center gap-3 rounded-2xl border-2 border-navy/15 bg-white px-4 py-3 font-semibold text-navy transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue hover:border-navy/40">
        {children}
      </span>
    </label>
  )
}

export function DonationChecker() {
  const [device, setDevice] = useState<Device | null>(null)
  const [condition, setCondition] = useState<Condition | null>(null)
  const firstRadio = useRef<HTMLFieldSetElement>(null)
  const result = resultFor(device, condition)
  const donatable = result && result !== 'notAccepted'

  function pickDevice(v: Device) {
    setDevice(v)
    setCondition(null)
  }

  function reset() {
    setDevice(null)
    setCondition(null)
    firstRadio.current?.querySelector('input')?.focus()
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm md:p-10">
      <h3 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">{c.heading}</h3>
      <p className="mt-2 text-lg text-slate">{c.intro}</p>

      <fieldset ref={firstRadio} className="mt-8">
        <legend className="text-lg font-bold text-ink">1. {c.q1}</legend>
        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {(Object.keys(c.devices) as Device[]).map((k) => (
            <Choice key={k} name="device" value={k} checked={device === k} onChange={pickDevice}>
              <svg viewBox="0 0 32 32" className="size-8 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
                {ICON[k]}
              </svg>
              <span className="text-sm leading-tight md:text-base">{c.devices[k]}</span>
            </Choice>
          ))}
        </div>
      </fieldset>

      {device && COMPUTERS.includes(device) && (
        <fieldset className="mt-8">
          <legend className="text-lg font-bold text-ink">2. {c.q2}</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {(Object.keys(c.conditions) as Condition[]).map((k) => (
              <Choice key={k} name="condition" value={k} checked={condition === k} onChange={setCondition}>
                {c.conditions[k]}
              </Choice>
            ))}
          </div>
        </fieldset>
      )}

      <div aria-live="polite" className="mt-8">
        {result && (
          <div className={`rounded-2xl border-l-8 bg-mist p-5 md:p-7 ${STATUS[result].tone}`}>
            <div className="flex items-start gap-4">
              <span className={`grid size-11 shrink-0 place-items-center rounded-full text-white ${ICON_COLOR[result]}`}>
                <svg viewBox="0 0 32 32" className="size-6" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {STATUS[result].icon}
                </svg>
                <span className="sr-only">{STATUS[result].label}:</span>
              </span>
              <div>
                <p className="text-2xl font-extrabold text-navy">{c.results[result].title}</p>
                <p className="mt-2 text-lg leading-relaxed">
                  <Prose text={c.results[result].body} />
                </p>
              </div>
            </div>

            {donatable ? (
              <div className="mt-6 border-t border-navy/10 pt-5">
                <p className="font-bold text-navy">{c.where}</p>
                <p className="mt-1">
                  <Prose text={d.compudopt} />
                </p>
                {result === 'accepted' && (
                  <p className="mt-2">
                    <Prose text={d.microCenter} />
                  </p>
                )}
                <a href={TEL} className="btn-ghost mt-4 bg-white px-5 py-2">
                  {c.call}
                </a>
              </div>
            ) : (
              <p className="mt-5">
                <a href={ZERO_WASTE_HUB} target="_blank" rel="noopener" className="font-semibold">
                  {c.results.notAccepted.link} ↗
                </a>
              </p>
            )}
          </div>
        )}
      </div>

      {result && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <p className="font-bold text-navy">{c.checklist.heading}</p>
            <ul className="mt-2 space-y-2">
              {c.checklist.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 size-3 shrink-0 rounded-sm border-2 border-navy" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-slate">
              <Prose text={c.checklist.note} />
            </p>
          </div>
          <div className="space-y-3">
            {donatable && (
              <>
                <p className="text-xl font-bold text-navy">
                  <Prose text={c.impact} />
                </p>
                <p>{c.tax}</p>
              </>
            )}
            <button type="button" onClick={reset} className="btn-ghost px-5 py-2">
              {c.startOver}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
