'use client'

import { useState, useEffect, useRef } from 'react'
import { skills, timeline, initialProjects, Project, ProjectType } from './data'

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [nextId, setNextId] = useState(4)

  // Add project modal
  const [addOpen, setAddOpen] = useState(false)
  const [currentType, setCurrentType] = useState<ProjectType>('link')
  const [pTitle, setPTitle] = useState('')
  const [pDesc, setPDesc] = useState('')
  const [pUrl, setPUrl] = useState('')
  const [pImgUrl, setPImgUrl] = useState('')
  const [pTags, setPTags] = useState('')
  const [pTagsGallery, setPTagsGallery] = useState('')
  const [galleryImages, setGalleryImages] = useState<string[]>([])

  // View project modal
  const [viewOpen, setViewOpen] = useState(false)
  const [viewProject, setViewProject] = useState<Project | null>(null)

  // Lightbox
  const [lbOpen, setLbOpen] = useState(false)
  const [lbImages, setLbImages] = useState<string[]>([])
  const [lbIdx, setLbIdx] = useState(0)

  // Skill bar animation
  const skillsRef = useRef<HTMLDivElement>(null)
  const [skillsVisible, setSkillsVisible] = useState(false)

  // Fade in observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))

    const skillObs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setSkillsVisible(true) },
      { threshold: 0.2 }
    )
    if (skillsRef.current) skillObs.observe(skillsRef.current)

    return () => { observer.disconnect(); skillObs.disconnect() }
  }, [])

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lbOpen) {
        if (e.key === 'ArrowLeft') lbNav(-1)
        if (e.key === 'ArrowRight') lbNav(1)
        if (e.key === 'Escape') setLbOpen(false)
      }
      if (e.key === 'Escape') { setAddOpen(false); setViewOpen(false) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lbOpen, lbIdx, lbImages])

  useEffect(() => {
    document.body.classList.toggle('light', !isDark)
  }, [isDark])

  useEffect(() => {
    if (addOpen || viewOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [addOpen, viewOpen])

  function lbNav(dir: number) {
    setLbIdx((i) => (i + dir + lbImages.length) % lbImages.length)
  }

  function openLightbox(imgs: string[], idx: number) {
    setLbImages(imgs)
    setLbIdx(idx)
    setLbOpen(true)
  }

  function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    const remaining = 50 - galleryImages.length
    files.slice(0, remaining).forEach((f) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setGalleryImages((prev) => [...prev, ev.target?.result as string])
      }
      reader.readAsDataURL(f)
    })
  }

  function removeGalleryImg(idx: number) {
    setGalleryImages((prev) => prev.filter((_, i) => i !== idx))
  }

  function resetForm() {
    setPTitle(''); setPDesc(''); setPUrl(''); setPImgUrl('')
    setPTags(''); setPTagsGallery(''); setGalleryImages([])
    setCurrentType('link')
  }

  function saveProject() {
    if (!pTitle.trim() || !pDesc.trim()) { alert('Please fill in title and description.'); return }
    
    const p: Project = {
      id: nextId,
      type: currentType,
      title: pTitle.trim(),
      desc: pDesc.trim(),
      images: [...galleryImages],
    }

    if (currentType === 'link') {
      p.url = pUrl.trim() || '#'
      p.imgUrl = pImgUrl.trim() || (galleryImages.length > 0 ? galleryImages[0] : '')
      p.tags = pTags.split(',').map((x) => x.trim()).filter(Boolean)
    } else {
      if (galleryImages.length === 0) { alert('Please upload at least one image.'); return }
      p.tags = pTagsGallery.split(',').map((x) => x.trim()).filter(Boolean)
    }

    setProjects((prev) => [p, ...prev])
    setNextId((n) => n + 1)
    setAddOpen(false)
    resetForm()
  }

  // Contact form
  const [cName, setCName] = useState('')
  const [cEmail, setCEmail] = useState('')
  const [cSubject, setCSubject] = useState('')
  const [cMsg, setCMsg] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formSent, setFormSent] = useState(false)

  function submitContact() {
    const errs: Record<string, string> = {}
    if (!cName.trim()) errs.name = 'Name is required'
    if (!cEmail.trim() || !/\S+@\S+\.\S+/.test(cEmail)) errs.email = 'Valid email is required'
    if (!cMsg.trim()) errs.msg = 'Message is required'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setFormSent(true)
    setCName(''); setCEmail(''); setCSubject(''); setCMsg('')
    setTimeout(() => setFormSent(false), 5000)
  }

  return (
    <>
      <nav>
        <div className="nav-logo">DLahiru</div>
        <div className="nav-links">
          {['about','skills','experience','projects','contact'].map((s) => (
            <a key={s} href={`#${s}`}>{s}</a>
          ))}
          <button className="theme-btn" onClick={() => setIsDark(!isDark)}>
            {isDark ? '🌙' : '☀️'}
          </button>
        </div>
        <button className="ham" onClick={() => setMobileOpen(!mobileOpen)}>
          <span/><span/><span/>
        </button>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {['about','skills','experience','projects','contact'].map((s) => (
          <a key={s} href={`#${s}`} onClick={() => setMobileOpen(false)}>{s}</a>
        ))}
        <button className="theme-btn" style={{alignSelf:'flex-start'}} onClick={() => setIsDark(!isDark)}>
          {isDark ? '🌙' : '☀️'}
        </button>
      </div>

      <div id="hero">
        <div className="hero-bg">
          <div className="hero-orb a"/><div className="hero-orb b"/>
        </div>
        <div className="hero-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          
          <div className="hero-content" style={{ flex: '1 1 500px' }}>
            <div className="hero-tag">Available for opportunities</div>
            <h1 className="hero-name">Lahiru<br/><em>Chathuranga</em></h1>
            <p className="hero-bio">IT Undergraduate @ IIT | 💻 Full-Stack Developer 📸 Founder, Dream Delights Photography 🎨 Creative Director</p>
            <div className="hero-ctas">
              <a href="#projects" className="btn btn-primary">View Work →</a>
              <a href="#contact" className="btn btn-outline">Let's Talk</a>
            </div>
          </div>

          <div className="hero-image-side" style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
             <div style={{ position: 'relative', width: '100%', maxWidth: '400px', aspectRatio: '1/1' }}>
                <img 
                  src='/images/MY1.png' 
                  alt="Lahiru Chathuranga" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }} 
                />
             </div>
          </div>

          <div className="hero-scroll">
            <div className="scroll-line"/>
            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>
      </div>

      <section id="about" className="section-wrap">
        <div className="about-grid fade-in">
          <div className="about-image">
            <div className="about-img-frame">
              <img 
                src='/images/MY.png' 
                alt="IIT Logo" 
                className="about-img-logo" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            </div>
            <div className="about-badge">
              <strong>2+</strong>Years of Experience
            </div>
          </div>
          <div>
            <div className="section-label">About me</div>
            <h2 className="section-title">Coding the vision,<br/> <em style={{fontFamily:'var(--font-serif)',color:'var(--accent2)'}}>designing the experience.</em></h2>
            <p style={{color:'var(--text2)',lineHeight:1.8,marginBottom:'1rem',fontSize:'0.95rem'}}>
              I’m an IT undergraduate and web developer with a professional background in photography and retouching. I thrive at the intersection of technical logic and visual art, focusing on building functional websites with a sharp eye for design.
            </p>
            <p style={{color:'var(--text2)',lineHeight:1.8,fontSize:'0.95rem'}}>
              When I’m not coding, I’m usually behind the lens capturing new perspectives or refining digital visuals. I love blending my technical skills with creativity to build high-quality, impactful digital experiences.
            </p>
            <div className="stat-row">
              {[['Pending','Projects'],['5+','Technologies'],['01','Brand']].map(([n,l]) => (
                <div className="stat" key={l}>
                  <div className="stat-num">{n}</div>
                  <div className="stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section-wrap">
        <div className="fade-in">
          <div className="section-label">// tech stack</div>
          <h2 className="section-title">Skills & Tools</h2>
          <p className="section-sub">Technologies I work with daily, from frontend frameworks to digital editing tools.</p>
        </div>
        <div className="skills-grid fade-in" ref={skillsRef}>
          {skills.map((s) => (
            <div className="skill-card" key={s.name}>
              <div className="skill-icon" style={{fontFamily:'var(--font-mono)',fontSize:s.icon.length>1?'1rem':'1.5rem'}}>{s.icon}</div>
              <div className="skill-name">{s.name}</div>
              <div className="skill-level">{s.level}</div>
              <div className="skill-bar">
                <div className="skill-bar-fill" style={{width: skillsVisible ? `${s.pct}%` : '0%'}}/>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="section-wrap">
        <div className="fade-in">
          <div className="section-label">// career path</div>
          <h2 className="section-title">Experience &<br/>Education</h2>
          <p className="section-sub">A timeline of my professional journey and academic background.</p>
        </div>
        <div className="timeline fade-in">
          {timeline.map((item, i) => (
            <div className="tl-item" key={i}>
              <div className="tl-dot"/>
              <div className="tl-period">{item.period}</div>
              <div className="tl-role">{item.role}</div>
              <div className="tl-company">{item.company}</div>
              <div className="tl-desc">{item.desc}</div>
              <div className="tl-tags">
                {item.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="section-wrap">
        <div className="projects-header fade-in">
          <div>
            <div className="section-label">// portfolio</div>
            <h2 className="section-title" style={{marginBottom:0}}>Selected Projects</h2>
          </div>
          <button className="add-project-btn" onClick={() => setAddOpen(true)}>+ Add Project</button>
        </div>
        <div className="projects-grid fade-in">
          {projects.length === 0 ? (
            <div className="empty-state">
              <h3>No projects yet</h3>
              <p>Click "Add Project" to showcase your work</p>
              <button className="btn btn-primary" onClick={() => setAddOpen(true)}>+ Add Your First Project</button>
            </div>
          ) : projects.map((p) => (
            <div className="project-card" key={p.id} onClick={() => { setViewProject(p); setViewOpen(true) }}>
              <div className="project-thumb">
                {p.type === 'link' && p.imgUrl
                  ? <img src={p.imgUrl} alt={p.title} loading="lazy"/>
                  : p.images?.length
                  ? <img src={p.images[0]} alt={p.title} loading="lazy"/>
                  : <div className="project-thumb-placeholder">{p.title[0]}</div>
                }
                <span className={`project-type-badge ${p.type === 'link' ? 'badge-link' : 'badge-gallery'}`}>
                  {p.type.toUpperCase()}
                </span>
              </div>
              <div className="project-info">
                <div className="project-title">{p.title}</div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-footer">
                  <div className="project-count">
                    {p.images && p.images.length > 0 ? `${p.images.length} images` : `${p.tags?.length || 0} technologies`}
                  </div>
                  <div className="project-action">
                    {p.type === 'link' ? 'Open site →' : 'View gallery →'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section-wrap">
        <div className="fade-in">
          <div className="section-label">// get in touch</div>
          <h2 className="section-title">Let's Work<br/>Together</h2>
        </div>
        <div className="contact-grid fade-in">
          <div className="contact-info">
            <h3>Got a project in mind?</h3>
            <p>I'm always open to discussing new opportunities, creative ideas, or ways to be part of your visions. Drop me a message!</p>
            <div className="contact-links">
              {[
                { icon: '✉', label: 'Email', val: 'dlahiru2003@gmail.com', href: 'mailto:dlahiru2003@gmail.com' },
                { icon: '🔗', label: 'LinkedIn', val: 'Lahiru-Chathuranga', href: 'https://www.linkedin.com/in/lahiru-chathuranga-326a8a365/' },
                { icon: '⚙', label: 'GitHub', val: 'dlahiru2003-ux', href: 'https://github.com/dlahiru2003-ux' },
              ].map((c) => (
                <a key={c.label} href={c.href} className="contact-link">
                  <div className="contact-link-icon">{c.icon}</div>
                  <div>
                    <strong>{c.label}</strong><br/>
                    <span style={{fontSize:'0.8rem',color:'var(--text3)'}}>{c.val}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="contact-form-wrap">
            <div className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input className="form-input" value={cName} onChange={e=>setCName(e.target.value)} placeholder="Saman Kumara"/>
                  {errors.name && <div className="form-error show">{errors.name}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" value={cEmail} onChange={e=>setCEmail(e.target.value)} placeholder="samankumara@example.com"/>
                  {errors.email && <div className="form-error show">{errors.email}</div>}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input className="form-input" value={cSubject} onChange={e=>setCSubject(e.target.value)} placeholder="Project inquiry..."/>
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" rows={5} value={cMsg} onChange={e=>setCMsg(e.target.value)} placeholder="Tell me about your project..."/>
                {errors.msg && <div className="form-error show">{errors.msg}</div>}
              </div>
              <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'14px'}} onClick={submitContact}>
                Send Message →
              </button>
              {formSent && <div className="form-success show">✓ Message sent! I'll get back to you within 24 hours.</div>}
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-text">© 2026 Lahiru Chathuranga. All Rights Reserved.</div>
          <div className="footer-links">
            <a href="#hero">↑ Back to top</a>
            <a href="#">Resume</a>
          </div>
        </div>
      </footer>

      {/* --- ADD PROJECT MODAL --- */}
      <div className={`overlay ${addOpen ? 'open' : ''}`} onClick={e => { if((e.target as HTMLElement).classList.contains('overlay')) setAddOpen(false) }}>
        <div className="modal">
          <div className="modal-head">
            <div className="modal-title">Add New Project</div>
            <button className="modal-close" onClick={() => setAddOpen(false)}>✕</button>
          </div>
          <div className="modal-body">
            <div className="type-toggle">
              <button className={`type-btn ${currentType==='link'?'active':''}`} onClick={() => setCurrentType('link')}>🔗 External Link</button>
              <button className={`type-btn ${currentType==='gallery'?'active':''}`} onClick={() => setCurrentType('gallery')}>🖼 Image Gallery</button>
            </div>
            <div className="form-group">
              <label className="form-label">Project Title</label>
              <input className="form-input" value={pTitle} onChange={e=>setPTitle(e.target.value)} placeholder="My Awesome Project"/>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" rows={3} value={pDesc} onChange={e=>setPDesc(e.target.value)} placeholder="What does this project do?"/>
            </div>

            {currentType === 'link' && (
              <>
                <div className="form-group">
                  <label className="form-label">Project URL</label>
                  <input className="form-input" type="url" value={pUrl} onChange={e=>setPUrl(e.target.value)} placeholder="https://example.com"/>
                </div>
                <div className="form-group">
                  <label className="form-label">Preview Image URL (optional)</label>
                  <input className="form-input" type="url" value={pImgUrl} onChange={e=>setPImgUrl(e.target.value)} placeholder="https://example.com/preview.png"/>
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Upload Images (max 50)</label>
              <div className="img-upload-area" onClick={() => (document.getElementById('galleryInput') as HTMLInputElement)?.click()}>
                <input type="file" id="galleryInput" multiple accept="image/*" style={{display:'none'}} onChange={handleGalleryUpload}/>
                <div style={{fontSize:'2rem',marginBottom:'0.5rem'}}>📁</div>
                <div style={{fontWeight:500,marginBottom:'4px'}}>Click to upload images</div>
                <div style={{fontSize:'0.8rem',color:'var(--text2)'}}>PNG, JPG, WebP · Up to 50 images</div>
              </div>
              {galleryImages.length > 0 && (
                <>
                  <div className="img-preview-grid">
                    {galleryImages.map((img, i) => (
                      <div className="img-thumb" key={i}>
                        <img src={img} alt=""/>
                        <button className="img-thumb-del" onClick={() => removeGalleryImg(i)}>✕</button>
                      </div>
                    ))}
                  </div>
                  <div className="img-count">{galleryImages.length}/50 images</div>
                </>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Tech Tags (comma-separated)</label>
              <input className="form-input" 
                value={currentType === 'link' ? pTags : pTagsGallery} 
                onChange={e => currentType === 'link' ? setPTags(e.target.value) : setPTagsGallery(e.target.value)} 
                placeholder="React, Photography, etc."/>
            </div>

            <div className="form-actions">
              <button className="btn-cancel" onClick={() => { setAddOpen(false); resetForm() }}>Cancel</button>
              <button className="btn-save" onClick={saveProject}>Save Project</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- VIEW PROJECT MODAL --- */}
      {viewProject && (
        <div className={`overlay ${viewOpen ? 'open' : ''}`} onClick={e => { if((e.target as HTMLElement).classList.contains('overlay')) setViewOpen(false) }}>
          <div className="modal" style={{maxWidth:'760px'}}>
            <div className="modal-head">
              <div className="modal-title">{viewProject.title}</div>
              <button className="modal-close" onClick={() => setViewOpen(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{color:'var(--text2)',lineHeight:1.8,marginBottom:'1.5rem'}}>{viewProject.desc}</p>
              
              {viewProject.tags?.length && (
                <div className="tl-tags" style={{marginBottom:'1.5rem'}}>
                  {viewProject.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                </div>
              )}

              {viewProject.images && viewProject.images.length > 0 && (
                <div className="gallery-strip">
                  {viewProject.images.map((img, i) => (
                    <div className="gallery-strip-item" key={i} onClick={() => openLightbox(viewProject.images!, i)}>
                      <img src={img} alt={`Gallery ${i+1}`} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                    </div>
                  ))}
                </div>
              )}

              {viewProject.url && viewProject.url !== '#' && (
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a href={viewProject.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex' }}>
                    {viewProject.title === "Graduation Photography" ? "Visit Shoot 01 →" : "Visit Shoot →"}
                  </a>
                  {viewProject.title === "Graduation Photography" && (
                    <>
                      {viewProject.url2 && (
                        <a href={viewProject.url2} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex' }}>Visit Shoot 02 →</a>
                      )}
                      {viewProject.url3 && (
                        <a href={viewProject.url3} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex' }}>Visit Shoot 03 →</a>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- LIGHTBOX --- */}
      <div className={`lightbox ${lbOpen ? 'open' : ''}`}>
        <button className="lb-close" onClick={() => setLbOpen(false)}>✕</button>
        <button className="lb-prev" onClick={() => lbNav(-1)}>‹</button>
        {lbImages[lbIdx] && <img className="lb-img" src={lbImages[lbIdx]} alt=""/>}
        <button className="lb-next" onClick={() => lbNav(1)}>›</button>
        <div className="lb-counter">{lbIdx + 1} / {lbImages.length}</div>
      </div>
    </>
  )
}