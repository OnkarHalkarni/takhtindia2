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
    const work = section('work', 'SELECTED WORK', 'Proof will live here', `<div class="ti-grid">${certs}</div><div class="ti-gallery">${gallery}</div>`);
    const contact = section('contact-details', 'START A CONVERSATION', 'The next move starts here', `<div class="ti-contact"><div><p>${esc(CONTENT.contactPhone) || 'Phone details will be added here.'}</p><p>${esc(CONTENT.contactEmail) || 'Email details will be added here.'}</p><p>${esc(CONTENT.contactAddress) || 'Office address will be added here.'}</p></div><div class="ti-social"><a href="${esc(CONTENT.instagramUrl) || '#'}" aria-label="Instagram">Instagram</a><a href="${esc(CONTENT.facebookUrl) || '#'}" aria-label="Facebook">Facebook</a></div></div>`);
    wrap.innerHTML = stats + founder + political + quote + work + contact;
    root.appendChild(wrap);
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

  function init() { removeRequestedContent(); addLogoDots(); addSections(); }
  const observer = new MutationObserver(() => { if (document.querySelector('main, #root')?.children.length) { init(); observer.disconnect(); } });
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(init, 1000);
})();
