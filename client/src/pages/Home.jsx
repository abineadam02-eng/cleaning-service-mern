import { useEffect, useState } from 'react';
import { ArrowRight, Check, ChevronDown, Clock3, Home as HomeIcon, MapPin, Phone, ShieldCheck, Sparkles, Star, ThumbsUp, Users, Wind, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuoteForm from '../components/QuoteForm';
import SectionTitle from '../components/SectionTitle';
import Stars from '../components/Stars';
import api, { FILE_URL } from '../api';
import { site, services, faqs } from '../data/site';

const serviceImages = [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80'
];

export default function Home() {
  const [testimonials, setTestimonials] = useState([]);
  const [beforeAfter, setBeforeAfter] = useState([]);
  const [faq, setFaq] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    api.get('/testimonials').then(r => setTestimonials(r.data)).catch(() => {});
    api.get('/before-after').then(r => setBeforeAfter(r.data)).catch(() => {});
  }, []);

  return <div className="site-shell">
    <Header />
    <main>
      <section id="home" className="theme-hero">
        <div className="container hero-inner">
          <div className="hero-copy-new">
            <span className="hero-kicker"><Sparkles size={16}/> PROFESSIONAL CLEANING SERVICES</span>
            <h1>We make your <span>space shine.</span></h1>
            <p>Reliable home and commercial cleaning with trained professionals, flexible scheduling and a simple free-quote process.</p>
            <div className="hero-buttons"><a className="primary-btn" href="#quote">Get a Free Quote <ArrowRight size={18}/></a><a className="outline-btn" href={`tel:${site.phone}`}><Phone size={17}/> {site.phone}</a></div>
            <div className="hero-trust"><div><span><Check size={15}/></span> Fully insured service</div><div><span><Check size={15}/></span> Experienced cleaners</div><div><span><Check size={15}/></span> 100% satisfaction focus</div></div>
          </div>
          <div className="hero-image-wrap">
            <div className="hero-image"><img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1100&q=85" alt="Professional cleaner"/></div>
            <div className="hero-badge"><div className="badge-icon"><Star fill="currentColor" size={22}/></div><div><strong>5.0 / 5</strong><small>Customer satisfaction</small></div></div>
            <div className="hero-shape"></div>
          </div>
        </div>
      </section>

      <section className="quick-info">
        <div className="container quick-grid">
          <div><span className="quick-icon"><Phone/></span><div><small>CALL US TODAY</small><strong>{site.phone}</strong></div></div>
          <div><span className="quick-icon"><Clock3/></span><div><small>OPENING HOURS</small><strong>{site.hours}</strong></div></div>
          <div><span className="quick-icon"><MapPin/></span><div><small>WE SERVICE</small><strong>{site.address}</strong></div></div>
          <a href="#quote" className="quick-cta">Request a Quote <ArrowRight size={18}/></a>
        </div>
      </section>

      <section id="services" className="section services-modern">
        <div className="container">
          <SectionTitle eyebrow="WHAT WE DO" title="Professional cleaning for every need" text="Choose a service and tell us what your property needs. Our team will help you build the right cleaning plan." center/>
          <div className="service-modern-grid">{services.map((s, i) => <article className="modern-service-card" key={s.title}>
            <div className="service-photo"><img src={serviceImages[i % serviceImages.length]} alt={s.title}/><span>{String(i + 1).padStart(2, '0')}</span></div>
            <div className="service-content"><h3>{s.title}</h3><p>{s.text}</p><a href="#quote">Learn more <ArrowRight size={16}/></a></div>
          </article>)}</div>
        </div>
      </section>

      <section className="about-modern section" id="about">
        <div className="container about-modern-grid">
          <div className="about-images"><img className="about-main-img" src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=85" alt="Cleaning service"/><div className="about-small"><img src="https://images.unsplash.com/photo-1581579185169-cc70e9f3d7f5?auto=format&fit=crop&w=500&q=80" alt="Cleaner at work"/></div><div className="experience-card"><strong>10+</strong><span>Years of<br/>experience</span></div></div>
          <div className="about-text"><SectionTitle eyebrow="ABOUT OUR COMPANY" title="A cleaner home starts with a professional team" text="We combine practical cleaning systems with friendly service. Every booking is handled around your property, your schedule and the areas that matter most to you."/><div className="about-points"><div><span><ShieldCheck/></span><div><strong>Trusted professionals</strong><p>Clear communication and careful work from start to finish.</p></div></div><div><span><ThumbsUp/></span><div><strong>Quality-focused cleaning</strong><p>We pay attention to high-touch areas, bathrooms, kitchens and floors.</p></div></div><div><span><Users/></span><div><strong>Home & commercial</strong><p>Flexible plans for homes, offices, rentals and property managers.</p></div></div></div><a className="primary-btn" href="#quote">Book a Cleaning <ArrowRight size={18}/></a></div>
        </div>
      </section>

      <section className="feature-band"><div className="container feature-band-grid"><div><span className="eyebrow-dark">WHY CHOOSE US</span><h2>Cleaning done with care, consistency and attention to detail.</h2></div><div className="feature-band-items"><div><ShieldCheck/><strong>Safe & careful</strong><span>Thoughtful cleaning for your space.</span></div><div><Wind/><strong>Fresh results</strong><span>Detailed work where it matters.</span></div><div><Clock3/><strong>On your schedule</strong><span>Flexible booking options.</span></div></div></div></section>

      <section id="before-after" className="section results-section"><div className="container"><SectionTitle eyebrow="OUR WORK" title="See the difference" text="Real before-and-after projects can be added and managed from your admin dashboard." center/>{beforeAfter.length === 0 ? <div className="result-empty"><Sparkles/><h3>Before & After gallery</h3><p>Upload your first project from the admin panel and it will appear here automatically.</p></div> : <div className="result-grid">{beforeAfter.map(item => <article className="result-card" key={item._id} onClick={() => setLightbox(item)}><div className="result-images"><div><img src={`${FILE_URL}${item.beforeImage}`} alt="Before"/><b>Before</b></div><div><img src={`${FILE_URL}${item.afterImage}`} alt="After"/><b>After</b></div></div><div className="result-body"><small>{item.service}{item.location ? ` • ${item.location}` : ''}</small><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>}</div></section>

      <section id="checklist" className="section checklist-modern"><div className="container checklist-modern-grid"><div><SectionTitle eyebrow="OUR CHECKLIST" title="We don't just clean. We detail." text="Every service can be tailored, but our standard checklist covers the areas customers notice most."/><div className="checklist-items">{['Kitchen surfaces, sinks and worktops','Bathrooms, showers and fixtures','Vacuuming and mopping floors','Dusting furniture and accessible surfaces','Doors, switches and high-touch areas','Bedrooms and living spaces','Windows and tracks where accessible','Optional carpet and pest services'].map(x => <div key={x}><Check size={17}/>{x}</div>)}</div><a className="primary-btn" href="#quote">Get My Free Quote <ArrowRight size={18}/></a></div><div className="check-image"><img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=85" alt="Clean kitchen"/><div><strong>Clean.</strong><span>Fresh.</span><b>Ready.</b></div></div></div></section>

      <section className="steps-section section"><div className="container"><SectionTitle eyebrow="HOW IT WORKS" title="Three easy steps to a cleaner space" text="No complicated process. Tell us what you need, confirm the details and we'll take care of the cleaning." center/><div className="steps-grid">{[['01','Tell us what you need','Complete the quick quote form with your property details.'],['02','Choose your service','We confirm the scope, timing and any special requirements.'],['03','Enjoy the clean','Our team arrives prepared and completes the agreed service.']].map(([n,t,p]) => <div className="step-card" key={n}><span>{n}</span><div className="step-line"></div><h3>{t}</h3><p>{p}</p></div>)}</div></div></section>

      <section id="reviews" className="section testimonials-modern"><div className="container"><SectionTitle eyebrow="CUSTOMER REVIEWS" title="Our customers say it best" text="Reviews are managed by your admin team and displayed automatically on the website." center/>{testimonials.length === 0 ? <div className="result-empty"><Star/><h3>Your reviews will appear here</h3><p>Add your first customer review from the admin dashboard.</p></div> : <div className="testimonial-grid">{testimonials.map(t => <article className="testimonial-card" key={t._id}><div className="quote-mark">“</div><Stars rating={t.rating}/><p>{t.comment}</p><div className="reviewer"><span>{t.customerName.slice(0,1)}</span><div><strong>{t.customerName}</strong><small>{t.service || 'Cleaning service'}{t.location ? ` • ${t.location}` : ''}</small></div></div></article>)}</div>}</div></section>

      <section className="quote-section section" id="quote"><div className="container quote-layout"><div className="quote-intro"><span className="eyebrow-dark">GET A FREE QUOTE</span><h2>Let's talk about your cleaning needs.</h2><p>Send us your details and our team will review your request and contact you with the next steps.</p><div className="quote-contact"><div><Phone/><span><small>Call us</small><strong>{site.phone}</strong></span></div><div><MapPin/><span><small>Our service area</small><strong>{site.address}</strong></span></div></div></div><div className="quote-panel"><QuoteForm/></div></div></section>

      <section className="section faq-modern"><div className="container faq-modern-grid"><div><SectionTitle eyebrow="FAQ" title="Frequently asked questions" text="A few answers before you book."/><a href="#quote" className="text-arrow">Still have a question? Contact us <ArrowRight size={16}/></a></div><div>{faqs.map(([q,a], i) => <div className={`faq-modern-item ${faq === i ? 'active' : ''}`} key={q}><button onClick={() => setFaq(faq === i ? -1 : i)}><span>{q}</span><ChevronDown/></button>{faq === i && <p>{a}</p>}</div>)}</div></div></section>

      <section className="locations-modern"><div className="container"><div><span className="eyebrow-dark">SERVICE AREAS</span><h2>Local cleaners, ready when you are.</h2><p>We're currently serving customers across our listed areas. Update these locations in the site configuration as your business grows.</p></div><div className="locations-list">{site.locations.map(location => <span key={location}><MapPin size={16}/>{location}</span>)}</div></div></section>
    </main>
    <Footer/>
    {lightbox && <div className="lightbox" onClick={() => setLightbox(null)}><button aria-label="Close"><X/></button><div className="lightbox-content" onClick={e => e.stopPropagation()}><img src={`${FILE_URL}${lightbox.afterImage}`} alt="After"/><h3>{lightbox.title}</h3><p>{lightbox.description}</p></div></div>}
  </div>;
}
