(() => {
  'use strict';

  // Replace these empty values with approved content later.
  const CONTENT = {
    founderName: '', // REPLACE_WITH_FOUNDER_NAME
    founderBio: '', // REPLACE_WITH_FOUNDER_BIO
    founderImage: '', // REPLACE_WITH_FOUNDER_IMAGE_URL
    politicalImage: '', // REPLACE_WITH_POLITICAL_PERSON_IMAGE_URL
    politicalCaption: '', // REPLACE_WITH_POLITICAL_PERSON_CAPTION
    quote: '', // REPLACE_WITH_QUOTE
    contactPhone: '', // REPLACE_WITH_CONTACT_PHONE
    contactEmail: '', // REPLACE_WITH_CONTACT_EMAIL
    contactAddress: '', // REPLACE_WITH_CONTACT_ADDRESS
    instagramUrl: '', // REPLACE_WITH_INSTAGRAM_URL
    facebookUrl: '', // REPLACE_WITH_FACEBOOK_URL
    certificates: [], // REPLACE_WITH_CERTIFICATE_ITEMS: [{ title, issuer, image }]
    gallery: [], // REPLACE_WITH_GALLERY_ITEMS: [{ title, image }]
  };

  const esc = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const placeholder = (label) => `<div class="ti-empty" role="img" aria-label="${esc(label)} placeholder"><span>${esc(label)}</span><small>Content coming soon</small></div>`;
  const image = (src, alt, label) => src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">` : placeholder(label);
  const section = (id, eyebrow, title, content) => `<section id="${id}" class="ti-section"><div class="ti-shell"><p class="ti-eyebrow">${eyebrow}</p><h2>${title}</h2>${content}</div></section>`;

  function addLogoDots() {
    document.querySelectorAll('header a, nav a').forEach((link) => {
      if (!/takht\s*india/i.test(link.textContent || '') || link.querySelector('.ti-logo-dots')) return;
      const dots = document.createElement('span');
      dots.className = 'ti-logo-dots';
      dots.setAttribute('aria-label', 'Indian tricolor');
      dots.innerHTML = '<i class="saffron"></i><i class="white"></i><i class="green"></i>';
      link.appendChild(dots);
    });
  }

  function removeRequestedContent() {
    document.querySelectorAll('section, div').forEach((node) => {
      const text = (node.textContent || '').trim();
      if (node.children.length < 12 && /Trusted By|Signature Campaign/i.test(text) && text.length < 500) node.remove();
    });
    document.querySelectorAll('form').forEach((form) => form.remove());
  }

  function addSections() {
    if (document.querySelector('#ti-enhancements')) return;
    const root = document.querySelector('main') || document.querySelector('#root');
    if (!root) return;
    const wrap = document.createElement('div');
    wrap.id = 'ti-enhancements';
    const stats = section('impact', 'THE RECORD', 'Built for decisions that matter', `<div class="ti-stats"><div><strong>01</strong><span>Research-first campaigns</span></div><div><strong>24/7</strong><span>War room readiness</span></div><div><strong>360°</strong><span>Ground to digital strategy</span></div></div>`);
    const founder = section('founder', 'THE PEOPLE BEHIND THE WORK', CONTENT.founderName || 'Meet the founder', `<div class="ti-founder"><div class="ti-media">${image(CONTENT.founderImage, CONTENT.founderName || 'Founder portrait', 'Founder image')}</div><div class="ti-copy"><h3>${esc(CONTENT.founderName) || 'Founder information'}</h3><p>${esc(CONTENT.founderBio) || 'Founder biography and leadership story will be added here.'}</p></div></div>`);
    const political = section('perspective', 'PERSPECTIVE', 'Leadership, read clearly', `<div class="ti-perspective"><div class="ti-media">${image(CONTENT.politicalImage, CONTENT.politicalCaption || 'Political leadership visual', 'Leadership image')}</div><p>${esc(CONTENT.politicalCaption) || 'Caption and context for this visual will be added here.'}</p></div>`);
    const quote = section('principle', 'OUR PRINCIPLE', CONTENT.quote ? `“${esc(CONTENT.quote)}”` : 'Clarity before noise', `<blockquote>${esc(CONTENT.quote) || 'A point of view, a grounded plan, and the discipline to see it through.'}</blockquote>`);
    const certs = CONTENT.certificates.length ? CONTENT.certificates.map((item) => `<article class="ti-card">${image(item.image, item.title || 'Certificate', 'Certificate image')}<h3>${esc(item.title)}</h3><p>${esc(item.issuer)}</p></article>`).join('') : `<article class="ti-card">${placeholder('Certificate')}</article><article class="ti-card">${placeholder('Certificate')}</article>`;
    const gallery = CONTENT.gallery.length ? CONTENT.gallery.map((item) => `<button class="ti-gallery-item" type="button" data-lightbox="${esc(item.image)}" aria-label="Open ${esc(item.title || 'gallery image')}">${image(item.image, item.title || 'Gallery image', 'Gallery image')}<span>${esc(item.title)}</span></button>`).join('') : `<div class="ti-card">${placeholder('Campaign gallery')}</div><div class="ti-card">${placeholder('Campaign gallery')}</div><div class="ti-card">${placeholder('Campaign gallery')}</div>`;
    const certificates = section('certificates', 'CREDENTIALS', 'Certificates and credentials', `<div class="ti-grid">${certs}</div>`);
    const gallerySection = section('gallery', 'FIELD NOTES', 'Campaign gallery', `<div class="ti-gallery">${gallery}</div>`);
    const contact = section('contact-details', 'START A CONVERSATION', 'The next move starts here', `<div class="ti-contact"><div><p>${esc(CONTENT.contactPhone) || 'Phone details will be added here.'}</p><p>${esc(CONTENT.contactEmail) || 'Email details will be added here.'}</p><p>${esc(CONTENT.contactAddress) || 'Office address will be added here.'}</p></div><div class="ti-social"><a href="${esc(CONTENT.instagramUrl) || '#'}" aria-label="Instagram">Instagram</a><a href="${esc(CONTENT.facebookUrl) || '#'}" aria-label="Facebook">Facebook</a></div></div>`);
    wrap.innerHTML = stats + founder + political + quote + certificates + gallerySection + contact;
    root.appendChild(wrap);
    updateExistingSections(root, wrap);
    wrap.addEventListener('click', (event) => {
      const target = event.target.closest('[data-lightbox]');
      if (!target || !target.dataset.lightbox) return;
      const modal = document.createElement('div');
      modal.className = 'ti-lightbox';
      modal.innerHTML = `<button type="button" aria-label="Close image">×</button><img src="${esc(target.dataset.lightbox)}" alt="Gallery image">`;
      document.body.appendChild(modal);
      modal.addEventListener('click', () => modal.remove());
    });
  }

  function updateExistingSections(root, wrap) {
    // Keep one contact section: the enhancement contact block replaces the original form/contact block.
    root.querySelectorAll('#contact, [data-testid="contact-section"]').forEach((node) => node.remove());

    const about = root.querySelector('#about');
    if (about && !about.querySelector('.ti-about-founder')) {
      const tagline = [...about.querySelectorAll('p, h1, h2, h3')].find((node) => /found|intelligence|strategy|campaign/i.test(node.textContent || ''));
      const founderBlock = document.createElement('div');
      founderBlock.className = 'ti-about-founder';
      founderBlock.innerHTML = `<div><p class="ti-eyebrow">THE FOUNDER</p><h3>${esc(CONTENT.founderName) || 'Founder information'}</h3><p>${esc(CONTENT.founderBio) || 'Founder name, profile, and leadership story will be added here.'}</p></div>${image(CONTENT.founderImage, CONTENT.founderName || 'Founder portrait', 'Founder image')}`;
      (tagline?.parentElement || about).appendChild(founderBlock);
    }

    // Preserve the requested service ordering and replace the key proof numbers.
    const services = root.querySelector('#services');
    if (services) {
      const serviceCards = [...services.querySelectorAll('[class*="grid"] > *, article')];
      serviceCards.forEach((card, index) => {
        const number = card.querySelector('[class*="text-4xl"], [class*="text-5xl"], [class*="text-6xl"]');
        if (number) number.textContent = String(index + 1).padStart(2, '0');
      });
    }
    const aboutText = about?.textContent || '';
    if (about && /12\+|constituenc/i.test(aboutText)) about.innerHTML = about.innerHTML.replace(/\d+\+\s*constituenc(?:ies|y)/i, '12+ constituencies');
    if (about && /accuracy/i.test(aboutText)) about.innerHTML = about.innerHTML.replace(/\d+(?:\.\d+)?%\s*accuracy/i, '82.4% accuracy');

    // Present sections in a deliberate narrative order after the original app sections.
    const desired = ['hero', 'about', 'services', 'approach', 'portfolio', 'impact', 'founder', 'perspective', 'principle', 'certificates', 'gallery', 'contact-details'];
    const nodes = desired.map((id) => root.querySelector(`#${id}`)).filter(Boolean);
    nodes.forEach((node) => root.appendChild(node));
  }

  function init() { removeRequestedContent(); addLogoDots(); addSections(); }
  const observer = new MutationObserver(() => { if (document.querySelector('main, #root')?.children.length) { init(); observer.disconnect(); } });
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(init, 1000);
})();
