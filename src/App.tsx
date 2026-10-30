import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { PhotoTransition } from './components/PhotoTransition'
import { copy } from './content/copy'
import { Hero } from './sections/Hero'
import { MeetCompudopt } from './sections/MeetCompudopt'
import { Problem } from './sections/Problem'
import { Sources } from './sections/Sources'
import { Stories } from './sections/Stories'
import { TakeAction } from './sections/TakeAction'
import { WhyGT } from './sections/WhyGT'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <WhyGT />
        <MeetCompudopt />
        <PhotoTransition
          id="access-in-view"
          image="students-using-laptop.jpg"
          alt={copy.transitions.access.alt}
          eyebrow={copy.transitions.access.eyebrow}
          headline={copy.transitions.access.headline}
          credit={copy.transitions.access.credit}
          sourceUrl="https://commons.wikimedia.org/wiki/File:Students_using_a_computer_laptop.jpg"
          license={copy.transitions.access.license}
          licenseUrl="https://creativecommons.org/publicdomain/zero/1.0/"
          position="center 42%"
        />
        <Stories />
        <TakeAction />
        <Sources />
      </main>
      <Footer />
    </>
  )
}
