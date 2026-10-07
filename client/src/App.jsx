import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { site } from './data/site';

export default function App() {
  useEffect(() => {
    // Reveal sections when they reach the visual center of the viewport.
    // This gives the page the "next section arrives in the middle" effect
    // without forcing an aggressive scroll-snap on the user.
    const selectors = [
      'main > section',
      '.quick-info',
      '.section-title',
      '.modern-service-card',
      '.result-card',
      '.testimonial-card',
      '.step-card',
      '.faq-modern-item',
      '.quote-form',
      '.about-images',
      '.about-text',
      '.feature-band-items > div',
      '.locations-list span',
      '.checklist-items > div',
      '.primary-btn',
      '.outline-btn',
      '.btn',
      '.text-arrow',
      '.admin-card',
      '.admin-list',
      '.admin-project'
    ];

    const targets = [...document.querySelectorAll(selectors.join(','))];
    targets.forEach((el, index) => {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);

      // Mix the entrance direction so the page does not feel repetitive.
      if (el.matches('.about-images, .result-card:nth-child(odd), .feature-band-items > div:nth-child(odd)')) {
        el.classList.add('reveal-left');
      } else if (el.matches('.about-text, .result-card:nth-child(even), .feature-band-items > div:nth-child(even)')) {
        el.classList.add('reveal-right');
      } else if (el.matches('.modern-service-card, .testimonial-card, .step-card, .faq-modern-item')) {
        el.classList.add('reveal-scale');
      }
    });

    // A centered viewport band means animation starts as the section arrives
    // around the middle of the screen.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.18,
      rootMargin: '-20% 0px -20% 0px'
    });

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const whatsappNumber = (site.whatsapp || site.phone).replace(/[^0-9]/g, '');
  const whatsappMessage = encodeURIComponent(`Hi ${site.name}, I would like to ask about your cleaning services.`);

  return (
    <>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <a
        className="whatsapp-float"
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Contact us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle size={30} strokeWidth={2.4} />
        <span className="whatsapp-pulse" />
      </a>
    </>
  );
}
