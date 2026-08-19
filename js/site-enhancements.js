(() => {
  'use strict';
  const ASSET = (path) => `/assets/${path.split('/').map((part) => encodeURIComponent(part)).join('/')}`;
  const CONTENT = {
    founderName: 'Tejas Sharda Vitthal Nandrekar',
    founderBio: 'Master in Arts, Masters in Social Work (Urban Rural & Community Development)',
    founderStory: 'Driven by a passion for societal progress, our founder, Tejas Sharda Vitthal Nandrekar, envisioned Takht India as a catalyst for informed governance. Witnessing the disconnect between policy intentions and on-the-ground realities fueled a commitment to provide data-backed strategies that truly serve the nation’s next generation. This vision is the bedrock of our work.',
    founderQuote: 'Takht India was founded to bridge the gap between politics and data-driven decision-making. To provide accurate ground-level research, voter insights and strategic analysis to political leaders. To build smarter, more informed and result-oriented political campaigns.',
    founderImage: '/images/founder-new.jpeg',
    politicalImage: '/images/karad-campaign.jpeg',
    politicalCaption: 'Political Image Development',
    quote: 'A politician thinks only about the next election, but a true leader thinks about the next generation and envisions the development of society and the nation. — Tejas Nandrekar',
    contactPhone: '+91 9657114882 / +91 6026068482', contactEmail: 'takhtindiaofficial@gmail.com', contactAddress: 'Contact person: Tejas Nandrekar',
    instagramUrl: 'https://www.instagram.com/takhtindia', facebookUrl: 'https://www.facebook.com/takhtindia',
    certificates: [
      { image: '/images/certificate-merit.jpeg', title: 'Certificate of Merit', issuer: 'Special Mention — Sansad Bharat MUN 2026, Shivaji University, Kolhapur. Awarded to Tejas Nandrekar, representing Ravi Rana, Independent.' },
      { image: '/images/certificate-participation.jpeg', title: 'Certificate of Participation', issuer: 'Sansad Bharat MUN 2026, Shivaji University, Kolhapur — Tejas Vitthal Nandrekar, Sangli.' }
    ],
    gallery: [1, 2, 3, 4, 5, 6].map((index) => ({ image: `/images/gallery-${index}.jpeg`, title: 'Work Gallery' })),
    campaigns: [
      ['/images/kadegaon-campaign.jpeg', 'Kadegaon Campaign'], ['/images/kadegaon-campaign-2.jpeg', 'Kadegaon Campaign'],
      ['/images/karad-campaign.jpeg', 'Karad Campaign'], ['/images/karad-campaign-2.jpeg', 'Karad Campaign'],
      ['/images/sangli-campaign.jpeg', 'Sangli Municipal Campaign'], ['/images/sangli-campaign-2.jpeg', 'Sangli Municipal Campaign'], ['/images/sangli-campaign-3.jpeg', 'Sangli Municipal Campaign']
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
    const campaignSection = section('campaign-backgrounds', 'CAMPAIGN FIELDWORK', 'Campaigns on the ground', `<div class="ti-campaign-grid">${CONTENT.campaigns.map(([file, label]) => `<article class="ti-clickable-image" data-lightbox="${esc(file)}" tabindex="0" role="button" aria-label="Open ${esc(label)} image" style="background-image:url('${file}')"><div><span>${esc(label)}</span><small>Strategy, outreach, and field intelligence</small></div></article>`).join('')}</div>`);
    const political = section('perspective', 'SERVICES', 'Political Image Development', `<div class="ti-perspective"><p>We help political leaders build a strong, authentic and people-oriented public image.</p><ul class="ti-feature-points"><li><strong>Public Image & Positioning</strong><span>Build a strong, credible and people-oriented political identity.</span></li><li><strong>Public Connect & Visibility</strong><span>Increase grassroots engagement, public presence and positive media/social-media visibility.</span></li><li><strong>Leadership & Communication</strong><span>Establish a clear vision, consistent messaging and a reputation for effective leadership.</span></li></ul></div>`);
    const certs = CONTENT.certificates.length ? CONTENT.certificates.map((item) => `<article class="ti-card ti-clickable-image" data-lightbox="${esc(item.image)}" tabindex="0" role="button" aria-label="Open ${esc(item.title)}">${image(item.image, item.title || 'Certificate', 'Certificate image')}<h3>${esc(item.title)}</h3><p>${esc(item.issuer)}</p></article>`).join('') : `<article class="ti-card">${placeholder('Achievement certificate 1')}</article><article class="ti-card">${placeholder('Achievement certificate 2')}</article>`;
    const gallery = CONTENT.gallery.length ? CONTENT.gallery.map((item, index) => `<button class="ti-gallery-item" type="button" data-lightbox="${esc(item.image)}" data-gallery-index="${index}" aria-label="Open Work Gallery image ${index + 1}">${image(item.image, 'Work Gallery image', 'Gallery image')}</button>`).join('') : Array.from({ length: 9 }, (_, index) => `<button class="ti-gallery-item" type="button" data-gallery-index="${index}" aria-label="Open gallery image ${index + 1}">${placeholder(`Gallery image ${index + 1}`)}</button>`).join('');
    const certificates = section('certificates', 'ACHIEVEMENTS', 'Great achievements', `<div class="ti-grid">${certs}</div>`);
    const gallerySection = section('gallery', 'FIELD NOTES', 'Campaign gallery', `<button class="ti-gallery-launch" type="button">Open gallery</button><div class="ti-gallery">${gallery}</div>`);
    const contact = section('contact-details', 'CONTACT', 'Start a conversation', `<div class="ti-contact"><div><p>${esc(CONTENT.contactPhone) || 'Phone information will be added here.'}</p><p>${esc(CONTENT.contactEmail) || 'Email information will be added here.'}</p><p>${esc(CONTENT.contactAddress) || 'Office information will be added here.'}</p></div><div class="ti-social"><a href="${esc(CONTENT.instagramUrl) || '#'}" aria-label="Instagram" target="_blank" rel="noreferrer"><span class="ti-social-icon ti-instagram">◎</span><span>Instagram</span></a><a href="${esc(CONTENT.facebookUrl) || '#'}" aria-label="Facebook" target="_blank" rel="noreferrer"><span class="ti-social-icon ti-facebook">f</span><span>Facebook</span></a></div></div>`);
    wrap.innerHTML = stats + campaignSection + political + certificates + gallerySection + contact; root.appendChild(wrap); updateExistingSections(root);
    wrap.addEventListener('click', (event) => {
      const target = event.target.closest('[data-lightbox], .ti-gallery-launch, .ti-gallery-item'); if (!target) return;
      const modal = document.createElement('div'); modal.className = 'ti-lightbox';
      const content = target.dataset.lightbox ? `<img src="${esc(target.dataset.lightbox)}" alt="Gallery image">` : `<div class="ti-lightbox-grid">${CONTENT.gallery.length ? CONTENT.gallery.map((item) => image(item.image, item.title || 'Gallery image', 'Gallery image')).join('') : Array.from({ length: 9 }, (_, index) => placeholder(`Gallery image ${index + 1}`)).join('')}</div>`;
      modal.innerHTML = `<button type="button" aria-label="Close gallery">Close</button>${content}`; document.body.appendChild(modal);
      modal.addEventListener('click', (click) => { if (click.target === modal || click.target.closest('button')) modal.remove(); });
    });
  }
  function updateExistingSections(root) {
    root.querySelectorAll('#contact, #principle, [data-testid="contact-section"]').forEach((node) => node.remove());
    const about = root.querySelector('#about');
    if (about && !about.querySelector('.ti-about-founder')) {
      const founderBlock = document.createElement('div'); founderBlock.className = 'ti-about-founder';
      founderBlock.innerHTML = `<div><p class="ti-eyebrow">THE FOUNDER</p><h3>${esc(CONTENT.founderName)}</h3><p class="ti-qualifications">${esc(CONTENT.founderBio)}</p><p>${esc(CONTENT.founderStory)}</p><blockquote class="ti-founder-quote">${esc(CONTENT.founderQuote)}</blockquote></div>${image(CONTENT.founderImage, CONTENT.founderName, 'Founder image')}`;
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
    const hero = root.querySelector('#hero') || root.querySelector('header + section');
    if (hero) {
      hero.querySelectorAll('img').forEach((img) => { img.src = '/images/hero-generated.jpg'; img.alt = "Takht India political strategy"; });
      hero.querySelectorAll('h1').forEach((heading) => { heading.textContent = "Empowering India's Future: Data-Driven Political Strategy"; });
      hero.querySelectorAll('p').forEach((paragraph) => { if (/ground|political|strategy|insight/i.test(paragraph.textContent || '')) paragraph.textContent = 'Bridging the gap between ground-level insights and impactful political action.'; });
      hero.querySelectorAll('a, button').forEach((control) => { if (/learn more/i.test(control.textContent || '')) control.textContent = 'Discover Our Approach'; });
    }
    const services = root.querySelector('#services');
    if (services) {
      const serviceCardsExisting = [...services.querySelectorAll('article, [class*="grid"] > *')];
      const second = serviceCardsExisting[1];
      if (second && !second.querySelector('.ti-service-image')) {
        second.insertAdjacentHTML('beforeend', `<img class="ti-service-image" src="${CONTENT.politicalImage}" alt="Political Image Development campaign work" loading="lazy">`);
      }
      const serviceCopy = [
        ['Strategic Political Research', 'We provide in-depth, data-driven research to understand voter demographics, sentiment, and emerging trends. Our insights empower campaigns with a clear roadmap to success.'],
        ['Data-Driven Campaign Consulting', 'Leveraging advanced analytics and voter intelligence, we craft bespoke campaign strategies designed for maximum impact and voter engagement.'],
        ['Evidence-Based Policy Analysis', 'We translate complex data into actionable policy recommendations, fostering informed decision-making for sustainable societal development.']
      ];
      serviceCardsExisting.slice(0, 3).forEach((card, index) => { const heading = card.querySelector('h3, h4'); const paragraph = card.querySelector('p'); if (heading) heading.textContent = serviceCopy[index][0]; if (paragraph) paragraph.textContent = serviceCopy[index][1]; });
      const order = ['Strategic Political Research', 'Data-Driven Campaign Consulting', 'Evidence-Based Policy Analysis'];
      const cards = [...services.querySelectorAll('article, [class*="grid"] > *')];
      cards.sort((a, b) => { const ai = order.findIndex((name) => (a.textContent || '').toLowerCase().includes(name.toLowerCase())); const bi = order.findIndex((name) => (b.textContent || '').toLowerCase().includes(name.toLowerCase())); return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi); }).forEach((card) => card.parentElement?.appendChild(card));
    }
    const desired = ['hero', 'about', 'campaign-backgrounds', 'services', 'approach', 'portfolio', 'impact', 'perspective', 'certificates', 'gallery', 'contact-details'];
    desired.map((id) => root.querySelector(`#${id}`)).filter(Boolean).forEach((node) => root.appendChild(node));
  }
  function init() { const root = document.querySelector('main') || document.querySelector('#root'); if (!root || !root.children.length) return false; removeRequestedContent(); addLogoDots(); addSections(); return Boolean(document.querySelector('#ti-enhancements')); }
  let attempts = 0; const observer = new MutationObserver(() => { if (init() || attempts > 30) observer.disconnect(); }); observer.observe(document.body, { childList: true, subtree: true });
  const retry = window.setInterval(() => { attempts += 1; if (init() || attempts > 30) window.clearInterval(retry); }, 300);
})();
