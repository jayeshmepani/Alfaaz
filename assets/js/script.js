document.addEventListener('DOMContentLoaded', async () => {
    /* ====================================================
       SPLASH SCREEN HANDWRITING REVEAL ENGINE
       Must init before any await so first tap can unlock audio.
       Browsers block autoplay until a user gesture.
       ==================================================== */
    class SplashParticleFXEngine {
        constructor(container) {
            this.container = container;
            this.particles = [];
            this.maxParticles = 140; // Maximum allowed particles on screen at once
            this.density = 0.3;      // Density Multiplier (e.g., 0.3 = subtle, 1.0 = normal, 2.0 = heavy burst)
        }

        emit(x, y) {
            if (this.density <= 0) return;
            const count = Math.round((Math.floor(Math.random() * 3) + 2) * this.density);
            for (let i = 0; i < count; i++) {

                if (this.particles.length >= this.maxParticles) {
                    const old = this.particles.shift();
                    if (old && old.el && old.el.parentNode) old.el.parentNode.removeChild(old.el);
                }

                let p = {
                    x: x + (Math.random() - 0.5) * 18,
                    y: y + (Math.random() - 0.5) * 18,
                    vx: (Math.random() - 0.5) * 2.8,
                    vy: (Math.random() - 0.5) * 2.8,
                    size: Math.random() * 4.5 + 2,
                    life: 0,
                    maxLife: Math.random() * 25 + 20,
                    color: this.getParticleColor()
                };

                const el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                el.setAttribute('r', p.size.toFixed(1));
                el.setAttribute('fill', p.color);
                this.container.appendChild(el);
                p.el = el;

                this.particles.push(p);
            }
        }

        getParticleColor() {
            const colors = ['#ffe57f', '#c4a87c', '#ffffff', '#ffd000', '#fff3b0'];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            for (let i = this.particles.length - 1; i >= 0; i--) {
                let p = this.particles[i];
                p.life++;
                p.x += p.vx;
                p.y += p.vy;

                const progress = p.life / p.maxLife;
                const alpha = Math.max(0, 1 - progress);
                const scale = Math.max(0, 1 - progress * 0.5);

                p.el.setAttribute('cx', p.x.toFixed(1));
                p.el.setAttribute('cy', p.y.toFixed(1));
                p.el.setAttribute('opacity', alpha.toFixed(2));
                p.el.setAttribute('transform', `scale(${scale.toFixed(2)})`);

                if (p.life >= p.maxLife) {
                    if (p.el.parentNode) p.el.parentNode.removeChild(p.el);
                    this.particles.splice(i, 1);
                }
            }
        }
    }

    const splashScreen = document.getElementById('splashScreen');
    const splashMaskPath = document.getElementById('splashMaskPath');
    const splashSparklesGroup = document.getElementById('splashSparklesGroup');

    let splashFxEngine = null;
    let isSplashPlaying = false;
    let splashHasStarted = false;
    let splashAnimFrameId = null;
    let splashDismissed = false;

    // Splash audio — browsers block autoplay without a user gesture.
    // Audio must start inside the same tap/click handler as the animation.
    const splashAudioUrl = new URL('assets/audio/splash.wav', document.baseURI || window.location.href).href;
    const splashAudio = new Audio();
    splashAudio.preload = 'auto';
    splashAudio.volume = 1;
    // iOS/Safari: keep element in DOM + playsinline so gesture unlock is reliable
    splashAudio.setAttribute('playsinline', '');
    splashAudio.setAttribute('webkit-playsinline', '');
    splashAudio.playsInline = true;
    splashAudio.style.display = 'none';
    splashAudio.src = splashAudioUrl;
    document.body.appendChild(splashAudio);
    try { splashAudio.load(); } catch (_) {}

    if (splashSparklesGroup) {
        splashFxEngine = new SplashParticleFXEngine(splashSparklesGroup);
    }

    function prepareSplashMask() {
        if (!splashMaskPath) return;
        const totalLen = parseFloat(splashMaskPath.dataset.len || splashMaskPath.getTotalLength() || 3361);
        splashMaskPath.style.strokeDasharray = totalLen;
        splashMaskPath.style.strokeDashoffset = totalLen;
        splashMaskPath.dataset.len = String(totalLen);
    }

    function ensureSplashHint() {
        if (!splashScreen || splashScreen.querySelector('.splash-tap-hint')) return;
        const hint = document.createElement('div');
        hint.className = 'splash-tap-hint';
        hint.setAttribute('aria-hidden', 'true');
        hint.innerHTML = '<span class="splash-tap-hint-text">Tap to enter</span>';
        splashScreen.appendChild(hint);
    }

    function setSplashHintVisible(visible) {
        const hint = splashScreen && splashScreen.querySelector('.splash-tap-hint');
        if (!hint) return;
        hint.classList.toggle('is-hidden', !visible);
    }

    function fadeOutAndStopSplashAudio() {
        if (splashAudio.paused) {
            splashAudio.currentTime = 0;
            return;
        }

        const startVol = splashAudio.volume;
        const fadeMs = 350;
        const startedAt = performance.now();

        function step(now) {
            const t = Math.min(1, (now - startedAt) / fadeMs);
            splashAudio.volume = startVol * (1 - t);
            if (t < 1) {
                requestAnimationFrame(step);
            } else {
                splashAudio.pause();
                splashAudio.currentTime = 0;
                splashAudio.volume = startVol;
            }
        }

        requestAnimationFrame(step);
    }

    function dismissSplashScreen() {
        if (!splashScreen || splashDismissed) return;
        splashDismissed = true;
        isSplashPlaying = false;
        if (splashAnimFrameId) cancelAnimationFrame(splashAnimFrameId);

        fadeOutAndStopSplashAudio();
        setSplashHintVisible(false);
        splashScreen.classList.add('splash-fade-out');
    }

    function playSplashAudioFromGesture() {
        // Must run synchronously inside the user-gesture call stack (no setTimeout).
        try {
            splashAudio.currentTime = 0;
        } catch (_) {}

        const playPromise = splashAudio.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch((err) => {
                console.warn('Splash audio could not play:', err);
            });
        }
    }

    function playSplashRevealAnimation() {
        if (!splashMaskPath || !splashScreen || splashHasStarted || splashDismissed) return;

        splashHasStarted = true;
        isSplashPlaying = true;
        setSplashHintVisible(false);

        const totalLen = parseFloat(splashMaskPath.dataset.len || splashMaskPath.getTotalLength() || 3361);
        const totalDuration = 5500; // 5.5 seconds reveal duration

        // Start audio in the same gesture that started the splash (required by browsers).
        playSplashAudioFromGesture();

        splashMaskPath.style.strokeDasharray = totalLen;
        splashMaskPath.style.strokeDashoffset = totalLen;

        let startTime = null;

        function renderSplash(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(1, elapsed / totalDuration);

            // Smooth cubic-bezier easing for handwriting stroke reveal
            const eased = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            const curDist = eased * totalLen;

            splashMaskPath.style.strokeDashoffset = totalLen - curDist;

            // Emit sparkle FX at active position
            try {
                const pt = splashMaskPath.getPointAtLength(curDist);
                if (splashFxEngine && pt) {
                    splashFxEngine.emit(pt.x, pt.y);
                }
            } catch (err) {}

            if (splashFxEngine) splashFxEngine.update();

            if (progress < 1 && isSplashPlaying) {
                splashAnimFrameId = requestAnimationFrame(renderSplash);
            } else if (isSplashPlaying) {
                // Hold brief moment then auto-fade out to reveal the site
                setTimeout(dismissSplashScreen, 600);
            }
        }

        splashAnimFrameId = requestAnimationFrame(renderSplash);
    }

    function handleSplashActivate(event) {
        if (splashDismissed) return;

        // First interaction: start animation + audio together (unlocks autoplay).
        if (!splashHasStarted) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            playSplashRevealAnimation();
            return;
        }

        // Second interaction: skip splash
        dismissSplashScreen();
    }

    if (splashScreen) {
        prepareSplashMask();
        ensureSplashHint();
        setSplashHintVisible(true);

        // click works as a trusted user gesture on desktop + mobile.
        splashScreen.addEventListener('click', handleSplashActivate);

        // Keyboard: Enter / Space to start or skip
        splashScreen.setAttribute('tabindex', '0');
        splashScreen.setAttribute('role', 'dialog');
        splashScreen.setAttribute('aria-label', 'Welcome animation. Press Enter to begin, or again to skip.');
        splashScreen.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleSplashActivate(event);
            }
        });
    }

    let writings = [];
    try {
        const response = await fetch('assets/data/writings.json');
        if (!response.ok) throw new Error('Failed to load writings');
        writings = await response.json();
    } catch (error) {
        console.error('Error loading writings:', error);
        return;
    }

    const poemsGrid = document.getElementById('poemsGrid');
    const featuredContainer = document.getElementById('featuredPoem');

    function createPoemCard(item) {
        const langClass = item.language.toLowerCase() === 'hindi' ? 'hi' : 'en';
        const langAttr = item.language.toLowerCase() === 'hindi' ? 'devanagari' : 'english';

        // Show full content without truncation
        let previewText = item.content.trim();

        const article = document.createElement('article');
        article.className = 'poem-card fade-in';
        article.dataset.lang = langAttr;
        article.dataset.type = item.type.toLowerCase().split(' ')[0];
        article.setAttribute('aria-labelledby', `title-${item.id}`);

        // Format common tags to be lowercase for style
        const displayTag = (item.tags[0] || item.mood).toLowerCase();

        // Prepare literary devices HTML (limit to 3)
        let devicesHtml = '';
        if (item.literary_devices && Array.isArray(item.literary_devices) && item.literary_devices.length > 0) {
            devicesHtml = item.literary_devices.slice(0, 5).map(d => `<span class="device-tag">${d}</span>`).join('');
        }

        article.innerHTML = `
            <header class="card-header art-head">
                <h3 class="card-title ${langClass}" id="title-${item.id}">#${item.id}</h3>
                <div class="card-meta">
                    <span class="meta-type">${item.type}</span>
                    ${item.structure ? `<span class="meta-separator">•</span><span class="meta-structure">${item.structure}</span>` : ''}
                </div>
            </header>
            <div class="card-body ${langClass}" lang="${langClass === 'hi' ? 'hi' : 'en'}">${previewText.replace(/\n/g, '<br>')}</div>
            <footer class="card-footer">
                <div class="footer-primary">
                    <span class="tag">${displayTag}</span>
                    <span class="lang">${item.language}</span>
                </div>
                ${devicesHtml ? `<div class="footer-secondary">${devicesHtml}</div>` : ''}
            </footer>
        `;
        return article;
    }

    const potentialFeatured = writings.filter(w =>
        (w.type.includes('Ghazal') || w.type.includes('Nazm') || w.type.includes('Poem')) &&
        w.content.length > 100
    );
    const featuredItem = potentialFeatured.length > 0
        ? potentialFeatured[Math.floor(Math.random() * potentialFeatured.length)]
        : writings[0];

    if (featuredItem && featuredContainer) {
        const langClass = featuredItem.language.toLowerCase() === 'hindi' ? 'hi' : 'en';
        const paragraphs = featuredItem.content.split('\n\n');

        let htmlContent = '';
        paragraphs.forEach(p => {
            if (p.trim()) htmlContent += `<div class="stanza">${p.replace(/\n/g, '<br>')}</div>`;
        });

        featuredContainer.innerHTML = `
            <h3 class="poem-title ${langClass}">#${featuredItem.id}</h3>
            <p class="poem-author">— ${featuredItem.type}</p>
            <div class="poem-text ${langClass}" lang="${langClass === 'hi' ? 'hi' : 'en'}">
                ${htmlContent}
            </div>
        `;
    }



    const gridItems = writings.filter(w => w.id !== featuredItem.id);

    // Initial render is handled by AdvancedFilterSystem below to avoid double-rendering


    class AdvancedFilterSystem {
        constructor(data) {
            this.data = data;
            this.state = {
                mood: new Set(),
                theme: new Set(),
                type: new Set(),
                tags: new Set(),
                structure: new Set(),
                devices: new Set(),
                lang: 'all'
            };
            this.metadata = this.extractMetadata(data);

            this.observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, 50);
                        this.observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

            this.initUI();
        }

        extractMetadata(data) {
            const meta = {
                mood: new Set(),
                theme: new Set(),
                type: new Set(),
                tags: new Set(),
                structure: new Set(),
                devices: new Set()
            };

            data.forEach(item => {
                if (item.mood) {
                    item.mood.split(',').forEach(m => meta.mood.add(m.trim()));
                }
                if (item.theme) {
                    item.theme.split(',').forEach(t => meta.theme.add(t.trim()));
                }
                if (item.type) {
                    meta.type.add(item.type.split(' ')[0]);
                }
                if (item.tags && Array.isArray(item.tags)) {
                    item.tags.forEach(t => meta.tags.add(t));
                }
                if (item.structure) {
                    meta.structure.add(item.structure);
                }
                if (item.literary_devices && Array.isArray(item.literary_devices)) {
                    item.literary_devices.forEach(d => meta.devices.add(d));
                }
            });

            return {
                mood: Array.from(meta.mood).sort(),
                theme: Array.from(meta.theme).sort(),
                type: Array.from(meta.type).sort(),
                tags: Array.from(meta.tags).sort(),
                structure: Array.from(meta.structure).sort(),
                devices: Array.from(meta.devices).sort()
            };
        }

        initUI() {
            const filterBody = document.getElementById('filterBody');
            if (!filterBody) return;

            this.createFilterSection(filterBody, 'Mood', this.metadata.mood, 'mood');
            this.createFilterSection(filterBody, 'Structure', this.metadata.structure, 'structure');
            this.createFilterSection(filterBody, 'Theme', this.metadata.theme, 'theme');
            this.createFilterSection(filterBody, 'Type', this.metadata.type, 'type');
            this.createFilterSection(filterBody, 'Literary Devices', this.metadata.devices, 'devices');
            this.createFilterSection(filterBody, 'Tags', this.metadata.tags, 'tags');

            document.getElementById('toggleFilters')?.addEventListener('click', (e) => {
                const body = document.getElementById('filterBody');
                const btn = e.currentTarget;
                const isHidden = body.classList.contains('hidden');

                if (isHidden) {
                    body.classList.remove('hidden');
                    body.setAttribute('aria-hidden', 'false');
                    btn.setAttribute('aria-expanded', 'true');
                } else {
                    body.classList.add('hidden');
                    body.setAttribute('aria-hidden', 'true');
                    btn.setAttribute('aria-expanded', 'false');
                }
            });

            document.getElementById('resetFilters')?.addEventListener('click', () => {
                this.resetFilters();
            });

            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.state.lang = e.target.dataset.lang === 'devanagari' ? 'hindi' :
                        e.target.dataset.lang === 'english' ? 'english' : 'all';
                    this.applyFilters();
                });
            });
        }

        createFilterSection(container, title, items, categoryKey) {
            const section = document.createElement('div');
            section.className = 'filter-section';

            const header = document.createElement('h4');
            header.textContent = title;
            section.appendChild(header);

            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'filter-options';

            items.forEach(item => {
                if (!item) return;
                const label = document.createElement('label');
                label.className = 'checkbox-label';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = item;
                checkbox.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        this.state[categoryKey].add(item);
                    } else {
                        this.state[categoryKey].delete(item);
                    }
                    this.applyFilters();
                });

                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(item));
                optionsContainer.appendChild(label);
            });

            section.appendChild(optionsContainer);
            container.appendChild(section);
        }

        resetFilters() {
            this.state = {
                mood: new Set(),
                theme: new Set(),
                type: new Set(),
                tags: new Set(),
                structure: new Set(),
                devices: new Set(),
                lang: 'all'
            };

            document.querySelectorAll('#filterBody input[type="checkbox"]').forEach(cb => cb.checked = false);
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.lang-btn[data-lang="all"]').classList.add('active');

            this.applyFilters();
        }

        applyFilters() {
            const filtered = this.data.filter(item => {
                if (this.state.lang !== 'all' && item.language.toLowerCase() !== this.state.lang) {
                    return false;
                }

                if (this.state.mood.size > 0) {
                    const itemMoods = item.mood ? item.mood.split(',').map(m => m.trim()) : [];
                    const hasMatch = itemMoods.some(m => this.state.mood.has(m));
                    if (!hasMatch) return false;
                }

                if (this.state.theme.size > 0) {
                    const itemThemes = item.theme ? item.theme.split(',').map(t => t.trim()) : [];
                    const hasMatch = itemThemes.some(t => this.state.theme.has(t));
                    if (!hasMatch) return false;
                }

                if (this.state.type.size > 0) {
                    const typeKey = item.type.split(' ')[0];
                    if (!this.state.type.has(typeKey)) return false;
                }

                if (this.state.tags.size > 0) {
                    const itemTags = item.tags || [];
                    const hasMatch = itemTags.some(t => this.state.tags.has(t));
                    if (!hasMatch) return false;
                }

                if (this.state.structure.size > 0) {
                    if (!this.state.structure.has(item.structure)) return false;
                }

                if (this.state.devices.size > 0) {
                    const itemDevices = item.literary_devices || [];
                    const hasMatch = itemDevices.some(d => this.state.devices.has(d));
                    if (!hasMatch) return false;
                }

                return true;
            });

            this.renderResults(filtered);
        }

        renderResults(results) {
            const poemsGrid = document.getElementById('poemsGrid');

            if (!poemsGrid) return;

            poemsGrid.innerHTML = '';

            if (results.length === 0) {
                poemsGrid.innerHTML = '<div class="no-results">No writings found matching your criteria.</div>';
                return;
            }

            results.forEach(item => poemsGrid.appendChild(createPoemCard(item)));

            document.querySelectorAll('.fade-in').forEach(el => {
                if (!el.classList.contains('visible')) {
                    this.observer.observe(el);
                }
            });
        }
    }

    const filterSystem = new AdvancedFilterSystem(writings);

    filterSystem.applyFilters();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // const header = document.querySelector('header');
    // window.addEventListener('scroll', () => {
    //     if (window.pageYOffset > 100) {
    //         header.style.padding = '1rem 0';
    //     } else {
    //         header.style.padding = '1.5rem 0';
    //     }
    // });

    // Mobile menu toggle with backdrop
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    // Create backdrop element
    let backdrop = document.querySelector('.mobile-menu-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'mobile-menu-backdrop';
        document.body.appendChild(backdrop);
    }

    // Create mobile nav header with close button
    let mobileNavHeader = nav.querySelector('.mobile-nav-header');
    if (!mobileNavHeader && nav) {
        mobileNavHeader = document.createElement('div');
        mobileNavHeader.className = 'mobile-nav-header';
        mobileNavHeader.innerHTML = `
            <span class="mobile-nav-brand">Kalam</span>
            <button class="mobile-nav-close" aria-label="Close menu"><span>‹</span></button>
        `;
        nav.insertBefore(mobileNavHeader, nav.firstChild);
    }

    const mobileNavClose = nav.querySelector('.mobile-nav-close');

    function openMobileMenu() {
        nav.classList.add('mobile-open');
        menuToggle.classList.add('active');
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        nav.classList.remove('mobile-open');
        menuToggle.classList.remove('active');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle && nav) {
        // Hamburger opens menu
        menuToggle.addEventListener('click', () => {
            if (!nav.classList.contains('mobile-open')) {
                openMobileMenu();
            }
        });

        // Close button inside nav
        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', closeMobileMenu);
        }

        // Close menu when clicking backdrop
        backdrop.addEventListener('click', closeMobileMenu);

        // Close menu when clicking nav links
        nav.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('mobile-open')) {
                closeMobileMenu();
            }
        });
    }

});


