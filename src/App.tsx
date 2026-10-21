import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
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
        <Stories />
        <TakeAction />
        <Sources />
      </main>
      <Footer />
    </>
  )
}
