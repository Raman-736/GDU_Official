// All page copy lives here so the club can update text without touching
// components. Source: GDU Brochure 2026 (PICT Pune and IIIT Kottayam).

export const NAV_LINKS = [
  { id: "about", label: "About", to: "/#about" },
  { id: "chapters", label: "Chapters", to: "/#chapters" },
  { id: "arcade", label: "Arcade", to: "/#arcade" },
  { id: "games", label: "Games", to: "/games" },
  { id: "designs", label: "Designs", to: "/designs" },
  { id: "events", label: "Events", to: "/#events" },
  { id: "achievements", label: "Wins", to: "/#achievements" },
  { id: "team", label: "Team", to: "/team" },
];

export const SOCIALS = [
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/gamedevutopia_pict" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/gamedevutopia/" },
  { id: "mail", label: "Email", href: "mailto:gamedevutopia@gmail.com" },
];

export const HERO = {
  kicker: "A student-built game dev community, est. 2020",
  sub: "Engineers, artists and designers across two campuses who build, ship and compete with games. From first prototype to podium finish.",
  stats: [
    { value: "100+", label: "Games built" },
    { value: "300+", label: "Members" },
    { value: "02", label: "Chapters" },
    { value: "16+", label: "Podium finishes" },
  ],
};

// TODO: add the member's name, e.g. "Blender render by Firstname Lastname".
export const SHOWCASE = {
  title: "Lamborghini Veneno",
  credit: "Modelled, lit & rendered in Blender by a GDU member",
  heroVideo: "/media/hero-loop.mp4",
  heroPoster: "/media/hero-poster.jpg",
  fullVideo: "/media/showcase-full.mp4",
  fullPoster: "/media/showcase-poster.jpg",
};

export const TAPE_A = [
  "Unity", "Unreal Engine", "Godot", "Defold", "Love2D", "Pygame", "raylib", "MonoGame",
  "SDL", "OpenGL", "Bevy", "Blender", "Aseprite", "DaVinci Resolve", "C++", "C#", "Lua", "GDScript",
];

export const TAPE_B = ["Build", "Ship", "Compete", "Repeat"];

export const ABOUT = {
  statement:
    "Founded in 2020 by three students with zero game-dev experience. Today: a two-campus network that ships games, wins jams and learns straight from the industry.",
  intel: [
    {
      title: "Who we are",
      text: "GameDevUtopia (GDU) is a student-led game development community built from the ground up, not a chapter of any external organization. It began at PICT Pune in 2020 and grew into a multi-institution network with an independent chapter at IIIT Kottayam, founded in 2021.",
    },
    {
      title: "What we do",
      text: "Members from CS, IT, ENTC, ECE and AIDS spend their college years building, shipping and competing in game development, through workshops, weekly sessions, game jams, exhibitions, guest talks and peer mentorship.",
    },
  ],
  // A value can be a string or an array of lines.
  dossier: [
    { k: "Founders", v: ["PICT 2020: Mihir Ranade, Apurv Henkare, Prajwal Pawar", "IIITK 2021: Sai Tejashwin, under Beta Labs"] },
    { k: "Board of Directors", v: "Himanshu Pandey, Sai Tejashwin" },
    { k: "Lineage", v: ["PICT: 5 junior batches have led the club", "IIITK: 2 formal leadership batches"] },
    { k: "Faculty & Coordinator", v: ["PICT: Dr. Kavita Sultanpure (Faculty Mentor), Dr. Girish Potdar", "IIITK: Dr. P. Victer Paul (Faculty Coordinator)"] },
    { k: "Partners", v: "Defold, GameDoora, Dimensions" },
    { k: "Network & Branches", v: "GDU PICT Pune · GDU IIIT Kottayam" },
  ],
};

export const CHAPTERS = {
  lead: "One community, two campuses. Each chapter runs on its own, with its own leadership, flagship event and track record, and the two build, jam and teach together.",
  list: [
    {
      id: "pict",
      color: "gold",
      short: "PICT",
      name: "GDU PICT",
      place: "Pune Institute of Computer Technology, Pune",
      year: "2020",
      tagline: "The first game development club at PICT.",
      facts: [
        { k: "Founded by", v: "Mihir Ranade, Apurv Henkare, Prajwal Pawar" },
        { k: "Backed by", v: "Dr. Kavita Sultanpure (Faculty Mentor), Dr. Girish Potdar" },
        { k: "Lineage", v: "5 junior batches have led the club, each leaving it stronger than they found it" },
        { k: "Flagship", v: "Glitched, a multi-day campus festival (3 editions)" },
        { k: "Sponsor", v: "Defold, the engine used by King" },
      ],
      tags: ["Unity", "Unreal", "Godot", "Pygame", "Love2D", "Defold", "Blender"],
    },
    {
      id: "iiitk",
      color: "blue",
      short: "IIITK",
      name: "GDU IIIT Kottayam",
      place: "Indian Institute of Information Technology, Kottayam",
      year: "2021",
      tagline: "The first game development club at IIITK.",
      facts: [
        { k: "Founded by", v: "Sai Tejashwin, under Beta Labs, then grew into a fully independent chapter" },
        { k: "Backed by", v: "Dr. P. Victer Paul (Faculty Coordinator)" },
        { k: "Lineage", v: "2 formal leadership batches, with sub-lead roles across Tech, Design, Art, PR and Events" },
        { k: "Flagship", v: "GameVita, the annual game jam held during Apoorv (4 editions)" },
        { k: "Recognition", v: "Defold Game Jam and IIT-level competitions" },
      ],
      tags: ["Tech", "Design", "Art", "PR", "Events", "GameZone"],
    },
  ],
  together: [
    "8-day inter-college Love2D + Lua workshop",
    "Cross-institutional Defold Game Jam with IIIT Nagpur",
    "3-part GDG × GDU game development series",
  ],
};

export const CLASSES = [
  {
    id: "programmer",
    name: "Developer",
    track: "Technology",
    color: "green",
    text: "Engines, frameworks and low-level graphics. We ship complete, playable games, not tutorials.",
    loadout: ["Unity", "Unreal", "Godot", "Defold", "Love2D", "Pygame", "raylib", "MonoGame", "SDL", "OpenGL"],
  },
  {
    id: "artist",
    name: "Designer",
    track: "Art & Design",
    color: "pink",
    text: "3D modelling and animation, pixel and digital art, and game UI that feels good to play.",
    loadout: ["Blender", "Animation", "Digital art", "Aseprite", "UI/UX", "DaVinci Resolve"],
  },
  {
    id: "creator",
    name: "Creator",
    track: "Web & Content",
    color: "blue",
    text: "The sites, trailers, socials and community work that put our games in front of players.",
    loadout: ["Web dev", "Content", "Community", "Social media", "Video"],
  },
];

export const GAME = {
  title: "GDU Island",
  pitch:
    "Our club as an island you can drive around. Built from scratch by GDU PICT members for the college's Student Induction Program, take the car out, read the signboards, find the bowling alley.",
  specs: [
    { k: "Engine", v: "Three.js + TypeScript" },
    { k: "Physics", v: "cannon-es rigid bodies" },
    { k: "Foliage", v: "15,000 GPU-animated grass blades" },
    { k: "Target", v: "60 FPS on mobile browsers" },
  ],
  controls: [
    { keys: ["W", "A", "S", "D"], label: "Drive" },
    { keys: ["Space"], label: "Brake" },
    { keys: ["R"], label: "Reset" },
  ],
};

// Flagship festivals, one per chapter.
export const FESTIVALS = [
  {
    id: "glitched",
    color: "pink",
    word: "GLITCHED",
    chapter: "GDU PICT · Pune",
    editions: "03",
    text: "GDU PICT's annual multi-day festival. What began as a single-day online event is now a full campus festival where students showcase their work, compete, collaborate and meet the people who make games for a living.",
    activities: ["Game Jams", "Art Jams", "Esports", "Grand Expo", "Speaker Series", "Campus Activities"],
    guests: "Industry guests from EA, Ubisoft, Tara Gaming and more",
  },
  {
    id: "gamevita",
    color: "blue",
    word: "GAMEVITA",
    chapter: "GDU IIIT Kottayam",
    editions: "04",
    text: "GDU IIITK's annual game jam, held during Apoorv, IIITK's flagship tech festival. A competition designed, organized and judged by the club. Alongside it, the GameZone lets the whole college community play games built by GDU members.",
    activities: ["Game Jam", "GameZone", "Club-run judging", "Apoorv fest"],
    guests: "Designed, organized and judged by the club",
  },
];

export const QUESTS = [
  { title: "Retropolis, the first national-level game jam at IIIT Kottayam", meta: "GDU IIITK · 2021" },
  { title: "8-day Love2D + Lua workshop", meta: "Inter-college · GDU PICT × GDU IIITK" },
  { title: "Game dev workshop at Tantrafiesta", meta: "IIIT Nagpur · 200+ attendees" },
  { title: "Blender workshop", meta: "IIIT Nagpur · with Pictoreal" },
  { title: "Defold Game Jam", meta: "PICT · IIIT Kottayam · IIIT Nagpur" },
  { title: "3-part GDG × GDU series", meta: "IIIT Kottayam · 100+ attendees" },
  { title: "Dungeon Devs at Glitched", meta: "With Arcanum, IIIT Ranchi" },
];

// `by` is the winning team or person, as listed in the brochure.
export const WINS = {
  pict: [
    { event: "IIIT Kottayam Game Jam", award: "Best Overall Game + Best Game Design", tier: "gold" },
    { event: "IIT Madras - Genesis Game Jam", award: "1st Prize + 2nd Prize", tier: "gold" },
    { event: "IIT Indore", award: "1st Prize", tier: "gold" },
    { event: "IIT Hyderabad", award: "Game Jam Winner", tier: "gold" },
    { event: "IIIT Nagpur", award: "1st Prize", tier: "gold" },
    { event: "Python Hackathon - FOSSEE, IIT Bombay", award: "1st Prize", tier: "gold" },
    { event: "COEP Krafton Hackathon", award: "1st Prize + 2nd Prize", tier: "gold" },
    { event: "AIT Pune", award: "2nd Place + 3rd Place", tier: "silver" },
  ],
  iiitk: [
    { event: "JAMSHACK23, NIT Agartala", award: "1st Place", by: "Angati Bala Murali", tier: "gold" },
    { event: "GDU × Defold Game Jam (International)", award: "Judge's Favourite", by: "Anush Bundel, Ashwin S.", tier: "gold" },
    { event: "Stellaris GDU, Defold (International)", award: "Judge's Choice", by: "Space Slime Invasion", tier: "gold" },
    { event: "GameVita IIITK 2024", award: "Best Design", by: "Dream Sequencer", tier: "gold" },
    { event: "GameVita IIITK 2023", award: "Best Implementation", by: "Wing It", tier: "gold" },
    { event: "Game Forge, IIT Palakkad", award: "2nd Place", by: "Team of 4", tier: "silver" },
    { event: "Game Jam, IIT Hyderabad", award: "2nd Place", by: "The Cursed FrostBite", tier: "silver" },
    { event: "Parichara × Glitched, PICT Game Jam", award: "3rd Place", by: "Angati Bala Murali", tier: "bronze" },
  ],
};

export const MENTORS = [
  { name: "Ankit Gajiwala", role: "Senior Manager, EA", note: "Speaker at Glitched 3.0" },
  { name: "Mohit Sethi", role: "Software Engineer, EA Games" },
  { name: "Bjorn Ritzl", role: "Chairperson, Defold", note: "International sponsor" },
  { name: "Ubisoft Pune", role: "Studio Technical Director & team" },
  { name: "Kyle Schaub", role: "Former Microsoft Engineer", note: "Challacade, YouTube" },
  { name: "Ketki Joshi", role: "Senior 3D Artist, Tara Gaming" },
  { name: "Brandon Lim", role: "Indie Developer" },
];

export const LOOT = [
  {
    title: "A real game portfolio",
    text: "Complete games built across Unity, Unreal, Godot, Pygame, Love2D and Defold. Members don't just learn tools, they ship.",
  },
  {
    title: "A competitive record",
    text: "Podiums at IIT Madras, IIT Indore, IIT Hyderabad, IIT Palakkad, NIT Agartala, COEP and more, plus international Defold recognition.",
  },
  {
    title: "Cross-disciplinary skills",
    text: "Engineers who also model in Blender, animate, draw, design UI, build websites and cut trailers.",
  },
  {
    title: "Leadership XP",
    text: "Run workshops for 200+ students, manage multi-department teams, organise national-level jams and mentor juniors.",
  },
  {
    title: "Industry exposure",
    text: "Direct sessions with EA, Ubisoft, Defold, indie developers and YouTube educators.",
  },
];
