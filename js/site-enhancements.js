(() => {
  'use strict';
  const ASSET = (path) => `/assets/${path}`;
  const CONTENT = {
    founderName: 'Tejas Nandrekar',
    founderBio: 'Founder, Takht India — political research and campaign consultancy focused on strategy, public image, and voter perception.',
    founderImage: ASSET('founder.png'),
    politicalImage: ASSET('campaigns/campaign photo/Karad Campaign.jpeg'),
    politicalCaption: 'Political Image Development',
    quote: 'A politician thinks only about the next election, but a true leader thinks about the next generation and envisions the development of society and the nation. — Tejas Nandrekar',
    contactPhone: '+91 00000 00000', contactEmail: 'contact@takhtindia.in', contactAddress: 'Sangli, Maharashtra, India',
    instagramUrl: 'https://www.instagram.com/takhtindia', facebookUrl: 'https://www.facebook.com/takhtindia',
    certificates: [
      { image: ASSET('certificate-merit.jpeg'), title: 'Certificate of Merit', issuer: 'Special Mention — Sansad Bharat MUN 2026, Shivaji University, Kolhapur. Awarded to Tejas Nandrekar, representing Ravi Rana, Independent.' },
      { image: ASSET('certificate-participation.jpeg'), title: 'Certificate of Participation', issuer: 'Sansad Bharat MUN 2026, Shivaji University, Kolhapur — Tejas Vitthal Nandrekar, Sangli.' }
    ],
    gallery: [
      'Image.jpeg','Image (2).jpeg','Image (3).jpeg','Image (4).jpeg','Image (5).jpeg','Image (6).jpeg','Image (7).jpeg','Image (8).jpeg','Image (9).jpeg'
    ].map((file, index) => ({ image: ASSET(`work-gallery/Work Gallary/${file}`), title: `Takht India field work ${index + 1}` })),
    campaigns: [
      ['Kadegaon campaign.jpeg', 'Kadegaon Campaign'], ['kadegaon campaign2.jpeg', 'Kadegaon Campaign'],
      ['Karad Campaign.jpeg', 'Karad Campaign'], ['Karad campaign (2).jpeg', 'Karad Campaign'],
      ['Sangli Municipal Campaign.jpeg', 'Sangli Municipal Campaign'], ['Sangli Municipal Campaign2.jpeg', 'Sangli Municipal Campaign'], ['Sangli Municipal Campaign3.jpeg', 'Sangli Municipal Campaign']
    ]
  };
  const esc = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const placeholder = (label) => `<div class="ti-empty" role="img" aria-label="${esc(label)} placeholder"><span>${esc(label)}</span><small>Replace this placeholder later</small></div>`;
  const image = (src, alt, label) => src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">` : placeholder(label);
  const section = (id, eyebrow, title, content) => `<section id="${id}" class="ti-section"><div class="ti-shell"><p class="ti-eyebrow">${eyebrow}</p><h2>${title}</h2>${content}</div></section>`;

  function addLogoDots() {
    document.querySelectorAll('.ti-logo-dots').forEach((dots) => dots.remove());
    const logo = document.querySelector('[data-testid="nav-logo"]') || [...document.querySelectorAll('header a, nav a, header button, nav button')].find((link) => /takht\s*india/i.test(link.textContent || ''));
    if (!logo) return;
    const dots = document.createElement('span');
    dots.className = 'ti-logo-dots'; dots.setAttribute('aria-label', 'Indian tricolor');
    dots.innerHTML = '<i class="saffron"></i><i class="white"></i><i class="green"></i>'; logo.appendChild(dots);
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
    const campaignSection = section('campaign-backgrounds', 'CAMPAIGN FIELDWORK', 'Campaigns on the ground', `<div class="ti-campaign-grid">${CONTENT.campaigns.map(([file, label]) => `<article style="background-image:url('${ASSET(`campaigns/campaign photo/${file}`)}')"><div><span>${esc(label)}</span><small>Strategy, outreach, and field intelligence</small></div></article>`).join('')}</div>`);
    const political = section('perspective', 'SERVICES', 'Political Image Development', `<div class="ti-perspective"><p>We help political leaders build a strong, authentic public image through strategic branding, media presence, and voter perception management.</p></div>`);
    const quote = section('principle', 'OUR PRINCIPLE', 'Clarity before noise', `<blockquote>A politician thinks only about the next election, but a true leader thinks about the next generation and envisions the development of society and the nation.<cite>Tejas Nandrekar</cite></blockquote>`);
    const certs = CONTENT.certificates.length ? CONTENT.certificates.map((item) => `<article class="ti-card">${image(item.image, item.title || 'Certificate', 'Certificate image')}<h3>${esc(item.title)}</h3><p>${esc(item.issuer)}</p></article>`).join('') : `<article class="ti-card">${placeholder('Achievement certificate 1')}</article><article class="ti-card">${placeholder('Achievement certificate 2')}</article>`;
    const gallery = CONTENT.gallery.length ? CONTENT.gallery.map((item, index) => `<button class="ti-gallery-item" type="button" data-lightbox="${esc(item.image)}" data-gallery-index="${index}" aria-label="Open ${esc(item.title || 'gallery image')}">${image(item.image, item.title || 'Gallery image', 'Gallery image')}<span>${esc(item.title)}</span></button>`).join('') : Array.from({ length: 9 }, (_, index) => `<button class="ti-gallery-item" type="button" data-gallery-index="${index}" aria-label="Open gallery image ${index + 1}">${placeholder(`Gallery image ${index + 1}`)}</button>`).join('');
    const certificates = section('certificates', 'ACHIEVEMENTS', 'Great achievements', `<div class="ti-grid">${certs}</div>`);
    const gallerySection = section('gallery', 'FIELD NOTES', 'Campaign gallery', `<button class="ti-gallery-launch" type="button">Open gallery</button><div class="ti-gallery">${gallery}</div>`);
    const contact = section('contact-details', 'CONTACT', 'Start a conversation', `<div class="ti-contact"><div><p>${esc(CONTENT.contactPhone) || 'Phone information will be added here.'}</p><p>${esc(CONTENT.contactEmail) || 'Email information will be added here.'}</p><p>${esc(CONTENT.contactAddress) || 'Office information will be added here.'}</p></div><div class="ti-social"><a href="${esc(CONTENT.instagramUrl) || '#'}" aria-label="Instagram">Instagram</a><a href="${esc(CONTENT.facebookUrl) || '#'}" aria-label="Facebook">Facebook</a></div></div>`);
    wrap.innerHTML = stats + founder + campaignSection + political + quote + certificates + gallerySection + contact; root.appendChild(wrap); updateExistingSections(root);
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
    root.querySelectorAll('*').forEach((node) => {
      if (node.children.length === 0 && /288\+/.test(node.textContent || '')) node.textContent = '12+';
      if (node.children.length === 0 && /94\.8%/.test(node.textContent || '')) node.textContent = '82.4%';
    });
    const heroPills = root.querySelector('.mt-6.flex.flex-wrap.gap-2') || [...root.querySelectorAll('div')].find((node) => /Social MediaWar Room ManagementCampaignElection SurveyStrategyDocumentary/i.test(node.textContent || '') && node.children.length === 6);
    if (heroPills) {
      const labels = ['Strategy', 'War Room Management', 'Campaign', 'Social Media', 'Election Survey', 'Documentary'];
      heroPills.innerHTML = labels.map((label) => `<span class="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300">${label}</span>`).join('');
    }
    const services = root.querySelector('#services');
    if (services) {
      const serviceCardsExisting = [...services.querySelectorAll('article, [class*="grid"] > *')];
      const second = serviceCardsExisting[1];
      if (second && !second.querySelector('.ti-service-image')) {
        second.insertAdjacentHTML('beforeend', `<img class="ti-service-image" src="${CONTENT.politicalImage}" alt="Political Image Development campaign work" loading="lazy">`);
      }
      const order = ['Strategy', 'War Room', 'Campaign', 'Social Media', 'Election Survey', 'Documentary'];
      const cards = [...services.querySelectorAll('article, [class*="grid"] > *')];
      cards.sort((a, b) => { const ai = order.findIndex((name) => (a.textContent || '').toLowerCase().includes(name.toLowerCase())); const bi = order.findIndex((name) => (b.textContent || '').toLowerCase().includes(name.toLowerCase())); return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi); }).forEach((card) => card.parentElement?.appendChild(card));
    }
    const desired = ['hero', 'about', 'campaign-backgrounds', 'services', 'approach', 'portfolio', 'impact', 'perspective', 'principle', 'certificates', 'gallery', 'contact-details'];
    desired.map((id) => root.querySelector(`#${id}`)).filter(Boolean).forEach((node) => root.appendChild(node));
  }
  function init() { const root = document.querySelector('main') || document.querySelector('#root'); if (!root || !root.children.length) return false; removeRequestedContent(); addLogoDots(); addSections(); return Boolean(document.querySelector('#ti-enhancements')); }
  let attempts = 0; const observer = new MutationObserver(() => { if (init() || attempts > 30) observer.disconnect(); }); observer.observe(document.body, { childList: true, subtree: true });
  const retry = window.setInterval(() => { attempts += 1; if (init() || attempts > 30) window.clearInterval(retry); }, 300);
})();
