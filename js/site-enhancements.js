(() => {
  'use strict';
  const CONTENT = {
    founderName: '', founderBio: '', founderImage: '', politicalImage: '', politicalCaption: '', quote: '',
    contactPhone: '', contactEmail: '', contactAddress: '', instagramUrl: '', facebookUrl: '',
    certificates: [], gallery: []
  };
  const esc = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const placeholder = (label) => `<div class="ti-empty" role="img" aria-label="${esc(label)} placeholder"><span>${esc(label)}</span><small>Replace this placeholder later</small></div>`;
  const image = (src, alt, label) => src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">` : placeholder(label);
  const section = (id, eyebrow, title, content) => `<section id="${id}" class="ti-section"><div class="ti-shell"><p class="ti-eyebrow">${eyebrow}</p><h2>${title}</h2>${content}</div></section>`;

  function addLogoDots() {
    document.querySelectorAll('header a, nav a').forEach((link) => {
      if (!/takht\s*india/i.test(link.textContent || '') || link.querySelector('.ti-logo-dots')) return;
      const dots = document.createElement('span');
      dots.className = 'ti-logo-dots'; dots.setAttribute('aria-label', 'Indian tricolor');
      dots.innerHTML = '<i class="saffron"></i><i class="white"></i><i class="green"></i>'; link.appendChild(dots);
    });
  }
  function removeRequestedContent() {
    document.querySelectorAll('form').forEach((form) => form.remove());
    document.querySelectorAll('section, footer, aside').forEach((node) => {
      const text = (node.textContent || '').trim();
      if (/Trusted By|Signature Campaign/i.test(text) && text.length < 1200) node.remove();
    });
  }
  function addSections() {
    if (document.querySelector('#ti-enhancements')) return;
    const root = document.querySelector('main') || document.querySelector('#root'); if (!root) return;
    const wrap = document.createElement('div'); wrap.id = 'ti-enhancements';
    const stats = section('impact', 'THE RECORD', 'Built for decisions that matter', '<div class="ti-stats"><div><strong>12+</strong><span>Constituencies covered</span></div><div><strong>82.4%</strong><span>Research accuracy</span></div><div><strong>24/7</strong><span>War room readiness</span></div></div>');
    const founder = section('founder', 'THE FOUNDER', CONTENT.founderName || 'Founder information', `<div class="ti-founder"><div class="ti-media">${image(CONTENT.founderImage, CONTENT.founderName || 'Founder portrait', 'Founder image')}</div><div class="ti-copy"><h3>${esc(CONTENT.founderName) || 'Founder name'}</h3><p>${esc(CONTENT.founderBio) || 'Founder biography and leadership story will be added here.'}</p></div></div>`);
    const political = section('perspective', 'PERSPECTIVE', 'Political intelligence in focus', `<div class="ti-perspective"><div class="ti-media">${image(CONTENT.politicalImage, CONTENT.politicalCaption || 'Political person', 'Political person image')}</div><p>${esc(CONTENT.politicalCaption) || 'Political person image and context will be added here.'}</p></div>`);
    const quote = section('principle', 'OUR PRINCIPLE', 'Clarity before noise', `<blockquote>${esc(CONTENT.quote) || 'A grounded plan, a clear point of view, and the discipline to see it through.'}</blockquote>`);
    const certs = CONTENT.certificates.length ? CONTENT.certificates.map((item) => `<article class="ti-card">${image(item.image, item.title || 'Certificate', 'Certificate image')}<h3>${esc(item.title)}</h3><p>${esc(item.issuer)}</p></article>`).join('') : `<article class="ti-card">${placeholder('Achievement certificate 1')}</article><article class="ti-card">${placeholder('Achievement certificate 2')}</article>`;
    const gallery = CONTENT.gallery.length ? CONTENT.gallery.map((item, index) => `<button class="ti-gallery-item" type="button" data-lightbox="${esc(item.image)}" data-gallery-index="${index}" aria-label="Open ${esc(item.title || 'gallery image')}">${image(item.image, item.title || 'Gallery image', 'Gallery image')}<span>${esc(item.title)}</span></button>`).join('') : Array.from({ length: 9 }, (_, index) => `<button class="ti-gallery-item" type="button" data-gallery-index="${index}" aria-label="Open gallery image ${index + 1}">${placeholder(`Gallery image ${index + 1}`)}</button>`).join('');
    const certificates = section('certificates', 'ACHIEVEMENTS', 'Great achievements', `<div class="ti-grid">${certs}</div>`);
    const gallerySection = section('gallery', 'FIELD NOTES', 'Campaign gallery', `<button class="ti-gallery-launch" type="button">Open gallery</button><div class="ti-gallery">${gallery}</div>`);
    const contact = section('contact-details', 'CONTACT', 'Start a conversation', `<div class="ti-contact"><div><p>${esc(CONTENT.contactPhone) || 'Phone information will be added here.'}</p><p>${esc(CONTENT.contactEmail) || 'Email information will be added here.'}</p><p>${esc(CONTENT.contactAddress) || 'Office information will be added here.'}</p></div><div class="ti-social"><a href="${esc(CONTENT.instagramUrl) || '#'}" aria-label="Instagram">Instagram</a><a href="${esc(CONTENT.facebookUrl) || '#'}" aria-label="Facebook">Facebook</a></div></div>`);
    wrap.innerHTML = stats + founder + political + quote + certificates + gallerySection + contact; root.appendChild(wrap); updateExistingSections(root);
    wrap.addEventListener('click', (event) => {
      const target = event.target.closest('[data-lightbox], .ti-gallery-launch, .ti-gallery-item'); if (!target) return;
      const modal = document.createElement('div'); modal.className = 'ti-lightbox';
      const content = target.dataset.lightbox ? `<img src="${esc(target.dataset.lightbox)}" alt="Gallery image">` : `<div class="ti-lightbox-grid">${CONTENT.gallery.length ? CONTENT.gallery.map((item) => image(item.image, item.title || 'Gallery image', 'Gallery image')).join('') : Array.from({ length: 9 }, (_, index) => placeholder(`Gallery image ${index + 1}`)).join('')}</div>`;
      modal.innerHTML = `<button type="button" aria-label="Close gallery">Close</button>${content}`; document.body.appendChild(modal);
      modal.addEventListener('click', (click) => { if (click.target === modal || click.target.closest('button')) modal.remove(); });
    });
  }
  function updateExistingSections(root) {
    root.querySelectorAll('#contact, [data-testid="contact-section"]').forEach((node) => node.remove());
    const about = root.querySelector('#about');
    if (about && !about.querySelector('.ti-about-founder')) {
      const founderBlock = document.createElement('div'); founderBlock.className = 'ti-about-founder';
      founderBlock.innerHTML = `<div><p class="ti-eyebrow">THE FOUNDER</p><h3>${esc(CONTENT.founderName) || 'Founder name'}</h3><p>${esc(CONTENT.founderBio) || 'Founder information will be added here.'}</p></div>${image(CONTENT.founderImage, CONTENT.founderName || 'Founder portrait', 'Founder image')}`;
      about.appendChild(founderBlock);
    }
    const services = root.querySelector('#services');
    if (services) {
      const order = ['Strategy', 'War Room', 'Campaign', 'Social Media', 'Election Survey', 'Documentary'];
      const cards = [...services.querySelectorAll('article, [class*="grid"] > *')];
      cards.sort((a, b) => { const ai = order.findIndex((name) => (a.textContent || '').toLowerCase().includes(name.toLowerCase())); const bi = order.findIndex((name) => (b.textContent || '').toLowerCase().includes(name.toLowerCase())); return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi); }).forEach((card) => card.parentElement?.appendChild(card));
    }
    const desired = ['hero', 'about', 'services', 'approach', 'portfolio', 'impact', 'founder', 'perspective', 'principle', 'certificates', 'gallery', 'contact-details'];
    desired.map((id) => root.querySelector(`#${id}`)).filter(Boolean).forEach((node) => root.appendChild(node));
  }
  function init() { const root = document.querySelector('main') || document.querySelector('#root'); if (!root || !root.children.length) return false; removeRequestedContent(); addLogoDots(); addSections(); return Boolean(document.querySelector('#ti-enhancements')); }
  let attempts = 0; const observer = new MutationObserver(() => { if (init() || attempts > 30) observer.disconnect(); }); observer.observe(document.body, { childList: true, subtree: true });
  const retry = window.setInterval(() => { attempts += 1; if (init() || attempts > 30) window.clearInterval(retry); }, 300);
})();
