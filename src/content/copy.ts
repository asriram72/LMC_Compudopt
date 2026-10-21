// All site prose lives here, keyed by section, so `npm run wordcount` can total it.
// Cite facts with tokens like {{cite:itu-2024}} (or {{cite:a,b}} for two sources);
// <Cite> turns them into "(ITU, 2024)" linking to the Sources section.
// Every number here must match src/data/facts.json.

export const copy = {
  nav: {
    brand: 'compudopt × GT',
    links: {
      problem: 'The problem',
      whyGT: 'Why GT',
      meetCompudopt: 'Compudopt',
      stories: 'Stories',
      takeAction: 'Take action',
      sources: 'Sources',
    },
    donate: 'Donate a device',
  },

  hero: {
    skip: 'Skip to the site',
    scrollHint: 'Scroll',
    scenes: [
      'The world threw out 62 million tonnes of e-waste in 2022. Less than a quarter was documented as recycled. {{cite:itu-2024}}',
      "But what if yours didn't end up here?",
      'Wiped to NIST 800-88. Refurbished. Ready. {{cite:compudopt-donate}}',
      "Free to a student who didn't have one.",
      "Now multiply that across the country.",
    ],
    headline: "Your old laptop is someone's first.",
    subhead:
      "Give the laptop you've outgrown to Compudopt Atlanta, and we'll get it to a metro Atlanta student who needs one.",
    ctaPrimary: 'Donate a device',
    ctaSecondary: 'See the impact',
    statBarIntro: 'Compudopt’s impact so far {{cite:compudopt-home}}',
    storyLabel: 'A pile of discarded laptops; one is rescued, wiped, refurbished and handed to a student, then the view pulls back to a map of the states where Compudopt works.',
    progressLabel: 'Story progress',
    sceneButton: 'Go to scene',
  },

  problem: {
    headline: 'Two problems, one fix',
    takeaway:
      'The laptops we throw away and the students who go without are the same problem. Reuse solves both.',
    intro:
      'Think about the last laptop you replaced. Maybe it was slow, maybe the battery gave out, maybe you just wanted something new. Where is it now? For most devices the answer is a drawer, a closet or a trash bin. Here is why that matters.',
    ewaste: {
      heading: 'The pile keeps growing',
      body: 'The world generated 62 million tonnes of e-waste in 2022, and only 22.3% of it was documented as collected and recycled. By 2030 the pile is projected to reach 82 million tonnes. E-waste is rising five times faster than documented recycling. {{cite:itu-2024}}',
      chart: {
        generated: 'Generated, 2022',
        recycled: 'Documented recycled',
        projected: 'Projected, 2030',
        annotation: 'Rising 5× faster than recycling',
        unit: 'million tonnes',
        caption: 'Global e-waste in million tonnes (Mt). {{cite:itu-2024}}',
      },
    },
    worldMap: {
      heading: 'Where dumped devices go',
      body: 'Agbogbloshie, in Accra, Ghana, is a major dumping ground for e-waste exported from the US and Europe. Workers there burn cables to get at the metal inside, breathing the fumes. {{cite:shaw-2019}}',
      contrast: 'That is where dumped devices go. Donated devices stay here, in our community.',
      alt: 'World map with gray-brown lines running from the United States and western Europe to Accra, Ghana, where Agbogbloshie is.',
      labels: { us: 'United States', europe: 'Western Europe', accra: 'Agbogbloshie, Accra' },
    },
    divide: {
      heading: 'Meanwhile, students go without',
      body: "41% of US adults earning under $30,000 a year don't have a desktop or laptop, and 43% don't have home broadband. {{cite:pew-2021}} Across the country, 18 million households lack a computer or internet at home. {{cite:compudopt-home}} Try writing a lab report or applying for a job on a phone.",
      waffle: {
        computer: "41 of every 100 lower-income US adults don't have a laptop or desktop",
        broadband: "43 of every 100 don't have home broadband",
        toggleComputer: 'No computer',
        toggleBroadband: 'No broadband',
        toggleLabel: 'Show',
        caption: 'US adults earning under $30,000 a year. {{cite:pew-2021}}',
      },
    },
    reuse: {
      heading: 'Why reuse beats recycling',
      body: 'Recycling recovers some of the materials. Reuse keeps the whole machine working. Between 35% and 56% of a laptop’s lifetime carbon footprint comes from manufacturing it, {{cite:prakash-2012}} so keeping a working laptop in use means that cost isn’t paid twice.',
      chartLabel: "A third to over half of a laptop's footprint happens before you ever open it.",
      making: 'Making it: 35–56%',
      using: 'Using it: the rest',
      caption: 'Share of a laptop’s lifetime carbon footprint. The hatched band shows the range the study reports. {{cite:prakash-2012}}',
      kicker: 'The greenest laptop is the one that already exists.',
    },
  },

  whyGT: {
    headline: 'Why this is a Georgia Tech problem',
    takeaway: 'Georgia Tech already studies the e-waste problem. Its students can help fix it.',
    windows10: {
      heading: 'A warning from our own campus',
      body: 'When Microsoft ended support for Windows 10, Georgia Tech researchers Cindy Lin and Josiah Hester warned that up to 240 million PCs could end up in landfills. {{cite:gt-windows10-2025}}',
    },
    surplus: {
      heading: 'Our own surplus',
      body: "Georgia Tech's surplus operation sent about 69,000 pounds of electronics to recycling in fiscal year 2023. {{cite:gt-surplus-2023}} Recycling beats the landfill, but a working laptop is worth more as a laptop.",
    },
    sustainabilityNext: {
      heading: 'It’s already in the plan',
      body: "Georgia Tech's Sustainability Next plan sets six priorities. {{cite:gt-sustnext-2022}} Device reuse fits two of them directly. Institute Operations is about how campus handles its stuff, and the Living Learning Campus priority turns campus into a place to practice what we study.",
      zeroWaste:
        'Georgia Tech’s circular-economy work puts it plainly: “Our goal is to reach zero waste by 2050.” {{cite:gt-circular}} Every laptop that gets a second life is a step toward it.',
    },
    sdg: {
      heading: 'The global goal: SDG 9',
      intro: 'The UN’s Sustainable Development Goal 9 is about building infrastructure that is resilient, inclusive and sustainable. {{cite:un-sdg9}}',
      target9c:
        'Target 9.c: significantly increase access to information and communications technology. Every refurbished laptop we give away is access for someone who didn’t have it.',
      target94:
        'Target 9.4: greater resource-use efficiency. Reuse gets more years out of hardware that already exists.',
      alsoLabel: 'Also touches',
    },
    atlanta:
      'And the need is right outside the gates. More than 500,000 people in metro Atlanta don’t have a home computer and/or high-speed internet. {{cite:compudopt-santander-atl}}',
  },

  meetCompudopt: {
    headline: 'Meet Compudopt',
    takeaway: 'We take the tech you’re done with and turn it into access, safely and for free.',
    intro:
      '“Our mission is to provide technology access and education to under-resourced youth and their communities.” {{cite:compudopt-about}} Compudopt has been getting computers to students since 2007 and came to Atlanta in 2021. {{cite:compudopt-cdc-atl}} We give away refurbished computers, help families get low-cost internet, and teach tech skills. In 2025 alone we taught 4,500 students in 239 cohorts and welcomed 8,123 people to our Digital Life Fairs. {{cite:compudopt-ar2025}}',
    journey: {
      heading: 'What happens to your laptop',
      steps: [
        { title: 'Drop off', body: 'Bring it to Compudopt or a participating Micro Center. Ask for a tax receipt.' },
        { title: 'Data wiped', body: 'We erase every drive to the NIST 800-88 standard, so no data survives.' },
        {
          title: 'Refurbish or recycle',
          body: 'Usable machines are refurbished. Anything that can’t be reused goes to R2 or e-Stewards certified recyclers.',
        },
        { title: 'Delivered free', body: 'It goes free to a student or family without a computer at home.' },
      ],
      cite: '{{cite:compudopt-donate}}',
      next: 'Next',
      back: 'Back',
      step: 'Step',
      stepsLabel: 'Steps',
      swipeHint: 'Swipe or use the arrows to move through the steps.',
    },
    numbers: {
      heading: '2025 by the numbers',
      computers: 'computers distributed',
      events: 'distribution events',
      households: 'households connected to internet',
      ewaste: 'pounds of e-waste recycled',
      cities: 'cities in 21 states',
      cite: '{{cite:compudopt-ar2025}}',
    },
    map: {
      heading: 'Where we work',
      caption:
        'States where Compudopt runs programs. Arcs are illustrative, drawn from regional hubs. {{cite:compudopt-locations}}',
      hint: 'Select Georgia to see what’s happening in Atlanta.',
      tooltip: 'Compudopt programs here',
      alt: 'Map of the United States. States where Compudopt runs programs are green, with arcs from hubs in Atlanta, Houston, Dallas, Chicago and Mesa.',
      legendServed: 'Program states',
      legendOther: 'Other states',
      legendHub: 'Regional hub',
      listLabel: 'States where Compudopt runs programs',
      openSpotlight: 'open the Atlanta spotlight',
    },
    spotlight: {
      heading: 'Spotlight: Atlanta',
      computers: '8,000 free computers given in metro Atlanta by July 2024. {{cite:compudopt-cdc-atl}}',
      santander:
        'A $7 million investment from Santander in 2023, with goals of 7,500 computers, 10,000 connected households and 24,000 people trained. {{cite:compudopt-santander-atl}}',
      cdc: '1,600 computers donated by the CDC Foundation for Atlanta students, reaching about 2,000 people. {{cite:compudopt-cdc-atl}}',
      need: 'More than 500,000 people in metro Atlanta lack a home computer and/or high-speed internet. {{cite:compudopt-santander-atl}}',
      partnersLabel: '2025 Atlanta partners include {{cite:compudopt-ar2025}}',
      close: 'Close',
    },
    growth: {
      heading: 'Growing fast',
      caption: 'Total computers Compudopt has distributed, all locations.',
      points: [
        'March 2023: 65,000 {{cite:compudopt-santander-atl}}',
        'November 2025: 160,000 {{cite:compudopt-2025-release}}',
        'October 2026: 200,000+ {{cite:compudopt-home}}',
      ],
    },
    outcomes: {
      heading: 'What a computer changes',
      caption: 'From Compudopt’s 2025 surveys. {{cite:compudopt-ar2025}}',
    },
  },

  stories: {
    headline: 'Second lives',
    takeaway: 'A refurbished laptop is a small thing to give and a big thing to get.',
    video: {
      heading: 'Meet Carlos',
      intro:
        'Carlos is one of the people behind our numbers. In under three minutes, he tells you what having a computer of his own has meant. Hit play.',
      title: 'Compudopt Carlos',
      play: 'Play video',
      cite: 'Video {{cite:yt-carlos}}',
    },
    quote: {
      text: 'That blue bag has changed our household.',
      attribution: 'Tamria Matondo, Compudopt recipient',
      context:
        'Tamria’s laptop broke near the end of the school year, and she had already lost her internet access through the library. Then her two kids received computers. {{cite:compudopt-ar2025}}',
    },
    casesHeading: 'What happens when people show up',
    cases: [
      {
        key: 'cdc',
        title: 'CDC Foundation to Atlanta students',
        badge: '1,600 computers',
        body: 'In 2024 the CDC Foundation donated 1,600 computers, and Compudopt got them to Atlanta students, reaching about 2,000 people. One organization’s upgrade became someone else’s first computer. {{cite:compudopt-cdc-atl}}',
      },
      {
        key: 'clayton',
        title: 'Clayton County giveaway',
        badge: '200 laptops',
        body: 'In April 2025, Clayton County’s digital equity team and Compudopt gave away 200 laptops at a free community event. Local partners know exactly where devices are needed. {{cite:rhoads-2025}}',
      },
      {
        key: 'appState',
        title: 'Second life, stronger start',
        badge: '200 laptops',
        body: 'This fall, Appalachian State University and its partner E2D gave 200 refurbished laptops to first-year students. A university treated old devices as a resource for its own students. {{cite:appstate-2026}}',
        kicker: 'GT could do this.',
      },
      {
        key: 'chicago',
        title: 'A whole city pitches in',
        badge: '16,000 computers',
        body: 'In 2023 Chicago launched a city-wide campaign to close its device gap, with 260,000 households lacking a computer. Through the city’s donation program, Compudopt has given out 16,000 computers. {{cite:chicago-mayor-2023,chicago-impact}}',
      },
    ],
    readMore: 'Read more',
    bridge: 'See how you can help',
    outro:
      'None of these started with a big budget. They started with someone deciding that a working computer shouldn’t sit in a closet. A company, a county office, a university, a city. Next, it could be a dorm floor, a lab or a student org at Georgia Tech.',
  },

  takeAction: {
    headline: 'Your move',
    takeaway: 'Moving out, upgrading or graduating? Don’t let your old laptop become e-waste.',
    intro: 'There are four ways to help. Start with the checker below to see where your device can go.',
    checker: {
      heading: 'Can I donate this?',
      intro: 'Pick your device and we’ll tell you where it goes.',
      q1: 'What are you donating?',
      devices: {
        laptop: 'Laptop',
        desktop: 'Desktop',
        tablet: 'Tablet',
        phone: 'Phone',
        monitor: 'Monitor (LCD/LED)',
        crt: 'CRT monitor or big TV',
        printer: 'Printer or copier',
        parts: 'Other parts (RAM, drives, cables)',
      },
      q2: 'What shape is it in?',
      conditions: {
        works: 'It works',
        broken: 'Broken, but the hard drive is still in it',
        noDrive: 'No hard drive',
      },
      results: {
        accepted: {
          title: 'Yes! We’ll take it.',
          body: 'Bring it to Compudopt Atlanta, or to a participating Micro Center. {{cite:compudopt-donate}}',
        },
        acceptedCompudopt: {
          title: 'Yes! Bring it to Compudopt.',
          body: 'Compudopt Atlanta takes tablets, phones, monitors and parts. Micro Center drop-off only takes working laptops and desktops. {{cite:compudopt-donate}}',
        },
        compudoptOnly: {
          title: 'Yes, but bring it to Compudopt.',
          body: 'Broken computers and ones missing cords are welcome as long as the hard drive is inside. Micro Center only takes working laptops and desktops. {{cite:compudopt-donate}}',
        },
        callFirst: {
          title: 'Call us first.',
          body: 'We accept computers that still have their hard drive. Call 855-532-5060 before bringing one without it.',
        },
        notAccepted: {
          title: 'We can’t take this one.',
          body: 'CRT monitors, large TVs, printers and copiers aren’t accepted. {{cite:compudopt-donate}} Georgia Tech’s Zero Waste Resource Hub can point you to the right place to recycle it.',
          link: 'GT Zero Waste Resource Hub',
        },
      },
      checklist: {
        heading: 'Before you drop it off',
        items: [
          'Back up your files.',
          'Sign out of your Apple ID or Microsoft account, and turn off Find My.',
          'Take out your SIM card and any SD card.',
        ],
        note: 'We wipe every drive to the NIST 800-88 standard anyway, so no data survives. {{cite:compudopt-donate}}',
      },
      impact: 'Compudopt has distributed more than 200,000 computers. Yours could be next. {{cite:compudopt-home}}',
      tax: 'Donations are tax-deductible, so ask for a receipt.',
      startOver: 'Start over',
      call: 'Call 855-532-5060',
      where: 'Where to take it',
    },
    dropOff: {
      heading: 'Where to drop off',
      compudopt:
        'Compudopt Atlanta, 760 Bolton Road, Atlanta, GA 30331. Call ahead at 855-532-5060 to confirm hours. {{cite:compudopt-contact}}',
      microCenter:
        'Participating Micro Center stores, including two in metro Atlanta, take working laptops and desktops. {{cite:microcenter-2024}}',
    },
    volunteer: {
      heading: 'Give a few hours',
      body: 'Prep laptops in the warehouse, help at giveaway events, support tech trainings, or capture photos and video. Come solo or bring your whole org. {{cite:compudopt-volunteer}}',
      solo: 'Volunteer solo',
      group: 'Bring your org',
      newTab: '(opens in a new tab)',
    },
    drive: {
      heading: 'Run a device drive',
      steps: [
        'Pick the week devices pile up: move-out or finals.',
        'Call Compudopt at 855-532-5060 to plan the drop-off.',
        'Spread the word with our flyer and collect in your dorm, lab or org meeting.',
      ],
      flyer: 'Download the flyer',
    },
    need: {
      heading: 'Need a computer yourself?',
      body: 'Compudopt runs free computer giveaways and helps families find low-cost home internet. If you or someone you know needs one, check whether you qualify.',
      giveaways: 'Computer giveaways',
      internet: 'Low-cost internet',
    },
  },

  footer: {
    disclaimer: 'A student project for Georgia Tech LMC 3403. Not an official Compudopt website.',
    visit: 'Visit compudopt.org',
    madeBy: 'Made by',
  },
}

export default copy
