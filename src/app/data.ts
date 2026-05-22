export const skills = [
  { name: 'HTML', icon: '🌐', level: 'Expert', pct: 90 },
  { name: 'CSS', icon: '🎨', level: 'Expert', pct: 90 },
  { name: 'JavaScript', icon: '📜', level: 'Advanced', pct: 75 },
  { name: 'React', icon: '⚛️', level: 'Advanced', pct: 85 },
  { name: 'Next.js', icon: '▲', level: 'Advanced', pct: 80 },
  { name: 'Java', icon: '☕', level: 'Intermediate', pct: 70 },
  { name: 'C', icon: '©️', level: 'Advanced', pct: 80 },
  { name: 'PHP', icon: '🐘', level: 'Intermediate', pct: 65 },
  { name: 'MySQL', icon: '🐬', level: 'Intermediate', pct: 75 },
  { name: 'Photography', icon: '📸', level: 'Advanced', pct: 80 },
  { name: 'Video Editing', icon: '🎬', level: 'Intermediate', pct: 50 },
];

export const timeline = [
  {
    period: '2024 — 2026',
    role: 'Full-Stack Developer',
    company: 'Freelancer',
    desc: 'Engineered and deployed a custom resource allocation system to streamline equipment tracking and shoot scheduling.',
    tags: ['Html','CSS','Javascript','Java','Node.js', 'React', 'PostgreSQL'],
  },
  {
    period: '2022 — 2023',
    role: 'Android Developer',
    company: 'Freelancer',
    desc: 'Designed and developed a specialized Speed Light utility app to assist photographers.',
    tags: ['Kotlin', 'Jetpack Compose', 'Firebase'],
  },
  {
    period: '2022 — 2023',
    role: 'Photographer',
    company: 'Dream Delights Photography',
    desc: 'Specialized in capturing life’s milestones through candid storytelling and expert lighting.',
    tags: ['Portraiture', 'BirthDay Shoots','Graduations', 'Event Photography']
  },
]

export type ProjectType = 'link' | 'gallery'

export interface Project {
  id: number
  type: ProjectType
  title: string
  desc: string
  url?: string
  url2?: string
  url3?: string
  imgUrl?: string
  images?: string[]
  tags?: string[]
}

export const initialProjects: Project[] = [
  {
    id: 1, 
    type: 'link',
    title: 'Event Photography',
    desc: 'Professional coverage of birthdays, graduations, and corporate events with a focus on candid moments.',
    url: 'https://www.facebook.com/share/p/1Fq5rmE1E4/',
    imgUrl: '/images/EIMG_0000.jpg',
    images: [
      '/images/EIMG_0000.jpg', '/images/EIMG_0001.jpg', '/images/EIMG_0002.jpg',
      '/images/EIMG_0003.jpg', '/images/EIMG_0004.jpg', '/images/EIMG_0005.jpg',
      '/images/EIMG_0006.jpg', '/images/EIMG_0007.jpg', '/images/EIMG_0008.jpg',
      '/images/EIMG_0009.jpg', '/images/EIMG_0010.jpg', '/images/EIMG_0011.jpg',
      '/images/EIMG_0012.jpg'
    ],
    tags: ['Events', 'Birthdays', 'Sports' ]
  },
  {
    id: 2, 
    type: 'link', 
    title: 'Graduation Photography',
    desc: 'A collection of professional graduation photography capturing success and memories.',
    url: 'https://www.facebook.com/share/p/1KqgRyrRrZ/',
    url2: 'https://www.facebook.com/share/p/1B2nJQrTTS/',
    url3: 'https://www.facebook.com/share/p/1BcFLyuFcw/',

    imgUrl: '/images/GR0001.jpg',
    images: [
      '/images/GR0001.jpg', '/images/GR0002.jpg', '/images/GR0003.jpg',
      '/images/GR0004.jpg', '/images/GR0005.jpg', '/images/GR0006.jpg',
      '/images/GR0007.jpg', '/images/GR0008.jpg', '/images/GR0009.jpg',
      '/images/GR0010.jpg', '/images/GR0011.jpg', '/images/GR0012.jpg',
      '/images/GR0013.jpg', '/images/GR0014.jpg'
    ],
    tags: ['Photography', 'Graduation'],
  },
  {
    id: 3, 
    type: 'link', 
    title: 'Special Events',
    desc: 'Live event tracking, Special Event management and musical shows and special events.',
    url: 'https://www.facebook.com/share/p/18cPXE8Fcj/',
    imgUrl: '/images/MU (1).jpg',
    images: [
      '/images/MU (1).jpg','/images/MU (2).jpg','/images/MU (3).jpg',
      '/images/MU (4).jpg','/images/MU (5).jpg','/images/MU (6).jpg',
      '/images/MU (7).jpg','/images/MU (8).jpg','/images/MU (9).jpg',
      '/images/MU (10).jpg','/images/MU (11).jpg','/images/MU (12).jpg',
      '/images/MU (13).jpg','/images/MU (14).jpg','/images/MU (15).jpg'
     
    ],
    tags: ['Musical', 'Live', 'special'],
  },

  {
    id: 4, 
    type: 'link', 
    title: 'Festivals',
    desc: 'Live event tracking, Special Event management and musical shows and special events.',
    url: 'https://www.facebook.com/share/p/18W2t7rGr2/',
    imgUrl: '/images/KT (1).jpg',
    images: [
      '/images/KT (1).jpg','/images/KT (2).jpg','/images/KT (3).jpg',
      '/images/KT (4).jpg','/images/KT (5).jpg','/images/KT (6).jpg',
      '/images/KT (7).jpg','/images/KT (8).jpg','/images/KT (9).jpg',
      '/images/KT (10).jpg','/images/KT (11).jpg','/images/KT (12).jpg'
    ],
    tags: ['Musical', 'Live', 'special'],
  },

  {
    id: 5, 
    type: 'link', 
    title: 'BirthDay Photography',
    desc: 'Professional photography for birthdays and special celebrations, focusing on authentic emotions and live event highlights.',
    url: 'https://www.facebook.com/share/p/18W2t7rGr2/',
    imgUrl: '/images/DL (1).jpg',
    images: [
      '/images/DL (1).jpg','/images/DL (2).jpg','/images/DL (3).jpg',
      '/images/DL (4).jpg','/images/DL (5).jpg','/images/DL (6).jpg',
      '/images/DL (7).jpg'
    ],
    tags: ['Musical', 'Live', 'special'],
  },

  {
    id: 6, 
    type: 'link', 
    title: 'Flyer Design',
    desc: 'specialize in creating eye-catching, modern, and high-impact flyer designs tailored specifically for your business, event, or brand.',
    url: 'https://www.facebook.com/share/p/18W2t7rGr2/',
    imgUrl: '/images/FL (9).jpg',
    images: [
      '/images/FL (1).jpg','/images/FL (2).jpg','/images/FL (3).jpg','/images/FL (4).jpg',
      '/images/FL (5).jpg','/images/FL (6).jpg','/images/FL (7).jpg','/images/FL (8).jpg',
      '/images/FL (9).jpg','/images/FL (10).jpg'
    ],
    tags: ['Classes', 'Hotels', 'Marketing'],
  },
]