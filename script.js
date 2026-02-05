document.addEventListener('DOMContentLoaded', async () => {
    let writings = [];
    try {
        const response = await fetch('writings.json');
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

        // Format common tags to be lowercase for style
        const displayTag = (item.tags[0] || item.mood).toLowerCase();

        article.innerHTML = `
            <header class="card-header">
                <h3 class="card-title ${langClass}">#${item.id}</h3>
                <div class="card-meta">${item.type}</div>
            </header>
            <div class="card-body ${langClass}" lang="${langClass === 'hi' ? 'hi' : 'en'}">${previewText.replace(/\n/g, '<br>')}</div>
            <footer class="card-footer">
                <span class="tag">${displayTag}</span>
                <span>${item.language}</span>
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

    const heroQuoteEl = document.getElementById('heroQuote');
    const heroAttrEl = document.getElementById('heroAttribution');

    if (heroQuoteEl) {
        const quotes = writings.filter(w =>
            (w.type.includes('Quote') || w.type.includes('Sher') || w.type.includes('Intro')) &&
            w.content.length < 200
        );

        const specificHero = writings.find(w => w.id === 'html_hero_quote');
        const heroItem = specificHero || (quotes.length > 0 ? quotes[Math.floor(Math.random() * quotes.length)] : writings[0]);

        if (heroItem) {
            heroQuoteEl.innerHTML = heroItem.content.replace(/\n/g, '<br>');
            heroQuoteEl.setAttribute('lang', heroItem.language.toLowerCase() === 'hindi' ? 'hi' : 'en');
            if (heroAttrEl) heroAttrEl.textContent = `— ${heroItem.type}`;
        }
    }

    const gridItems = writings.filter(w => w.id !== featuredItem.id);

    if (poemsGrid) {
        gridItems.forEach(item => {
            poemsGrid.appendChild(createPoemCard(item));
        });
    }

    class AdvancedFilterSystem {
        constructor(data) {
            this.data = data;
            this.state = {
                mood: new Set(),
                theme: new Set(),
                type: new Set(),
                tags: new Set(),
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
                tags: new Set()
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
            });

            return {
                mood: Array.from(meta.mood).sort(),
                theme: Array.from(meta.theme).sort(),
                type: Array.from(meta.type).sort(),
                tags: Array.from(meta.tags).sort()
            };
        }

        initUI() {
            const filterBody = document.getElementById('filterBody');
            if (!filterBody) return;

            this.createFilterSection(filterBody, 'Mood', this.metadata.mood, 'mood');
            this.createFilterSection(filterBody, 'Theme', this.metadata.theme, 'theme');
            this.createFilterSection(filterBody, 'Type', this.metadata.type, 'type');
            this.createFilterSection(filterBody, 'Tags', this.metadata.tags, 'tags');

            document.getElementById('toggleFilters')?.addEventListener('click', () => {
                const body = document.getElementById('filterBody');
                body.classList.toggle('hidden');
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

    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            header.style.padding = '1rem 0';
        } else {
            header.style.padding = '1.5rem 0';
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
            menuToggle.textContent = nav.classList.contains('mobile-open') ? '✕' : '☰';
        });
    }

});
