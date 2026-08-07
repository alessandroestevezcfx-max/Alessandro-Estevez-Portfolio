import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Asterisk,
  Check,
  ChevronRight,
  CirclePlay,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MousePointer2,
  Search,
  Send,
  Sparkles,
  X,
} from 'lucide-react'
import {
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export const Route = createFileRoute('/')({
  component: Portfolio,
})

type Project = {
  id: number
  title: string
  category: string
  discipline: string
  image: string
  description: string
  software: string[]
  date: string
  featured?: boolean
}

const image = (id: string, width = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=88`

const projects: Project[] = [
  {
    id: 1,
    title: 'Aether / Cloth Study',
    category: 'CFX',
    discipline: 'Cloth Simulation',
    image: image('photo-1500530855697-b586d89ba3ee'),
    description:
      'A wind-driven cloth study focused on readable folds, controlled art direction, and physically grounded secondary motion.',
    software: ['Houdini', 'Maya', 'Marvelous Designer'],
    date: '2026',
    featured: true,
  },
  {
    id: 2,
    title: 'Blacksite Protocol',
    category: 'Lighting',
    discipline: 'Environment Lighting',
    image: image('photo-1519608487953-e999c86e7455'),
    description:
      'A cinematic night environment balancing motivated practicals, deep silhouettes, and volumetric atmosphere.',
    software: ['Unreal Engine 5', 'DaVinci Resolve'],
    date: '2026',
    featured: true,
  },
  {
    id: 3,
    title: 'Orbital Relay',
    category: '3D Modeling',
    discipline: 'Hard Surface',
    image: image('photo-1446776811953-b23d57bd21aa'),
    description:
      'A production-ready orbital communications asset with modular construction, trim-sheet workflow, and cinematic presentation.',
    software: ['Maya', 'ZBrush', 'Substance Painter'],
    date: '2025',
    featured: true,
  },
  {
    id: 4,
    title: 'Impact Frame',
    category: 'Animation',
    discipline: 'Body Mechanics',
    image: image('photo-1536240478700-b869070f9279'),
    description:
      'A dynamic body mechanics exercise developed from thumbnail poses through spline and final camera polish.',
    software: ['Maya', 'Premiere Pro'],
    date: '2025',
  },
  {
    id: 5,
    title: 'M-7 Control System',
    category: 'Rigging',
    discipline: 'Mechanical Rig',
    image: image('photo-1485827404703-89b55fcc595e'),
    description:
      'A reusable mechanical rig featuring piston automation, space switching, and animator-friendly controls.',
    software: ['Maya', 'Python', 'MEL'],
    date: '2025',
  },
  {
    id: 6,
    title: 'Silent District',
    category: '3D Layout',
    discipline: 'Environment Assembly',
    image: image('photo-1518005020951-eccb494ad742'),
    description:
      'A modular environment layout exploring sightlines, player guidance, set dressing density, and camera rhythm.',
    software: ['Unreal Engine 5', 'Maya'],
    date: '2026',
  },
  {
    id: 7,
    title: 'Signal / Title Sequence',
    category: 'Video Editing',
    discipline: 'Motion Graphics',
    image: image('photo-1492619375914-88005aa9e8fb'),
    description:
      'An editorial motion piece combining restrained typography, sound-led pacing, and procedural graphic elements.',
    software: ['After Effects', 'Premiere Pro'],
    date: '2026',
  },
  {
    id: 8,
    title: 'Ember Crown',
    category: 'CFX',
    discipline: 'Fire & Smoke',
    image: image('photo-1511497584788-876760111969'),
    description:
      'A layered pyro setup designed around a controlled crown silhouette, rolling combustion, sparks, and heat distortion.',
    software: ['Houdini', 'Nuke'],
    date: '2025',
  },
  {
    id: 9,
    title: 'Nocturne Interior',
    category: 'Lighting',
    discipline: 'Interior Lighting',
    image: image('photo-1600607687939-ce8a6c25118c'),
    description:
      'A low-key interior study using practical fixtures, cool ambient spill, and selective highlights to guide the eye.',
    software: ['Maya', 'Arnold'],
    date: '2025',
  },
]

const navItems = [
  ['Home', 'home'],
  ['CFX', 'cfx'],
  ['Lighting', 'lighting'],
  ['3D Modeling & Texture', 'modeling'],
  ['Animation', 'animation'],
  ['Rigging', 'rigging'],

  
  ['About', 'about'],
  ['Education', 'education'],
  ['Skills', 'skills'],
  ['Contact', 'contact'],
]

const cfxTypes = [
  'Cloth',
  'Hair',
  'Destruction',
  'Rigid Bodies',
  'Soft Bodies',
  'Fluids',
  'Smoke',
  'Fire',
  'Particles',
]

const skillGroups = [
  {
    label: '3D Software',
    items: ['Houdini', 'Unreal Engine 5', 'Maya', 'Substance 3D', 'Unity', 'Blender', ],
  },
  { label: 'Rendering', items: ['Eevee & Cycles', 'Vray', 'Arnold'] },
  { label: 'Video', items: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'] },
  { label: 'Technical', items: ['Javascript', 'MEL', 'Procedural Workflows', ] },
]

const education = [
  ['2026', 'Unreal Engine 5', ' · Professional practice'],
  ['2026', ' Houdini FX', ' · Online Intensive'],
  ['2025', 'Advanced Cloth Simulation', 'Animverso — Cruz Contreras'],
  ['2024', 'Cloth Simulation Fundamentals', 'Animverso — Cruz Contreras'],
  ['2022-2026', '3D Generalist', 'UNITEC: Digital Animation & Interactive Design'],
]

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)
  const [cursor, setCursor] = useState({ x: -40, y: -40 })
  const [cursorActive, setCursorActive] = useState(false)
  const [comparison, setComparison] = useState(52)
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900)
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
      setShowTop(window.scrollY > 700)
    }
    const onPointerMove = (event: PointerEvent) => setCursor({ x: event.clientX, y: event.clientY })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    onScroll()
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach((element) => observerRef.current?.observe(element))
    return () => observerRef.current?.disconnect()
  }, [loading])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null)
        setMenuOpen(false)
      }
    }
    document.body.style.overflow = activeProject || menuOpen ? 'hidden' : ''
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeProject, menuOpen])

  const filteredProjects = useMemo(() => {
    const normalized = query.toLowerCase().trim()
    return projects.filter((project) => {
      const matchesFilter = activeFilter === 'All' || project.category === activeFilter
      const matchesQuery = !normalized || `${project.title} ${project.category} ${project.discipline}`.toLowerCase().includes(normalized)
      return matchesFilter && matchesQuery
    })
  }, [activeFilter, query])

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormStatus('sending')
    const form = event.currentTarget
    const data = new FormData(form)
    const body = new URLSearchParams()
    data.forEach((value, key) => body.append(key, value.toString()))
    try {
      const response = await fetch('/contact.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!response.ok) throw new Error('Submission failed')
      setFormStatus('sent')
      form.reset()
    } catch {
      setFormStatus('error')
    }
  }

  const openProject = (project: Project) => setActiveProject(project)
  const closeMenuAndScroll = () => setMenuOpen(false)

  return (
    <main className="site-shell" id="home">
      <a className="skip-link" href="#portfolio">Skip to portfolio</a>
      <div className="noise" aria-hidden="true" />
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} />
      <div className="custom-cursor" aria-hidden="true" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0) scale(${cursorActive ? 1.8 : 1})` }} />

      <div className={`loader ${loading ? '' : 'loader--hidden'}`} aria-hidden={!loading}>
        <div className="loader__mark"><Asterisk /></div>
        <div className="loader__line"><span /></div>
        <p>Composing worlds</p>
      </div>

      <header className="nav-wrap">
        <a href="#home" className="brand" aria-label="Alessandro Estevez, home" onMouseEnter={() => setCursorActive(true)} onMouseLeave={() => setCursorActive(false)}>
          <img
  src="/images/yotraje2.png"
  alt="Alessandro Estévez"
  className="brand-avatar"
/>
          <small>Alessandro Estévez<br />3D Artist</small>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.slice(1, -1).map(([label, href]) => <a key={href} href={`#${href}`}>{label}</a>)}
        </nav>
        <a className="nav-contact" href="#contact">Let’s talk <ArrowRight size={15} /></a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></button>
      </header>

      <div className={`menu-panel ${menuOpen ? 'menu-panel--open' : ''}`} aria-hidden={!menuOpen}>
        <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button>
        <p>Navigate</p>
        <nav>{navItems.map(([label, href], index) => <a key={href} href={`#${href}`} onClick={closeMenuAndScroll}><span>0{index + 1}</span>{label}</a>)}</nav>
      </div>
<section className="hero section-pad" aria-labelledby="hero-title">

  <video
    className="hero__video"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src="/videos/hero-background.mp4" type="video/mp4" />
  </video>

  <div className="hero__veil" />

  <div className="hero__orb hero__orb--one" />
  <div className="hero__orb hero__orb--two" />

  <div className="hero__eyebrow">
    <span>Character Effects Artist</span>
    <span>2026 Portfolio</span>
  </div>

  <div className="hero__content">
    <p className="kicker hero-enter"></p>

    <h1 id="hero-title" className="hero-enter hero-enter--2">
      Alessandro <i></i><br />
      <span>Estevez</span>
    </h1>

    <div className="hero__bottom hero-enter hero-enter--3">
      <p>
        CFX/Technical Artist & 3D Generalist
      </p>

   
    </div>
  </div>

  <div className="scroll-cue">
    <MousePointer2 size={15} />
    <span>Scroll to explore</span>
  </div>

</section>
      <section className="profile section-pad reveal" aria-label="Profile">

  <div className="profile__image">
    <img 
      src="/images/yotraje2.png" 
      alt="Alessandro Estévez"
    />
  </div>

  <div className="profile__content">

    <p className="section-number">01 / Profile</p>

    <h2>
      Hi, I'm <em>Alessandro</em>
    </h2>

    <h3>
      CFX & 3D Generalist Artist
    </h3>

    <p>
      I am a CFX Artist specializing in cloth, hair, and simulation using Autodesk Maya and Houdini. I also create 3D assets through modeling, UV unwrapping, texturing, lighting, and environment assembly in Unreal Engine 5, combining technical expertise and creativity to deliver immersive, high-quality visual experiences.
      </p>


    <div className="profile__socials">

  <a 
    href="https://www.linkedin.com/in/alessandro-est%C3%A9vez-4858332a2/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
  >
    <img src="/images/linkedin.png" alt="LinkedIn" />
  </a>


  <a 
    href="https://www.instagram.com/alessandro_estevez"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <img src="/images/instagram.png" alt="Instagram" />
  </a>

</div>

  </div>

</section>

    

      <section className="discipline discipline--cfx section-pad" id="cfx">

  <div className="discipline__intro reveal">
    <p className="section-number">02 / CFX</p>

    <h2>
      CFX<br />
      <em>Demo Reel</em>
    </h2>

    <p>
      Cloth & Hair
    </p>
  </div>


  <div className="cfx-visual reveal">

  <video 
  src="/videos/cfx-demo-reel.mp4"
  controls
  playsInline
  preload="metadata"
/>

    <div className="cfx-visual__ring" />

    

  </div>

</section>


<section className="lighting section-pad" id="lighting">

  <div className="section-heading reveal">
    <div>
      <p className="section-number">03 / </p>

      <h2>
        Lightning<br />
        <em>Demo Reel</em>
      </h2>
       <p>
      Maya, Nuke , Blender , Unreal Engine
    </p>
    </div>

   
  </div>


  {/* VIDEO PRINCIPAL */}
  <div className="lighting-video reveal">

    <video
      src="/videos/lighting-demo.mp4"
      poster="/images/lighting-cover.png"
      controls
      playsInline
      preload="metadata"
    />

  </div>


  {/* GALERÍA DE IMÁGENES */}
  <div className="horizontal-gallery">

    {[
      {
        id: 1,
        title: "Interior Lighting",
        discipline: "Interior",
        image: "/images/light01.png"
      },
      {
        id: 2,
        title: "Atmospheric Study",
        discipline: "For Virtual Reality",
        image: "/images/light02.png"
      },
      {
        id: 3,
        title: "3D Scanning",
        discipline: "Unreal Engine 5",
        image: "/images/light03.png"
      }
    ].map((project, index) => (

      <button
        type="button"
        className="light-card reveal"
        key={project.id}
      >

        <img 
          src={project.image}
          alt={project.title}
          loading="lazy"
        />

        <span>
          <small>
            0{index + 1} / {project.discipline}
          </small>

          <strong>
            {project.title}
          </strong>
        </span>

      </button>

    ))}

  </div>

</section>
<section className="modeling section-pad" id="modeling">
  <div className="modeling__title reveal">
    <p className="section-number">04 / 3D Modeling & Texture</p>
    <h2>3D <em>Gallery</em></h2>
  </div>

  <div className="modeling__gallery reveal">
    {[
      "model1.png",
      "model2.jpeg",
      "model3.jpeg",
      "model4.jpeg",
      "model5.jpg",
      "model6.jpg",
      "model7.png",
      "model8.jpg",
      "model9.jpg",
      "model10.jpg",
      "model11.jpg",
      "model12.jpg",
      "model13.png",
      "model14.png",
      "model15.png",
      "model16.png",
      "model17.jpg",
      "model18.png",
      "model19.jpg",
      "model20.jpg",
      "model21.jpg",
      "model22.jpg",
      "model23.png",
      "model24.jpg"
    ].map((image, index) => (
      <div className="modeling__item" key={image}>
        <img
          src={`/images/modeling/${image}`}
          alt={`3D Model ${index + 1}`}
          loading="lazy"
        />

        <div className="modeling__overlay">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <p>3D Asset / PBR</p>
        </div>
      </div>
    ))}
  </div>

  <div className="modeling__categories reveal">
    {[
      'Hard Surface',
      'Props',
      'Environment Assets',
      'Characters',
      'Product Visualization'
    ].map((item, index) => (
      <span key={item}>
        <b>0{index + 1}</b>
        {item}
      </span>
    ))}
  </div>
</section>

      <section className="motion-section section-pad" id="animation">
  <div className="motion-section__heading reveal">
    <p className="section-number">05 / Animation Blocking</p>
    <h2><br /><em></em></h2>
  </div>

  <div className="reel-grid">
    {[
      "blocking1.mp4",
      "blocking2.mp4",
      "blocking3.mp4",
      "blocking4.mp4",
      "blocking5.mp4",
      "blocking6.mp4"
    ].map((video, index) => (
      <article className="reel-card reveal" key={video}>
 <div className="reel-card__visual">
  <video
    src={`/videos/${video}`}
    muted
    playsInline
    preload="metadata"
    onEnded={(e) => {
      e.currentTarget.nextElementSibling.style.opacity = "1";
    }}
  />

  <button
    type="button"
    className="reel-play"
    onClick={(e) => {
      const videoElement = e.currentTarget.previousElementSibling;

      if (videoElement.paused) {
        videoElement.play();
        e.currentTarget.style.opacity = "0";
      }
    }}
  >
    <CirclePlay />
  </button>

  <span>00:{18 + index * 9}</span>
</div>

      </article>
    ))}
  </div>
</section>

     
    <section className="rigging section-pad" id="rigging">

  <div className="section-heading reveal">
    <div>
      <p className="section-number">06 / Rigging</p>

      <h2>
        Rigging<br />
        <em>Demo Reel</em>
      </h2>
       <p className="rigging-showcase__description">
      Character & Facial Rigging, Mechanical Systems
    </p>

    </div>

   

    

  </div>


  <div className="rigging-showcase__video reveal">

    <video
      src="/videos/rigging-demo.mp4"
      poster="/images/rigging-cover.png"
      controls
      playsInline
      preload="metadata"
    />

  </div>

</section>

     

     

    <section className="about section-pad" id="about">
  <div className="about__portrait reveal">
   <img 
  src="/images/casual.png" 
  alt="Alessandro Estevez, Technical Artist" 
  loading="lazy" 
/>

    <div className="about__portrait-note">
      <span>Portrait / 2026</span>
     
    </div>
  </div>


  <div className="about__copy reveal">
    <p className="section-number">07 / About Me</p>

    <h2>
      Alessandro Estévez<br />
      <em></em>
    </h2>

    <p className="about__lead">
      I am a CFX Artist specializing in cloth, hair, and simulation workflows 
      using Autodesk Maya and Houdini. I enjoy creating realistic character 
      effects that enhance animation through technical problem-solving and 
      artistic detail.
    </p>

    <p className="about__lead">
      Beyond CFX, I also create complete 3D assets by modeling, UV unwrapping, 
      texturing, lighting, and assembling environments in Unreal Engine 5. 
      Passionate about combining technology, creativity, and storytelling, 
      I strive to build immersive digital experiences and high-quality visuals.
    </p>

    <a className="text-link" href="#contact">
      Start a conversation <ArrowRight />
    </a>

  </div>
</section>

   <section className="education section-pad" id="education">
  <div className="education__heading reveal">
    <p className="section-number">08 / Education</p>
    <h2>
      Always learning.
      <br />
      <em>Always making.</em>
    </h2>
  </div>

  <div className="timeline reveal">
    {education.map(([year, title, school]) => (
      <article key={title}>
        <span>{year}</span>

        <i aria-hidden="true"></i>

        <div>
          <h3>{title}</h3>
          <p>{school}</p>
        </div>

        <Asterisk />
      </article>
    ))}
  </div>
</section>

      <section className="skills section-pad" id="skills">
        <div className="skills__heading reveal"><p className="section-number">9 / Skills</p><h2>Tools change.<br /><em>Craft remains.</em></h2><p></p></div>
        <div className="skill-groups">{skillGroups.map((group, groupIndex) => <article className="skill-group reveal" key={group.label}><div><span>0{groupIndex + 1}</span><h3>{group.label}</h3></div><ul>{group.items.map((item, index) => <li key={item}><span>{item}</span><i><b style={{ transform: `scaleX(${0.68 + ((index + groupIndex) % 4) * 0.08})` }} /></i></li>)}</ul></article>)}</div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact__heading reveal">
          <p className="section-number">10 / Contact</p>
          <h2>Let’s create something<br /><em>amazing together.</em></h2>
          <p>Have a project, role, or collaboration in mind? Tell me what you’re building.</p>
          <a href="mailto:hello@alexmorgan.art"><Mail size={16} /> alessandroestevez.cfx@gmail.com</a>
          
        </div>
        <form className="contact-form reveal" name="contact" onSubmit={submitContact}>
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden-field"><label>Don’t fill this out: <input name="bot-field" /></label></p>
          <label><span>01 / Your name</span><input name="name" type="text" placeholder="Your Name" required autoComplete="name" /></label>
          <label><span>02 / Email address</span><input name="email" type="email" placeholder="Email" required autoComplete="email" /></label>
          <label><span>03 / I’m interested in</span><select name="projectType" defaultValue=""><option value="" disabled>Select a project type</option><option>Technical art</option><option>3D production</option><option>Lighting & look development</option><option>Freelance collaboration</option><option>Full-time opportunity</option></select></label>
          <label><span>04 / Project details</span><textarea name="message" rows={4} placeholder="A little about the project, timeline, and goals…" required /></label>
          <button className="button button--primary" type="submit" disabled={formStatus === 'sending' || formStatus === 'sent'}>{formStatus === 'sending' ? 'Sending…' : formStatus === 'sent' ? 'Message sent' : 'Send inquiry'} {formStatus === 'sent' ? <Check size={17} /> : <Send size={17} />}</button>
          {formStatus === 'sent' && <p className="form-message form-message--success">Thanks for reaching out. I’ll reply within 2–3 business days.</p>}
          {formStatus === 'error' && <p className="form-message form-message--error">Something went wrong. Please email me directly instead.</p>}
        </form>
      </section>

      <footer className="footer section-pad">
        <div className="footer__top"><span> </span><h2>Make it real</h2><Asterisk /></div>
        <div className="footer__bottom"><p>Technical Artist · 3D Generalist</p><p> © 2026 All rights reserved</p><div><a href="#home">Back to top <ArrowUp size={14} /></a></div></div>
      </footer>

      <button className={`back-to-top ${showTop ? 'back-to-top--visible' : ''}`} type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp /></button>

      {activeProject && <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={() => setActiveProject(null)}><div className="modal__panel" onClick={(event) => event.stopPropagation()}><button className="modal__close" type="button" onClick={() => setActiveProject(null)} aria-label="Close project"><X /></button><div className="modal__image"><img src={activeProject.image} alt="" /><span>{activeProject.category}</span></div><div className="modal__content"><p className="section-number">Selected project / {activeProject.date}</p><h2 id="modal-title">{activeProject.title}</h2><h3>{activeProject.discipline}</h3><p>{activeProject.description}</p><video className="modal__video" controls preload="none" poster={activeProject.image}><source src="https://videos.pexels.com/video-files/3141208/3141208-hd_1920_1080_25fps.mp4" type="video/mp4" /></video><div className="modal__details"><span>Software used</span><div>{activeProject.software.map((tool) => <b key={tool}>{tool}</b>)}</div></div><div className="modal__frames"><div>01 <span>Process</span></div><div>02 <span>Breakdown</span></div><div>03 <span>Final</span></div></div><button className="button button--primary" type="button" onClick={() => setActiveProject(null)}>Close project <X size={16} /></button></div></div></div>}
    </main>
  )
}
