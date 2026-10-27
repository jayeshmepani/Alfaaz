document.addEventListener("DOMContentLoaded", async () => {
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
            this.density = 0.3; // Density Multiplier (e.g., 0.3 = subtle, 1.0 = normal, 2.0 = heavy burst)
        }

        emit(x, y) {
            if (this.density <= 0) return;
            const count = Math.round((Math.floor(Math.random() * 3) + 2) * this.density);
            for (let i = 0; i < count; i++) {
                if (this.particles.length >= this.maxParticles) {
                    const old = this.particles.shift();
                    if (old && old.el && old.el.parentNode) old.el.parentNode.removeChild(old.el);
                }

                const p = {
                    x: x + (Math.random() - 0.5) * 18,
                    y: y + (Math.random() - 0.5) * 18,
                    vx: (Math.random() - 0.5) * 2.8,
                    vy: (Math.random() - 0.5) * 2.8,
                    size: Math.random() * 4.5 + 2,
                    life: 0,
                    maxLife: Math.random() * 25 + 20,
                    color: this.getParticleColor()
                };

                const el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                el.setAttribute("r", p.size.toFixed(1));
                el.setAttribute("fill", p.color);
                this.container.appendChild(el);
                p.el = el;

                this.particles.push(p);
            }
        }

        getParticleColor() {
            const colors = ["#ffe57f", "#c4a87c", "#ffffff", "#ffd000", "#fff3b0"];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            for (let i = this.particles.length - 1; i >= 0; i--) {
                const p = this.particles[i];
                p.life++;
                p.x += p.vx;
                p.y += p.vy;

                const progress = p.life / p.maxLife;
                const alpha = Math.max(0, 1 - progress);
                const scale = Math.max(0, 1 - progress * 0.5);

                p.el.setAttribute("cx", p.x.toFixed(1));
                p.el.setAttribute("cy", p.y.toFixed(1));
                p.el.setAttribute("opacity", alpha.toFixed(2));
                p.el.setAttribute("transform", `scale(${scale.toFixed(2)})`);

                if (p.life >= p.maxLife) {
                    if (p.el.parentNode) p.el.parentNode.removeChild(p.el);
                    this.particles.splice(i, 1);
                }
            }
        }
    }

    const splashScreen = document.getElementById("splashScreen");
    const splashMaskPath = document.getElementById("splashMaskPath");
    const splashSparklesGroup = document.getElementById("splashSparklesGroup");

    let splashFxEngine = null;
    let isSplashPlaying = false;
    let splashHasStarted = false;
    let splashAnimFrameId = null;
    let splashDismissed = false;

    // Splash audio — browsers block autoplay without a user gesture.
    // Audio must start inside the same tap/click handler as the animation.
    const splashAudioUrl = new URL(
        "assets/audio/splash.wav",
        document.baseURI || window.location.href
    ).href;
    const splashAudio = new Audio();
    splashAudio.preload = "none";
    splashAudio.volume = 1;
    // iOS/Safari: keep element in DOM + playsinline so gesture unlock is reliable.
    // src stays unset until the first tap so the wav is not fetched on load.
    splashAudio.setAttribute("playsinline", "");
    splashAudio.setAttribute("webkit-playsinline", "");
    splashAudio.playsInline = true;
    splashAudio.style.display = "none";
    document.body.appendChild(splashAudio);
    const splashReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function setBackgroundInert(locked) {
        document
            .querySelectorAll("header, main, footer, #readingModal, #toast, .reading-progress")
            .forEach((el) => {
                el.inert = locked;
            });
    }

    if (splashSparklesGroup) {
        splashFxEngine = new SplashParticleFXEngine(splashSparklesGroup);
    }

    function prepareSplashMask() {
        if (!splashMaskPath) return;
        const totalLen = parseFloat(
            splashMaskPath.dataset.len || splashMaskPath.getTotalLength() || 3361
        );
        splashMaskPath.style.strokeDasharray = totalLen;
        splashMaskPath.style.strokeDashoffset = totalLen;
        splashMaskPath.dataset.len = String(totalLen);
    }

    function ensureSplashHint() {
        if (!splashScreen || splashScreen.querySelector(".splash-tap-hint")) return;
        const hint = document.createElement("div");
        hint.className = "splash-tap-hint";
        hint.setAttribute("aria-hidden", "true");
        hint.innerHTML = '<span class="splash-tap-hint-text">Tap to enter</span>';
        splashScreen.appendChild(hint);
    }

    function setSplashHintVisible(visible) {
        const hint = splashScreen && splashScreen.querySelector(".splash-tap-hint");
        if (!hint) return;
        hint.classList.toggle("is-hidden", !visible);
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
        setBackgroundInert(false);
        splashScreen.classList.add("splash-fade-out");
        splashScreen.inert = true;
        splashScreen.removeAttribute("tabindex");
        splashScreen.setAttribute("aria-hidden", "true");
    }

    function playSplashAudioFromGesture() {
        // Must run synchronously inside the user-gesture call stack (no setTimeout).
        try {
            splashAudio.currentTime = 0;
        } catch {
            // currentTime can throw before the media is ready.
        }

        if (!splashAudio.src) splashAudio.src = splashAudioUrl;
        const playPromise = splashAudio.play();
        if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch((err) => {
                console.warn("Splash audio could not play:", err);
            });
        }
    }

    function playSplashRevealAnimation() {
        if (!splashMaskPath || !splashScreen || splashHasStarted || splashDismissed) return;

        splashHasStarted = true;
        isSplashPlaying = true;
        setSplashHintVisible(false);

        const totalLen = parseFloat(
            splashMaskPath.dataset.len || splashMaskPath.getTotalLength() || 3361
        );
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
            const eased =
                progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            const curDist = eased * totalLen;

            splashMaskPath.style.strokeDashoffset = totalLen - curDist;

            // Emit sparkle FX at active position
            try {
                const pt = splashMaskPath.getPointAtLength(curDist);
                if (splashFxEngine && pt) {
                    splashFxEngine.emit(pt.x, pt.y);
                }
            } catch {
                // getPointAtLength throws if the path is not rendered yet.
            }

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

        if (splashReduceMotion) {
            if (event) event.preventDefault();
            dismissSplashScreen();
            return;
        }

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
        splashScreen.addEventListener("click", handleSplashActivate);

        // Keyboard: Enter / Space to start or skip
        splashScreen.setAttribute("tabindex", "0");
        splashScreen.setAttribute("role", "dialog");
        splashScreen.setAttribute(
            "aria-label",
            "Welcome animation. Press Enter to begin, or again to skip."
        );
        splashScreen.setAttribute("aria-modal", "true");
        setBackgroundInert(true);
        splashScreen.focus();
        splashScreen.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleSplashActivate(event);
            }
        });
    }

    let writings = [];
    try {
        const response = await fetch("assets/data/writings.json");
        if (!response.ok) throw new Error("Failed to load writings");
        writings = await response.json();
    } catch (error) {
        console.error("Error loading writings:", error);
        return;
    }

    const featuredContainer = document.getElementById("featuredPoem");

    function languageView(language) {
        const key = (language || "").toLowerCase();
        if (key === "hindi") return { className: "hi", htmlLang: "hi", dataLang: "devanagari" };
        if (key === "gujarati") return { className: "gu", htmlLang: "gu", dataLang: "gujarati" };
        return { className: "en", htmlLang: "en", dataLang: "english" };
    }

    const FAVORITES_KEY = "alfaaz-favorites";
    const favorites = loadFavorites();
    let filterSystem = null;
    let currentFeaturedId = null;
    let readingId = null;
    let toastTimer = 0;

    function loadFavorites() {
        try {
            const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
            return new Set(Array.isArray(stored) ? stored.map(Number) : []);
        } catch {
            return new Set();
        }
    }

    function persistFavorites() {
        try {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
        } catch {
            // Private browsing can refuse storage.
        }
    }

    function showToast(message) {
        const toast = document.getElementById("toast");
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("show");
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => {
            toast.classList.remove("show");
        }, 2400);
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;");
    }

    function opusLabel(id) {
        return `№ ${String(id).padStart(3, "0")}`;
    }

    function verseMarkup(content) {
        return content
            .trim()
            .split(/\n{2,}/)
            .filter((stanza) => stanza.trim())
            .map(
                (stanza) =>
                    `<div class="stanza">${escapeHtml(stanza).replaceAll("\n", "<br>")}</div>`
            )
            .join("");
    }

    async function copyVerse(text) {
        try {
            await navigator.clipboard.writeText(text);
            showToast("Verse copied");
        } catch {
            showToast("Could not copy the verse");
        }
    }

    function paintFavorite(id) {
        const saved = favorites.has(id);
        document.querySelectorAll(`[data-save-id="${id}"]`).forEach((button) => {
            button.classList.toggle("is-saved", saved);
            button.setAttribute("aria-pressed", String(saved));
            const label = button.querySelector(".save-label");
            if (label) label.textContent = saved ? "Saved" : "Save to Favorites";
        });
    }

    function toggleFavorite(id) {
        if (favorites.has(id)) {
            favorites.delete(id);
            showToast("Removed from favorites");
        } else {
            favorites.add(id);
            showToast("Saved to favorites");
        }
        persistFavorites();
        paintFavorite(id);
        if (filterSystem && filterSystem.state.savedOnly) filterSystem.applyFilters();
    }

    function createPoemCard(item) {
        const lang = languageView(item.language);
        const saved = favorites.has(item.id);
        const article = document.createElement("article");
        article.className = "poem-card fade-in";
        article.dataset.id = String(item.id);
        article.dataset.lang = lang.dataLang;
        article.dataset.type = item.type.toLowerCase().split(" ")[0];
        article.tabIndex = 0;
        article.setAttribute("aria-labelledby", `title-${item.id}`);

        const tags = Array.isArray(item.tags) ? item.tags.slice(0, 4) : [];
        const tagButtons = tags
            .map(
                (tag) =>
                    `<button type="button" class="tag" data-action="tag" data-value="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`
            )
            .join("");
        const devices = Array.isArray(item.literary_devices)
            ? item.literary_devices.slice(0, 5)
            : [];
        const deviceButtons = devices
            .map(
                (device) =>
                    `<button type="button" class="device-tag" data-action="device" data-value="${escapeHtml(device)}">${escapeHtml(device)}</button>`
            )
            .join("");

        article.innerHTML = `
            <span class="corner corner-nw" aria-hidden="true"></span>
            <span class="corner corner-ne" aria-hidden="true"></span>
            <span class="corner corner-sw" aria-hidden="true"></span>
            <span class="corner corner-se" aria-hidden="true"></span>
            <span class="opus-mark" aria-hidden="true">${opusLabel(item.id)}</span>
            <header class="card-header art-head">
                <h3 class="card-title ${lang.className}" id="title-${item.id}">#${item.id}</h3>
                <div class="card-meta">
                    <span class="meta-type">${escapeHtml(item.type)}</span>
                    ${item.structure ? `<span class="meta-separator">•</span><span class="meta-structure">${escapeHtml(item.structure)}</span>` : ""}
                </div>
            </header>
            <div class="card-body ${lang.className}" lang="${lang.htmlLang}">${verseMarkup(item.content)}</div>
            <footer class="card-footer">
                <div class="footer-primary">
                    ${tagButtons}
                    <span class="lang">${escapeHtml(item.language)}</span>
                </div>
                ${deviceButtons ? `<div class="footer-secondary">${deviceButtons}</div>` : ""}
            </footer>
            <div class="card-actions">
                <button type="button" class="card-action" data-action="copy">Copy Verse</button>
                <button type="button" class="card-action${saved ? " is-saved" : ""}" data-action="save" data-save-id="${item.id}" aria-pressed="${saved}">
                    <span class="heart-mark" aria-hidden="true">♥</span>
                    <span class="save-label">${saved ? "Saved" : "Save to Favorites"}</span>
                </button>
            </div>
        `;

        article.addEventListener("pointermove", (event) => {
            if (event.pointerType === "touch") return;
            const rect = article.getBoundingClientRect();
            article.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
            article.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
            article.classList.add("is-lit");
        });
        article.addEventListener("pointerleave", () => {
            article.classList.remove("is-lit");
        });
        return article;
    }

    const potentialFeatured = writings.filter(
        (item) =>
            (item.type.includes("Ghazal") ||
                item.type.includes("Nazm") ||
                item.type.includes("Poem")) &&
            item.content.length > 100
    );

    function renderFeatured(item) {
        if (!featuredContainer || !item) return;
        currentFeaturedId = item.id;
        const lang = languageView(item.language);
        const imagery =
            item.imagery && item.imagery !== "None"
                ? `<p class="poem-imagery"><span>Imagery</span>${escapeHtml(item.imagery)}</p>`
                : "";
        featuredContainer.innerHTML = `
            <h3 class="poem-title ${lang.className}">#${item.id}</h3>
            <p class="poem-author">— ${escapeHtml(item.type)}</p>
            <div class="poem-text ${lang.className}" lang="${lang.htmlLang}">
                ${verseMarkup(item.content)}
            </div>
            ${imagery}
        `;
        featuredContainer.classList.add("visible");
    }

    class AdvancedFilterSystem {
        constructor(data) {
            this.data = data;
            this.visible = data.slice();
            this.state = {
                mood: new Set(),
                theme: new Set(),
                type: new Set(),
                tags: new Set(),
                structure: new Set(),
                devices: new Set(),
                lang: "all",
                query: "",
                sort: "default",
                order: null,
                savedOnly: false,
                view: "grid"
            };
            this.metadata = this.extractMetadata(data);

            this.observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                entry.target.classList.add("visible");
                            }, 50);
                            this.observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
            );

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

            data.forEach((item) => {
                if (item.mood) {
                    item.mood.split(",").forEach((m) => meta.mood.add(m.trim()));
                }
                if (item.theme) {
                    item.theme.split(",").forEach((t) => meta.theme.add(t.trim()));
                }
                if (item.type) {
                    meta.type.add(item.type.split(" ")[0]);
                }
                if (item.tags && Array.isArray(item.tags)) {
                    item.tags.forEach((t) => meta.tags.add(t));
                }
                if (item.structure) {
                    meta.structure.add(item.structure);
                }
                if (item.literary_devices && Array.isArray(item.literary_devices)) {
                    item.literary_devices.forEach((d) => meta.devices.add(d));
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
            const filterBody = document.getElementById("filterBody");
            if (!filterBody) return;

            this.createFilterSection(filterBody, "Mood", this.metadata.mood, "mood");
            this.createFilterSection(filterBody, "Structure", this.metadata.structure, "structure");
            this.createFilterSection(filterBody, "Theme", this.metadata.theme, "theme");
            this.createFilterSection(filterBody, "Type", this.metadata.type, "type");
            this.createFilterSection(
                filterBody,
                "Literary Devices",
                this.metadata.devices,
                "devices"
            );
            this.createFilterSection(filterBody, "Tags", this.metadata.tags, "tags");

            document.getElementById("toggleFilters")?.addEventListener("click", (e) => {
                const body = document.getElementById("filterBody");
                const btn = e.currentTarget;
                const isHidden = body.classList.contains("hidden");

                if (isHidden) {
                    body.classList.remove("hidden");
                    body.setAttribute("aria-hidden", "false");
                    btn.setAttribute("aria-expanded", "true");
                } else {
                    body.classList.add("hidden");
                    body.setAttribute("aria-hidden", "true");
                    btn.setAttribute("aria-expanded", "false");
                }
            });

            document.getElementById("resetFilters")?.addEventListener("click", () => {
                this.resetFilters();
            });

            document.querySelectorAll(".lang-btn").forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    document.querySelectorAll(".lang-btn").forEach((b) => {
                        b.classList.remove("active");
                        b.setAttribute("aria-pressed", "false");
                    });
                    e.currentTarget.classList.add("active");
                    e.currentTarget.setAttribute("aria-pressed", "true");
                    const langByButton = {
                        devanagari: "hindi",
                        gujarati: "gujarati",
                        english: "english"
                    };
                    this.state.lang = langByButton[e.currentTarget.dataset.lang] || "all";
                    this.applyFilters();
                });
            });

            const search = document.getElementById("collectionSearch");
            search?.addEventListener("input", () => {
                this.state.query = search.value.trim();
                this.applyFilters();
            });

            const sort = document.getElementById("collectionSort");
            sort?.addEventListener("change", () => {
                this.state.sort = sort.value;
                this.state.order = null;
                this.applyFilters();
            });

            document.getElementById("shuffleCollection")?.addEventListener("click", () => {
                this.shuffle();
            });

            const savedButton = document.getElementById("savedOnly");
            savedButton?.addEventListener("click", () => {
                this.state.savedOnly = !this.state.savedOnly;
                savedButton.setAttribute("aria-pressed", String(this.state.savedOnly));
                savedButton.classList.toggle("active", this.state.savedOnly);
                this.applyFilters();
            });

            const viewButtons = document.querySelectorAll(".view-toggle button");
            viewButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    this.state.view = button.dataset.view;
                    viewButtons.forEach((candidate) => {
                        const selected = candidate === button;
                        candidate.classList.toggle("active", selected);
                        candidate.setAttribute("aria-pressed", String(selected));
                    });
                    document
                        .getElementById("poemsGrid")
                        ?.classList.toggle("view-single", this.state.view === "single");
                });
            });

            document.getElementById("activeFilters")?.addEventListener("click", (event) => {
                const pill = event.target.closest("[data-remove]");
                if (!pill) return;
                this.removeFilter(pill.dataset.remove, pill.dataset.value || "");
            });
        }

        createFilterSection(container, title, items, categoryKey) {
            const section = document.createElement("fieldset");
            section.className = "filter-section";

            const header = document.createElement("legend");
            header.textContent = title;
            section.appendChild(header);

            const optionsContainer = document.createElement("div");
            optionsContainer.className = "filter-options";

            items.forEach((item) => {
                if (!item) return;
                const label = document.createElement("label");
                label.className = "checkbox-label";

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = item;
                checkbox.dataset.category = categoryKey;
                checkbox.addEventListener("change", (e) => {
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
                lang: "all",
                query: "",
                sort: "default",
                order: null,
                savedOnly: false,
                view: this.state.view
            };

            document
                .querySelectorAll('#filterBody input[type="checkbox"]')
                .forEach((cb) => (cb.checked = false));
            document.querySelectorAll(".lang-btn").forEach((b) => {
                const selected = b.dataset.lang === "all";
                b.classList.toggle("active", selected);
                b.setAttribute("aria-pressed", String(selected));
            });
            const search = document.getElementById("collectionSearch");
            if (search) search.value = "";
            const sort = document.getElementById("collectionSort");
            if (sort) sort.value = "default";
            const savedButton = document.getElementById("savedOnly");
            if (savedButton) {
                savedButton.setAttribute("aria-pressed", "false");
                savedButton.classList.remove("active");
            }

            this.applyFilters();
        }

        toggleFacet(kind, value) {
            const bucket = this.state[kind];
            if (!bucket || !value) return;
            if (bucket.has(value)) bucket.delete(value);
            else bucket.add(value);
            document
                .querySelectorAll(`#filterBody input[data-category="${kind}"]`)
                .forEach((checkbox) => {
                    if (checkbox.value === value) checkbox.checked = bucket.has(value);
                });
            this.applyFilters();
        }

        removeFilter(kind, value) {
            if (kind === "query") {
                this.state.query = "";
                const search = document.getElementById("collectionSearch");
                if (search) search.value = "";
            } else if (kind === "saved") {
                this.state.savedOnly = false;
                const savedButton = document.getElementById("savedOnly");
                if (savedButton) {
                    savedButton.setAttribute("aria-pressed", "false");
                    savedButton.classList.remove("active");
                }
            } else if (kind === "lang") {
                this.state.lang = "all";
                document.querySelectorAll(".lang-btn").forEach((button) => {
                    const selected = button.dataset.lang === "all";
                    button.classList.toggle("active", selected);
                    button.setAttribute("aria-pressed", String(selected));
                });
            } else if (this.state[kind]) {
                this.state[kind].delete(value);
                document
                    .querySelectorAll(`#filterBody input[data-category="${kind}"]`)
                    .forEach((checkbox) => {
                        if (checkbox.value === value) checkbox.checked = false;
                    });
            }
            this.applyFilters();
        }

        shuffle() {
            const ids = this.data.map((item) => item.id);
            for (let index = ids.length - 1; index > 0; index -= 1) {
                const swap = Math.floor(Math.random() * (index + 1));
                const current = ids[index];
                ids[index] = ids[swap];
                ids[swap] = current;
            }
            this.state.order = ids;
            this.state.sort = "default";
            const sort = document.getElementById("collectionSort");
            if (sort) sort.value = "default";
            this.applyFilters();
        }

        matchesQuery(item, query) {
            const tags = Array.isArray(item.tags) ? item.tags.join(" ") : "";
            const haystack = [
                item.content,
                `#${item.id}`,
                item.id,
                item.mood,
                item.theme,
                item.imagery,
                tags
            ]
                .join("\n")
                .toLowerCase();
            return haystack.includes(query);
        }

        applyFilters() {
            const query = this.state.query.toLowerCase();
            const filtered = this.data.filter((item) => {
                if (this.state.lang !== "all" && item.language.toLowerCase() !== this.state.lang) {
                    return false;
                }

                if (this.state.savedOnly && !favorites.has(item.id)) return false;
                if (query && !this.matchesQuery(item, query)) return false;

                if (this.state.mood.size > 0) {
                    const itemMoods = item.mood ? item.mood.split(",").map((m) => m.trim()) : [];
                    const hasMatch = itemMoods.some((m) => this.state.mood.has(m));
                    if (!hasMatch) return false;
                }

                if (this.state.theme.size > 0) {
                    const itemThemes = item.theme ? item.theme.split(",").map((t) => t.trim()) : [];
                    const hasMatch = itemThemes.some((t) => this.state.theme.has(t));
                    if (!hasMatch) return false;
                }

                if (this.state.type.size > 0) {
                    const typeKey = item.type.split(" ")[0];
                    if (!this.state.type.has(typeKey)) return false;
                }

                if (this.state.tags.size > 0) {
                    const itemTags = item.tags || [];
                    const hasMatch = itemTags.some((t) => this.state.tags.has(t));
                    if (!hasMatch) return false;
                }

                if (this.state.structure.size > 0) {
                    if (!this.state.structure.has(item.structure)) return false;
                }

                if (this.state.devices.size > 0) {
                    const itemDevices = item.literary_devices || [];
                    const hasMatch = itemDevices.some((d) => this.state.devices.has(d));
                    if (!hasMatch) return false;
                }

                return true;
            });

            let ordered = filtered;
            if (this.state.sort === "shortest" || this.state.sort === "longest") {
                const direction = this.state.sort === "shortest" ? 1 : -1;
                ordered = filtered
                    .slice()
                    .sort((a, b) => (a.content.length - b.content.length) * direction);
            } else if (this.state.order) {
                const rank = new Map(this.state.order.map((id, index) => [id, index]));
                ordered = filtered
                    .slice()
                    .sort((a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0));
            }

            this.visible = ordered;
            this.renderPills();
            this.renderResults(ordered);
        }

        renderPills() {
            const host = document.getElementById("activeFilters");
            if (!host) return;
            const pills = [];
            const push = (kind, value, label) => {
                pills.push(
                    `<button type="button" data-remove="${kind}" data-value="${escapeHtml(value)}">${escapeHtml(label)} ×</button>`
                );
            };
            if (this.state.query) push("query", "", `Search: ${this.state.query}`);
            if (this.state.savedOnly) push("saved", "", "Saved Bookmarks");
            if (this.state.lang !== "all") push("lang", "", this.state.lang);
            ["mood", "theme", "type", "tags", "structure", "devices"].forEach((kind) => {
                this.state[kind].forEach((value) => push(kind, value, value));
            });
            host.hidden = pills.length === 0;
            host.innerHTML = pills.join("");
        }

        renderResults(results) {
            const poemsGrid = document.getElementById("poemsGrid");
            const count = document.getElementById("resultCount");
            if (count) count.textContent = `Showing ${results.length} of ${this.data.length} works`;
            if (!poemsGrid) return;

            poemsGrid.classList.toggle("view-single", this.state.view === "single");
            poemsGrid.innerHTML = "";

            if (results.length === 0) {
                poemsGrid.innerHTML =
                    '<div class="no-results">No writings found matching your criteria.</div>';
                return;
            }

            results.forEach((item) => poemsGrid.appendChild(createPoemCard(item)));

            poemsGrid.querySelectorAll(".poem-card.fade-in").forEach((el) => {
                if (!el.classList.contains("visible")) this.observer.observe(el);
            });
        }
    }

    filterSystem = new AdvancedFilterSystem(writings);
    filterSystem.applyFilters();

    const openingFeatured =
        potentialFeatured.length > 0
            ? potentialFeatured[Math.floor(Math.random() * potentialFeatured.length)]
            : writings[0];
    renderFeatured(openingFeatured);

    document.getElementById("unveilGem")?.addEventListener("click", () => {
        const pool = potentialFeatured.filter((item) => item.id !== currentFeaturedId);
        if (pool.length === 0) {
            showToast("No other gem to unveil");
            return;
        }
        renderFeatured(pool[Math.floor(Math.random() * pool.length)]);
    });

    const poemsGrid = document.getElementById("poemsGrid");
    poemsGrid?.addEventListener("click", (event) => {
        const card = event.target.closest(".poem-card");
        if (!card) return;
        const item = writings.find((entry) => entry.id === Number(card.dataset.id));
        if (!item) return;
        const action = event.target.closest("[data-action]");
        if (action) {
            if (action.dataset.action === "copy") copyVerse(item.content);
            else if (action.dataset.action === "save") toggleFavorite(item.id);
            else if (action.dataset.action === "tag")
                filterSystem.toggleFacet("tags", action.dataset.value);
            else if (action.dataset.action === "device")
                filterSystem.toggleFacet("devices", action.dataset.value);
            return;
        }
        openReading(item.id);
    });
    poemsGrid?.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        if (event.target.closest("button")) return;
        const card = event.target.closest(".poem-card");
        if (!card || event.target !== card) return;
        event.preventDefault();
        openReading(Number(card.dataset.id));
    });

    function readingIndex() {
        return filterSystem.visible.findIndex((item) => item.id === readingId);
    }

    function openReading(id) {
        const item = writings.find((entry) => entry.id === id);
        const modal = document.getElementById("readingModal");
        if (!item || !modal) return;
        readingId = id;
        const lang = languageView(item.language);
        document.getElementById("modalKicker").textContent = `${item.type} · ${item.language}`;
        document.getElementById("modalTitle").textContent = `#${item.id}`;
        const verse = document.getElementById("modalVerse");
        verse.lang = lang.htmlLang;
        verse.className = `reading-verse ${lang.className}`;
        verse.innerHTML = verseMarkup(item.content);
        const rows = [
            ["Theme", item.theme],
            ["Mood", item.mood],
            ["Imagery", item.imagery && item.imagery !== "None" ? item.imagery : ""],
            ["Structure", item.structure],
            [
                "Devices",
                Array.isArray(item.literary_devices) ? item.literary_devices.join(", ") : ""
            ]
        ].filter((row) => row[1]);
        document.getElementById("modalMeta").innerHTML = rows
            .map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd>`)
            .join("");
        const save = document.getElementById("modalSave");
        save.dataset.saveId = String(item.id);
        paintFavorite(item.id);
        const index = readingIndex();
        document.getElementById("modalPrev").disabled = index <= 0;
        document.getElementById("modalNext").disabled =
            index < 0 || index >= filterSystem.visible.length - 1;
        if (!modal.open) modal.showModal();
    }

    function stepReading(direction) {
        const next = filterSystem.visible[readingIndex() + direction];
        if (next) openReading(next.id);
    }

    document.getElementById("readingClose")?.addEventListener("click", () => {
        document.getElementById("readingModal")?.close();
    });
    document.getElementById("modalCopy")?.addEventListener("click", () => {
        const item = writings.find((entry) => entry.id === readingId);
        if (item) copyVerse(item.content);
    });
    document.getElementById("modalSave")?.addEventListener("click", () => {
        if (readingId !== null) toggleFavorite(readingId);
    });
    document.getElementById("modalPrev")?.addEventListener("click", () => stepReading(-1));
    document.getElementById("modalNext")?.addEventListener("click", () => stepReading(1));
    document.addEventListener("keydown", (event) => {
        const modal = document.getElementById("readingModal");
        if (!modal?.open) return;
        if (event.key === "ArrowRight") {
            event.preventDefault();
            stepReading(1);
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            stepReading(-1);
        }
    });

    function wireHero() {
        const quote = document.getElementById("heroQuote");
        const attribution = document.getElementById("heroAttribution");
        const button = document.getElementById("shuffleVerse");
        if (!quote || !attribution || !button) return;
        const opening = {
            html: quote.innerHTML,
            lang: "hi",
            attribution: attribution.textContent
        };
        const fromWorks = writings.slice(0, 18).map((item) => {
            const stanza = item.content.trim().split(/\n{2,}/)[0];
            const lines = stanza.split("\n").filter(Boolean).slice(0, 4);
            return {
                html: escapeHtml(lines.join("\n")).replaceAll("\n", "<br>"),
                lang: languageView(item.language).htmlLang,
                attribution: `~  ${opusLabel(item.id)}`
            };
        });
        const verses = [opening, ...fromWorks];
        let index = 0;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        button.addEventListener("click", () => {
            let next = Math.floor(Math.random() * verses.length);
            if (verses.length > 1 && next === index) next = (next + 1) % verses.length;
            const apply = () => {
                index = next;
                quote.innerHTML = verses[index].html;
                quote.lang = verses[index].lang;
                attribution.textContent = verses[index].attribution;
                quote.classList.remove("is-fading");
            };
            if (reduced) {
                apply();
                return;
            }
            quote.classList.add("is-fading");
            window.setTimeout(apply, 280);
        });
    }

    function wireDust() {
        const canvas = document.getElementById("dustCanvas");
        const hero = document.querySelector(".hero");
        if (!canvas || !hero) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const context = canvas.getContext("2d");
        if (!context) return;
        const motes = Array.from({ length: 42 }, () => ({
            x: Math.random(),
            y: Math.random(),
            r: Math.random() * 1.4 + 0.4,
            s: Math.random() * 0.15 + 0.04,
            a: Math.random() * 0.35 + 0.15
        }));
        let frame = 0;
        let running = true;
        const draw = () => {
            if (!running) return;
            const width = hero.clientWidth;
            const height = hero.clientHeight;
            if (canvas.width !== width) canvas.width = width;
            if (canvas.height !== height) canvas.height = height;
            context.clearRect(0, 0, width, height);
            motes.forEach((mote) => {
                mote.y -= mote.s / Math.max(height, 1);
                if (mote.y < 0) mote.y = 1;
                context.beginPath();
                context.fillStyle = `rgba(232, 196, 140, ${mote.a})`;
                context.arc(mote.x * width, mote.y * height, mote.r, 0, Math.PI * 2);
                context.fill();
            });
            frame = window.requestAnimationFrame(draw);
        };
        frame = window.requestAnimationFrame(draw);
        document.addEventListener("visibilitychange", () => {
            running = !document.hidden;
            if (running) frame = window.requestAnimationFrame(draw);
            else window.cancelAnimationFrame(frame);
        });
    }

    function wireProgress() {
        const bar = document.getElementById("readingProgress");
        const host = bar ? bar.parentElement : null;
        if (!bar || !host) return;
        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
            bar.style.transform = `scaleX(${ratio})`;
            host.setAttribute("aria-valuenow", String(Math.round(ratio * 100)));
        };
        update();
        document.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
    }

    wireHero();
    wireDust();
    wireProgress();

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const id = this.getAttribute("href");
            if (!id || id === "#") return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
            if (id === "#main-content") target.focus({ preventScroll: true });
            const navLink = this.closest(".nav-links")
                ? this
                : document.querySelector(`.nav-links a[href="${id}"]`);
            if (!navLink) return;
            document.querySelectorAll(".nav-links a").forEach((link) => {
                link.classList.remove("active");
                link.removeAttribute("aria-current");
            });
            navLink.classList.add("active");
            navLink.setAttribute("aria-current", "true");
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
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");

    // Create backdrop element
    let backdrop = document.querySelector(".mobile-menu-backdrop");
    if (!backdrop) {
        backdrop = document.createElement("div");
        backdrop.className = "mobile-menu-backdrop";
        document.body.appendChild(backdrop);
    }

    // Create mobile nav header with close button
    let mobileNavHeader = nav.querySelector(".mobile-nav-header");
    if (!mobileNavHeader && nav) {
        mobileNavHeader = document.createElement("div");
        mobileNavHeader.className = "mobile-nav-header";
        mobileNavHeader.innerHTML = `
            <span class="mobile-nav-brand">Alfaaz.</span>
            <button class="mobile-nav-close" aria-label="Close menu"><span>‹</span></button>
        `;
        nav.insertBefore(mobileNavHeader, nav.firstChild);
    }

    const mobileNavClose = nav.querySelector(".mobile-nav-close");

    function setMenuInert(locked) {
        document.querySelectorAll("main, footer, .brand").forEach((el) => {
            el.inert = locked;
        });
    }

    function openMobileMenu() {
        nav.classList.add("mobile-open");
        menuToggle.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close menu");
        backdrop.classList.add("active");
        document.body.style.overflow = "hidden";
        setMenuInert(true);
        mobileNavClose?.focus();
    }

    function closeMobileMenu(restoreFocus = true) {
        const wasOpen = nav.classList.contains("mobile-open");
        nav.classList.remove("mobile-open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
        backdrop.classList.remove("active");
        document.body.style.overflow = "";
        setMenuInert(false);
        if (wasOpen && restoreFocus) menuToggle.focus();
    }

    if (menuToggle && nav) {
        // Hamburger opens menu
        menuToggle.addEventListener("click", () => {
            if (!nav.classList.contains("mobile-open")) {
                openMobileMenu();
            }
        });

        // Close button inside nav
        if (mobileNavClose) {
            mobileNavClose.addEventListener("click", closeMobileMenu);
        }

        // Close menu when clicking backdrop
        backdrop.addEventListener("click", closeMobileMenu);

        // Close menu when clicking nav links
        nav.querySelectorAll(".nav-links a").forEach((link) => {
            link.addEventListener("click", () => closeMobileMenu(false));
        });

        // Close menu on escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && nav.classList.contains("mobile-open")) {
                closeMobileMenu();
            }
        });
    }
});
