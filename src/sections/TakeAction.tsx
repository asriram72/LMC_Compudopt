import { copy } from '../content/copy'
import { facts } from '../data/types'
import { ExternalLink } from '../components/ExternalLink'
import { DonationChecker } from '../components/interactive/DonationChecker'
import { Block, P, Section } from '../components/Section'

const c = copy.takeAction
const v = facts.volunteer
// The team's Unit 1 flyer. Set to a file in /public (e.g. 'flyer.pdf') once someone adds it.
const FLYER_FILE: string | null = null

const card = 'rounded-3xl bg-white p-6 md:p-8'

export function TakeAction() {
  return (
    <Section id="takeAction" tone="mist" headline={c.headline} takeaway={c.takeaway}>
      <p className="max-w-[68ch] text-lg">{c.intro}</p>
      <div className="mt-8">
        <DonationChecker />
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className={card}>
          <Block heading={c.dropOff.heading}>
            <P text={c.dropOff.compudopt} />
            <P text={c.dropOff.microCenter} />
          </Block>
        </div>
        <div className={card}>
          <Block heading={c.volunteer.heading}>
            <P text={c.volunteer.body} />
          </Block>
          <div className="mt-5 flex flex-wrap gap-3">
            <ExternalLink href={v.individualForm} className="btn-cta px-5 py-2">
              {c.volunteer.solo}
            </ExternalLink>
            <ExternalLink href={v.groupForm} className="btn-ghost px-5 py-2">
              {c.volunteer.group}
            </ExternalLink>
          </div>
        </div>
        <div className={card}>
          <Block heading={c.drive.heading}>
            <ol className="space-y-3">
              {c.drive.steps.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-navy font-bold text-white">{i + 1}</span>
                  <span className="pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
          </Block>
          {FLYER_FILE && (
            <a href={`${import.meta.env.BASE_URL}${FLYER_FILE}`} download className="btn-ghost mt-5 px-5 py-2">
              {c.drive.flyer}
            </a>
          )}
        </div>
        <div className={card}>
          <Block heading={c.need.heading}>
            <p>{c.need.body}</p>
          </Block>
          <div className="mt-5 flex flex-wrap gap-3">
            <ExternalLink href="https://www.compudopt.org/programs/computer-giveaways/" className="btn-ghost px-5 py-2">
              {c.need.giveaways}
            </ExternalLink>
            <ExternalLink href="https://www.compudopt.org/compudopt-connect-low-cost-internet/" className="btn-ghost px-5 py-2">
              {c.need.internet}
            </ExternalLink>
          </div>
        </div>
      </div>
    </Section>
  )
}
