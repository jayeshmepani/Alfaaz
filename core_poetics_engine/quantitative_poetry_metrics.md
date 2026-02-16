# **Comprehensive Guide to Poetry Evaluation: Methods, Algorithms, Formulas & Frameworks**

> A single, exhaustive, searchable reference that collects **fictional** and **real** logics, algorithms, and formulas critics, poets, and computational researchers use to measure, constrain, or evaluate poetry. Includes classical frameworks, literary criticism theories, classroom heuristics, technical prosody, constraint-based systems, competition rubrics, formal poetry structure criteria, quantitative/stylometric analysis, and modern NLP metrics — plus short algorithms, example calculations, and pseudocode you can run on your own poems.

---

## **TABLE OF CONTENTS**

1. Executive Summary
2. The Pritchard Scale (Fictional Reference Point)
3. Historical & Classical Evaluation Systems
4. Formal/Structural Analysis Methods
5. Literary Criticism Frameworks
6. Classroom & Pedagogical Analysis Tools
7. Constraint-Based & Generative Logics (Oulipo et al.)
8. Mathematical & Computational Approaches
9. Modern AI/NLP Poetry Analysis
10. Theoretical/Critical Devices That Act as "Formulas"
11. Poetry Competition & Contest Judging Rubrics
12. Formal Poetry Structure Evaluation Criteria
13. Quantitative & Stylometric Analysis
14. Practical Algorithms & Quick Recipes (Runnable Pseudocode)
15. Use-Cases and Recommended Approaches
16. Hybrid & Emerging Approaches
17. Limitations & Ethical Notes
18. Summary Comparison Table
19. Key Takeaways
20. Further Reading & Resources
21. Appendix: Examples and Worked Numbers
22. References & Key Citations

---

## **1. EXECUTIVE SUMMARY**

Poetry evaluation spans centuries of criticism, from Aristotle's genre rules in _Poetics_ to 21st-century NLP. Research suggests that while no single universal "formula" objectively ranks a poem's greatness like the fictional Pritchard Scale, literary critics, poets, and modern tools have developed systematic methods—ranging from qualitative frameworks to mathematical constraints and computational metrics—that help assess technique, impact, emotional resonance, and structural innovation. These approaches acknowledge poetry's subjective beauty while providing structured logic for analysis.

Real-world approaches split into roughly four families:

1. **Formal / Prosodic** (meter, rhyme, scansion, measurable regularity)
2. **Critical / Analytical** (touchstone comparison, practical criticism, New Criticism, reader-response heuristics)
3. **Constraining / Generative** (Oulipo-style constraints, algorithmic composition)
4. **Computational / Statistical** (lexical statistics, diversity metrics, model-based scores, sentiment and embedding analyses)

This document lists methods, gives short formulas or algorithms where applicable, and points to resources for deeper reading and reproducible tests. These methods—mathematical, algorithmic, qualitative—collectively provide the "logics" sought. They never fully capture poetry's magic, yet they illuminate craft, pattern, and impact across eras.

---

## **2. THE PRITCHARD SCALE (FICTIONAL REFERENCE POINT)**

The **Pritchard Scale** is a fictional, formulaic method for evaluating poetry introduced in the 1989 film _Dead Poets Society_ from a textbook by the non-existent "Dr. J. Evans Pritchard, Ph.D." It plots a poem's "perfection" (artistry/technique) against its "importance" (subject matter) on a graph to calculate a poem's "greatness" based on the total area.

### **The Pritchard Formula:**

- **What it is:** A two-axis graph that rates _Perfection_ (how artfully an objective has been rendered) on the x-axis (horizontal) and _Importance_ (how important the objective is) on the y-axis (vertical).
- **Calculation:** The poem's ratings are plotted on a graph, and the total area of the resulting shape (rectangle/triangle) determines its greatness.
- **Mathematical Formulation:** Greatness = Perfection × Importance (the enclosed area on the graph).

### **The Scale Asks:**

1. How artfully has the objective of the poem been rendered? (Perfection axis)
2. How important is that objective? (Importance axis)

### **Harvard Recreation:**

Harvard mathematician Oliver Knill recreated the graph and formula online, confirming Greatness = Perfection × Importance.

### **Purpose in Context:**

In _Dead Poets Society_, this scale represents a rigid, anti-artistic, and overly academic approach to literature, which is famously rejected by the character John Keating. The character and his book _Understanding Poetry_ are fictional inventions designed to satirize cold, analytical approaches to art. John Keating famously rejects it as "excrement," tearing the page from students' books. No real-world scale directly replicates this, but it inspired discussions on quantifying art.

### **Why It Matters:**

The Pritchard Scale is a satire of reductive academic systems — it demonstrates how a formulaic approach can miss art's lived, contextual, and subjective values.

### **Limitations:**

- Forces quantitative answers for fundamentally qualitative judgments.
- Collapses multidimensional qualities (voice, historicity, innovation) into two axes.
- Sensitive to who scores "importance" and "perfection" (reader bias).

---

## **3. HISTORICAL & CLASSICAL EVALUATION SYSTEMS**

### **3.1 Aristotle's Poetics (4th Century BCE / ~335 BCE)**

Aristotle's _Poetics_ constitutes the earliest work that deals extensively with the relationship between art and learning. It is prescriptive and normative, setting forth rules and criteria for judging the quality and excellence of poetry.

**Key Evaluation Criteria:**

- **Genre Classification:** Poetry categorized into epic, comic, and tragic forms. Categorizes by genre and judges via specific rules per genre.
- **Unity of Action:** Established specific rules for what constituted the highest-quality work within each genre. Judges via unity of action and magnitude.
- **Mimesis:** Poetry as imitation of reality, with tragedy considered the most refined form of poetry.
- **Catharsis:** Emotional purification as a measure of tragic poetry's effectiveness. Catharsis serves as an evaluative measure.

**Aristotle's Taxonomy:** Highest quality satisfies specific rules per genre — unity of action, magnitude, and catharsis are the central criteria.

### **3.2 Horace's Ars Poetica (19 BCE)**

- **Decorum:** Appropriateness of style to subject matter.
- **Unity:** Consistency and coherence throughout the work.
- **Instruction + Delight:** Poetry should both teach and please.

### **3.3 Matthew Arnold's Touchstone Method (1880)**

In his essay _The Study of Poetry_, Arnold argued that critics should evaluate new works by comparing them to "touchstones"—specific, high-quality passages from undisputed masters like Homer, Dante, Shakespeare, or Milton.

**The Touchstone Formula:**

- Select exemplary passages from canonical masters (e.g., memorize short "touchstone" passages such as Milton: "And courage never to submit or yield").
- Compare new poetry against these established standards.
- Evaluate based on "high seriousness," moral weight, and truth.
- Determine whether the work reaches the level of the classics.
- If a passage evokes a reaction like the touchstone, it's strong.

**Arnold's Three Estimates:**

1. **Historic Estimate:** Value based on historical significance.
2. **Personal Estimate:** Value based on personal preference.
3. **Real Estimate:** True artistic value (the goal of touchstone method).

**Use:** Comparative quality check; resists historicism and relativism by appealing to exemplars.

### **3.4 I. A. Richards & _Practical Criticism_**

**Logic:** Close-reading blind tests: evaluate poems without author/context to force judgment on textual features alone (tone, imagery, ambiguities). This approach removes context for "pure" evaluation.

**Method:**

- Give readers unseen poems, ask for paraphrase, interpretation, and emotional response.
- Analyze agreement patterns and correspondence to textual cues.
- Evaluate based on the text's intrinsic qualities without biographical or historical context.

---

## **4. FORMAL/STRUCTURAL ANALYSIS METHODS**

### **4.1 Prosody & Meter (The Mathematical Logic / The Musical Math of Verse)**

Prosody is the study of the rhythmic and sound patterns of poetry and language. It encompasses elements such as meter, stress, intonation, tempo, and pause. Prosody is arguably the most mathematical measure of poetry.

**Scansion Formula:**

The "greatness" of a formal poem is often measured by its adherence to a specific meter. Scansion graphs rhythm: mark ictus (/) vs. nonictus (˘ or ×).

**Core Metrics:**

- **Scansion:** Count feet (iamb, trochee, anapest, dactyl, spondee). Report adherence percentage: (number of strongly regular lines / total lines) × 100.
- **Metrical Regularity Score (Heuristic):** Proportion of lines that match target foot pattern within ±1 substitution.

**Short Algorithm (Metrical Regularity):**

1. For each line, compute sequence of stresses (using an automatic stress tagger or dictionary fallback).
2. Compare to ideal foot pattern sliding-window.
3. Score line = 1 if matches within tolerance, 0 otherwise.
4. Sum / N = regularity.

**Metrical Patterns:**

| Foot Type | Pattern                        | Notation     | Example       |
| --------- | ------------------------------ | ------------ | ------------- |
| Iamb      | unstressed-stressed            | ˘ / (da-DUM) | "to-DAY"      |
| Trochee   | stressed-unstressed            | / ˘ (DUM-da) | "TA-ble"      |
| Anapest   | unstressed-unstressed-stressed | ˘ ˘ /        | "in the DARK" |
| Dactyl    | stressed-unstressed-unstressed | / ˘ ˘        | "EL-e-phant"  |
| Spondee   | stressed-stressed              | / /          | "HEART-break" |

**Meter:** Meter = foot type + line length (monometer through hexameter). For example, iambic pentameter = iamb + 5 feet per line.

**Quantitative Verse:**

A metrical system dependent on the duration of syllables rather than the number of stresses. Sanskrit meters are patterns of long (guru) and short (laghu) syllables.

### **4.1.1 Indic Prosody & Computational Metrical Analysis**

For Devanagari-script languages (Hindi, Sanskrit, Marathi, etc.), metrics are based on **Matra** (morae) count rather than syllable stress.

**Matra Counting Algorithm (Laghu vs. Guru):**

1.  **Laghu (Short, 1 Matra, |):** Short vowels (अ, इ, उ, ऋ) and consonants with short vowels (क, कि, कु).
2.  **Guru (Long, 2 Matras, S):**
    - Long vowels (आ, ई, ऊ, ए, ऐ, ओ, औ)
    - Consonants with Anusvara (ं) or Visarga (ः)
    - Short vowel _preceding_ a conjunct consonant (Samyuktakshar) becomes Guru (e.g., in "अग्र", 'अ' becomes 2 matras).
    - End-of-line short vowel (optionally Guru by convention).

**Computational Formula:**

$$
M(w) = \sum_{i=1}^{n} v(s_i) + C(c_i)
$$

Where _v_ is vowel weight (1 or 2) and _C_ is context adjustment (conjunct precedence).

**Pingala's 8 Gana System (Syllable Triplets):**

Pingala (c. 300 BC) classified all possible 3-syllable combinations into 8 Ganas, derived from the mnemonic **"यमाताराजभानसलगाः"** (Ya-Mā-Tā-Rā-Ja-Bhā-Na-Sa-La-Gāḥ):

| Gana        | Pattern (L/G) | Binary (L=1, G=0) | Mnemonic | Symbol |
| ----------- | :-----------: | :---------------: | -------- | :----: |
| **य (Ya)**  |     L-G-G     |       1-0-0       | य-मा-ता  | ˘ — —  |
| **म (Ma)**  |     G-G-G     |       0-0-0       | मा-ता-रा | — — —  |
| **त (Ta)**  |     G-G-L     |       0-0-1       | ता-रा-ज  | — — ˘  |
| **र (Ra)**  |     G-L-G     |       0-1-0       | रा-ज-भा  | — ˘ —  |
| **ज (Ja)**  |     L-G-L     |       1-0-1       | ज-भा-न   | ˘ — ˘  |
| **भ (Bha)** |     G-L-L     |       0-1-1       | भा-न-स   | — ˘ ˘  |
| **न (Na)**  |     L-L-L     |       1-1-1       | न-स-ल    | ˘ ˘ ˘  |
| **स (Sa)**  |     L-L-G     |       1-1-0       | स-ल-गा   | ˘ ˘ —  |

This system encodes all $2^3 = 8$ binary combinations and is the foundation for both Sanskrit Varna-Vritta (syllable-counted meters) and Urdu Aruz.

**Hindi Chhand Table (Common Meters with Matra Formulas):**

| छंद (Chhand)                 | Type                          | Structure                  | Matra/Varna Formula                | End Rule                                                                  |
| ---------------------------- | ----------------------------- | -------------------------- | ---------------------------------- | ------------------------------------------------------------------------- |
| **दोहा (Doha)**              | अर्धसम मात्रिक                | 4 charan, 2 lines          | 13 + 11 per line (odd=13, even=11) | Even charan ends with गुरु-लघु (S\|)                                      |
| **चौपाई (Chaupai)**          | सम मात्रिक                    | 4 charan                   | 16 matras per charan               | Last 2 syllables NOT गुरु-लघु; usually गुरु-गुरु (SS)                     |
| **सोरठा (Sortha)**           | अर्धसम मात्रिक (reverse Doha) | 4 charan                   | 11 + 13 per line (odd=11, even=13) | Rhyme on odd (shorter) charans                                            |
| **कुंडलिया (Kundaliya)**     | विषम मात्रिक                  | 6 charan (1 Doha + 1 Rola) | 24 matras per charan               | Starts and ends with same word; Doha's 4th charan = Rola's 1st            |
| **रोला (Rola)**              | सम मात्रिक                    | 4 charan                   | 24 matras per charan (11+13)       | Paired rhyme                                                              |
| **सवैया (Savaiya)**          | वर्णिक (syllable-counted)     | 4 charan                   | 22–26 varnas per charan            | Specific gana patterns (e.g., Mattagayand: 7 भगण + गुरु-गुरु = 23 varnas) |
| **कवित्त/घनाक्षरी (Kavitt)** | वर्णिक                        | 4 charan                   | 31–33 varnas per charan            | Yati (caesura) at 16-15 or 8-8-8-7                                        |
| **हरिगीतिका (Harigitika)**   | मात्रिक                       | 4 charan                   | 28 matras per charan (16+12)       | Yati after 16, ends with लघु-गुरु (\|S)                                   |
| **बरवै (Barvai)**            | अर्धसम मात्रिक                | 4 charan                   | 12 + 7 per line                    | Even charan ends with जगण (\|S\|)                                         |

**Verification Formula:**

$$
\text{IsValidChhand}(C) = \left(\sum_{i=1}^{n} M(\text{charan}_i) == \text{Target}_C\right) \land \text{EndRule}(C)
$$

### **4.1.2 Urdu Aruz (Prosody System)**

Urdu poetry uses the **Aruz** system (from Arabic ʿArūḍ), where meters (**Beher/Bahr**) are constructed from fundamental rhythmic units (**Rukn/Arkaan**).

**Syllable Weight System:**

| Weight           | Symbol | Description                    | Example   |
| ---------------- | :----: | ------------------------------ | --------- |
| Short (مختصر)    |   ˘    | Short vowel (zabar, zer, pesh) | کَ, بِ    |
| Long (بلند)      |   —    | Long vowel or short + sukoon   | کا, بیت   |
| Overlong (کشیدہ) |   —˘   | Long vowel + consonant         | دوست, عشق |

**Common Bahrs (Meters):**

| Beher          | Arkaan (Feet)                 | Pattern            | Example Poet |
| -------------- | ----------------------------- | ------------------ | ------------ |
| **Mutaqaarib** | فعولن فعولن فعولن فعل         | ˘—— ˘—— ˘—— ˘—     | Ghalib       |
| **Hazaj**      | مفاعیلن مفاعیلن               | ˘—— — ˘—— —        | Faiz         |
| **Ramal**      | فاعلاتن فاعلاتن فاعلاتن فاعلن | —˘—— —˘—— —˘—— —˘— | Iqbal        |
| **Kaamil**     | متفاعلن متفاعلن متفاعلن       | ˘˘—˘— ˘˘—˘— ˘˘—˘—  | Mir          |
| **Mujtass**    | مستفعلن فاعلاتن               | ——˘— —˘——          | Momin        |

**Computational Scansion (Taqti) Algorithm:**

1. **Tokenize** the sher (couplet) into words.
2. **Transliterate** to phonetic form (handle silent letters, zer/zabar/pesh).
3. **Syllabify** and assign weight (short/long/overlong).
4. **Pattern match** against known Bahr templates using DFA (Deterministic Finite Automata).
5. **Score** = proportion of lines matching detected Bahr.

**UPMVM (Urdu Poetry Metrics Verification Model):** Rule-based system achieving **94% accuracy** in automatic Bahr identification (tokenization → orthography → syllabification → weight assignment → DFA matching).

### **4.1.3 Gujarati Prosody & Metrics**

Gujarati poetry shares the Devanagari matra system (via Sanskrit heritage) but has distinct forms:

- **Matra System:** Same Laghu/Guru rules as Hindi (Gujarati script ા, િ, ી, ુ, ૂ, etc.).
- **Pruthvi Vritta / Anushtubh:** Classical Sanskrit meters used in Gujarati kavya.
- **Mishra Vritta (Mixed Meters):** Combinations of different gana patterns within a single poem.
- **Prasa (Rhyme):** End-rhyme conventions; **Yati Bheda** (caesura variations) for rhythmic effect.
- **Ghazal in Gujarati:** Uses same Beher/Qaafiya/Radif system as Urdu, adapted to Gujarati phonology.
- **Computational Resources:** The **Kavan** corpus (~300+ Gujarati poems) enables Navarasa emotion classification with ~87.6% accuracy using deep learning.
- **Literary Tradition:** Narsinh Mehta (bhakti), Narmad (modern prose pioneer), Kalapi (romantic), Meghani (folk/national), Sundaram, Umashankar Joshi — rich heritage of both classical and modern forms.
- **Garbi (ગરબી):** Cyclic devotional song form, refrain-heavy — associated with Navratri tradition. Rhythmic patterns unique to Gujarati.
- **Raas (રાસ):** Circular dance-song form with call-response structure — distinct metrical patterns serving performance context.
- **Padyabandh (પદ્યબંધ):** Structured verse with fixed matra count — classical Gujarati poetic form.
- **Gujarati Script Differences:** No shirorekha (headline); distinct vowel signs (ા િ ી ુ ૂ ે ૈ ો ૌ); unique retroflex lateral ળ — affects akshar-based readability metrics.
- **Kahevat (કહેવત) & Rudhiprayog (રૂઢિપ્રયોગ):** Gujarati proverbs and idiomatic expressions for sentiment/culture analysis (e.g., "હાથી જીવતો લાખનો, મરેલો સવા લાખનો"; "વાંદરાના હાથમાં અસ્ત્રો").
- **Echo Formations:** Gujarati reduplication patterns (ચા-બા, રોટલી-બોટલી) — distinct from Hindi echo words and relevant for phonaesthetic scoring.

**Rhyme Density:** Ratio of rhymed line endings to total lines (or rhymed word pairs / possible pairs).

### **4.2 The Golden Ratio & Fibonacci Structural Formulas**

Some poets and analysts look for the Divine Proportion ($\phi \approx 1.618$) in poem structures. They measure the "turn" (volta) of a poem to see if it occurs at the golden ratio mark of the total line count, which is argued to be the most aesthetically pleasing point for a shift in logic.

**Golden Ratio in Poetry:**

- Golden Ratio appears in volta placement (often at line $\approx 0.618$ of total line count).

- Used as a structural formula for poem proportions.

**Fibonacci Poetry:**

- Syllables per line follow the Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13… (minimum 6 lines).

**Golden Ratio ($\phi$) Poetry:**

- Lines follow $\phi$ decimals: 1 | 6 | 1 | 8 | 0 | 3 | 3 | 9… or ratios 3:5:8, 5:8:13.

**Modulor Poems:**

- Tile text on $\phi$-derived rectangles (Le Corbusier system); read horizontally/vertically for sub-poems.

**Example — "Inspiration Comes" (Fibonacci syllables):**

> I
> am
> sitting
> quietly,
> listening for the
> quiet noises in the darkness…

### **4.3 Rhyme Scheme Analysis**

- **Pattern Identification:** ABAB, AABB, ABBA, etc.
- **Rhyme Density:** Ratio of rhymed to unrhymed lines.
- **Rhyme Quality:** Perfect rhyme vs. slant rhyme vs. eye rhyme.
- **Urdu/Hindi Ghazal Structural Metrics:**
  - **Radif (ردیف / Refrain):** Exact repetition of word(s) at end of every second misra (and both misras of the matla). A ghazal may be **ghair-muraddaf** (without radif).
  - **Qaafiya (قافیہ / Rhyme):** The rhyming word(s) immediately preceding the Radif. The last common consonant is the **Harf-e-Ravi**.
  - **Matla (مطلع):** Opening couplet where both lines end with Radif+Qaafiya.
  - **Maqta (مقطع):** Final couplet containing the poet's pen name (takhallus).
  - **Computational Verification:**

    $$
    \text{IsGhazal} = \text{Matla}(L_1, L_2) \land (\forall i \in [2..n], \text{End}(L_{2i}) == \text{Radif}) \land (\text{Rhyme}(Q_i, Q_{\text{base}})) \land (|\text{couplets}| \geq 5)
    $$

  - **Qaafiya Density:** $Q_d = \frac{\text{Valid Qaafiya Pairs}}{\text{Total Couplets}}$ (should be 1.0 for a valid ghazal)
  - **Hindi/Devanagari Antyanuprasa (End Rhyme) Density:**

    $$
    A_d = \frac{\text{Lines with matching end-syllable patterns}}{\text{Total Lines}}
    $$

### **4.4 Perrine's "Sound and Sense" Framework**

Though not a mathematical scale, Laurence Perrine's widely used textbook _Sound and Sense: An Introduction to Poetry_ provides a structured framework for evaluating how well a poem's technical "sound" (meter, rhyme) supports its "sense" (meaning).

**Approach:** Systematic inventory: sound devices, imagery, diction, figure of speech, tone, irony, symbol, theme. More of a checklist than a numerical formula, but thorough and widely used in pedagogy.

---

## **5. LITERARY CRITICISM FRAMEWORKS**

### **5.1 New Criticism / Formalism (1920s–1960s)**

New Criticism was a formalist movement in literary theory that dominated American literary criticism in the middle decades of the 20th century.

**Evaluation Logic:**

- **Autotelic Logic:** The poem is a self-contained, autonomous object.
- **Close Reading:** Focus on intrinsic qualities of the text itself. Evaluate how tightly its language, imagery, paradox, and structure resolve toward a unified meaning.
- **Internal Tensions:** Score based on how well the poem resolves internal tensions and paradoxes without outside help.
- **Exclusion:** No biographical, historical, or reader context considered.

**Key Concepts:**

- Intentional Fallacy (author's intent is irrelevant).
- Affective Fallacy (reader's emotional response is irrelevant).
- Paradox, Irony, Ambiguity as positive qualities.

**Tools/Devices Counted:** Ironic tensions, paradox resolution, motif recurrence.

**I.A. Richards' Practical Criticism:** Removes context for "pure" evaluation; part of the New Critical tradition.

### **5.2 Reader-Response Criticism**

Reader-response criticism is a school of literary theory that focuses on the reader (or "audience") and their experience of a literary work. Value emerges from reader transaction; no fixed formula.

**The Transaction Formula:**

- **Value = Text × Reader × Context**
- Reading is not a passive act; readers actively construct meaning.
- The "value" changes depending on who is reading it.

**Three Elements:**

1. The Reader
2. The Text
3. The Context

### **5.3 Structuralism**

Structuralism in poetry is a literary theory that analyzes poems by focusing on their underlying structures and conventions rather than individual meanings.

**Analysis Framework:**

- **Binary Oppositions:** innocence/experience, creation/destruction.
- **Underlying Patterns:** Examining characterization, plot structures.
- **Language Systems:** How signs and symbols function within the text.

### **5.4 Deconstruction (Jacques Derrida)**

Deconstruction is a philosophy and method of critique developed by Jacques Derrida in the 1960s and 70s.

**Evaluation Approach:**

- Texts have irreconcilably contradictory meanings.
- Reading for what is hidden, suppressed, silenced, or forgotten.
- Challenges surface or conventional interpretation.
- Questions the objective truth of language.

### **5.5 Feminist Literary Criticism**

Feminist literary criticism is literary criticism informed by feminist theory.

**Evaluation Criteria:**

- Interrogates the role of gender in writing and interpretation.
- Critiques male-dominated language and perspectives.
- Re-examines canonical works to show how gender shapes meaning.
- Historically, women presented as objects from male perspective.

### **5.6 Psychoanalytic Criticism**

Psychoanalytic literary criticism applies principles of psychoanalysis, primarily from Sigmund Freud, to analyze texts.

**Analysis Framework:**

- **Id, Ego, Superego:** Human personality components in text.
- **Unconscious Desires:** Author's unconscious found in literary texts.
- **Latent Meaning:** Seeking hidden psychological content.
- **Trauma & Anxiety:** Poetry as coping mechanism for fears.

### **5.7 Marxist Literary Criticism**

Marxist literary criticism is based on historical materialism developed by Karl Marx.

**Evaluation Framework:**

- **Class Struggle:** Focus on struggles between social classes.
- **Economic Conditions:** Relationship between literature and social-economic conditions.
- **Power Dynamics:** Analysis of class, power, and economic systems.
- **Ideology:** How texts reflect or challenge dominant ideologies.

### **5.8 Ecocriticism**

Literary ecocriticism examines nature and the environment in literature.

**Methodological Approaches:**

- **Deep Ecology:** Intrinsic value of all living beings.
- **Ecofeminism:** Connection between environmental and gender oppression.
- **Postcolonial Ecocriticism:** Environmental justice in colonial contexts.
- **Reality Approach:** Direct environmental representation.
- **Discourse Approach:** How language shapes environmental understanding.

---

## **6. CLASSROOM & PEDAGOGICAL ANALYSIS TOOLS**

Acronym-based methods and structured heuristics guide systematic reading. These function as deterministic processing pipelines, ensuring no element is overlooked.

### **6.1 TP-CASTT Method**

TP-CASTT is a standard framework for breaking down a poem systematically.

**The TP-CASTT Algorithm (Steps):**

1. **T**itle — Predict meaning before reading; hypothesize subject.
2. **P**araphrase — Literal translation/meaning of content (line-by-line).
3. **C**onnotation — Identify metaphors, symbolism, imagery; identify figurative devices.
4. **A**ttitude — Tone of the speaker; note tone.
5. **S**hifts — Changes in logic, mood, or perspective; detect changes in tone/perspective.
6. **T**itle — Re-evaluate after analysis; revisit and reinterpret.
7. **T**heme — The final "output" or message; produce a concise thematic statement.

This method gives a formula to work from when trying to figure out what a poem means.

**When to use:** Teaching, slow reading, exam answers, full decoding from literal to thematic.

### **6.2 SWIFT Method**

SWIFT focuses on five key elements of poetry analysis.

**The SWIFT Framework:**

- **S**tructure (Form, stanza patterns, line breaks)
- **W**ord Choice (Diction, connotation, denotation)
- **I**magery (Sensory details, visual language)
- **F**igurative Language (Metaphor, simile, personification)
- **T**heme (Central message or meaning)

**Purpose:** Quick structural breakdown.

Some variations include **Tone** as a sixth element (TSWIFT).

### **6.3 T-SWIFT Method**

Extended AP Literature version of SWIFT:

- Adds **T**itle and **S**peaker to the SWIFT framework.

| Acronym  | Steps                                                                                     | Purpose                                |
| -------- | ----------------------------------------------------------------------------------------- | -------------------------------------- |
| TP-CASTT | Title (predict), Paraphrase, Connotation, Attitude/Tone, Shift(s), Title (revisit), Theme | Full decoding from literal to thematic |
| SWIFT    | Structure, Word choice, Imagery, Figurative language, Theme                               | Quick structural breakdown             |
| T-SWIFT  | Adds Title and Speaker                                                                    | Extended AP Literature version         |

### **6.4 SIFT Method**

Similar to SWIFT, focusing on:

- **S**ymbol
- **I**mages
- **F**igurative Language
- **T**one/Theme

### **6.5 Poetry Assessment Rubrics (Classroom)**

Common classroom rubrics evaluate poems across multiple dimensions.

**Typical Criteria (5 Dimensions):**

1. Theme
2. Diction and Details
3. Voice
4. Conventions
5. Form and Process

**Scoring Levels:**

- Beginning (1 point)
- Developing (2 points)
- Accomplished (3 points)
- Exemplary (4 points)

---

## **7. CONSTRAINT-BASED & GENERATIVE LOGICS (OULIPO ET AL.)**

**Core Idea:** Use a formal constraint or algorithm to force creative choices; literary value arises from ingenuity within constraints. Constraints act as generative algorithms.

Oulipo (Workshop of Potential Literature / Ouvroir de Littérature Potentielle) is a gathering of French-speaking writers and mathematicians who create works using constrained writing techniques. Founded 1960 by Raymond Queneau & François Le Lionnais.

The Oulipo embraced constraints to generate creative possibilities and uncover latent structures within language.

### **Key Algorithms & Constraints:**

| Constraint                          | Description / Rule                                                                         | Formula / Example                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| **N+7 (S+7)**                       | Replace every noun with the 7th noun following it in a dictionary                          | Noun → Noun+7; e.g., "Call me Ishmael" → "Call me Ishmael. Some yes-men ago…"       |
| **Lipogram**                        | Forbid use of a specific letter (e.g., no "e")                                             | Letter ∈ Excluded Set; e.g., Perec's _A Void_ (entire novel without the letter "e") |
| **Snowball (Rhopalic / Rhopalism)** | Each line is one word/letter longer than previous; each line one word, +1 letter each time | Line(n) = Line(n-1) + 1; e.g., I / am / now / post / haste…                         |
| **Sestina**                         | 6 end-words repeated in specific rotation pattern                                          | Permutation Matrix                                                                  |
| **Univocalism**                     | One vowel only throughout the text                                                         | (varies by language)                                                                |
| **Pilish**                          | Word lengths correspond to the digits of π                                                 | 3.14159…; word lengths = π digits                                                   |
| **Knight's Tour**                   | Text follows chess knight path on grid                                                     | —                                                                                   |
| **Mathematical Meters**             | Use numeric sequences to set stanza lengths, line lengths, or rhymes                       | Fibonacci stanza, 3/5/8 line patterns                                               |

**Why Useful:** Demonstrates formal inventiveness; provides reproducible, testable constraints.

---

## **8. MATHEMATICAL & COMPUTATIONAL APPROACHES**

### **8.1 Lexical Density Formula**

$$L_d = \frac{\text{Content Words}}{\text{Total Words}} \times 100$$

Also known as Ure's Lexical Density: $L_d = (\text{Lexical Items} / \text{Total Words}) \times 100$

A higher density often correlates with "weighty" or "difficult" poetry.

### **8.2 Type-Token Ratio (TTR)**

$$
TTR = \frac{\text{Unique Words (Types)}}{\text{Total Words (Tokens)}}
$$

Measures vocabulary diversity and richness. Note: sensitive to text length.

**Modern Corrections for Length:**

- **MTLD (Measure of Textual Lexical Diversity):** Corrects TTR's sensitivity to text length.
- **MATTR (Moving-Average Type-Token Ratio):** Another modern measure to correct for length effects.

### **8.3 Readability Metrics**

Standard formulas for measuring text complexity and accessibility. While designed for prose, they provide useful baselines for evaluating poetic diction difficulty.

**Flesch-Kincaid Grade Level:**

$$
FKGL = 0.39 \left(\frac{\text{Total Words}}{\text{Total Sentences}}\right) + 11.8 \left(\frac{\text{Total Syllables}}{\text{Total Words}}\right) - 15.59
$$

Estimates the U.S. school grade level needed to understand the text. Lower = easier.

**Flesch Reading Ease:**

$$
FRE = 206.835 - 1.015 \left(\frac{\text{Total Words}}{\text{Total Sentences}}\right) - 84.6 \left(\frac{\text{Total Syllables}}{\text{Total Words}}\right)
$$

Score 0–100. Higher = easier to read. Most poetry falls in the 30–70 range.

**Gunning Fog Index:**

$$
GFI = 0.4 \left[\left(\frac{\text{Words}}{\text{Sentences}}\right) + 100 \left(\frac{\text{Complex Words}}{\text{Words}}\right)\right]
$$

Where "complex words" = words with 3+ syllables (excluding proper nouns, compounds, and common suffixes). Estimates years of formal education needed.

**Coleman-Liau Index:**

$$
CLI = 0.0588L - 0.296S - 15.8
$$

Where _L_ = average number of letters per 100 words, _S_ = average number of sentences per 100 words.

**Automated Readability Index (ARI):**

$$
ARI = 4.71 \left(\frac{\text{Characters}}{\text{Words}}\right) + 0.5 \left(\frac{\text{Words}}{\text{Sentences}}\right) - 21.43
$$

**SMOG Index (Simple Measure of Gobbledygook):**

$$
SMOG = 3 + \sqrt{\text{Number of polysyllabic words in 30 sentences}}
$$

**Application to Poetry:** These metrics can be misleading for poetry due to short lines, enjambment, and unconventional sentence structures. Use them as rough indicators of vocabulary and syntactic complexity rather than absolute readability scores. Best applied to compare poems within a corpus rather than to judge individual works.

### **8.3.1 Indic Readability Metrics (Hindi/Devanagari)**

Standard English readability formulas produce out-of-range results for Hindi (Flesch Reading Ease can exceed 150). Use these Hindi-specific metrics (Sinha et al., 2012):

**Readability Hindi-1 (RH1):**

$$
RH1 = -2.34 + 2.14(AWL) + 0.01(JUK)
$$

**Readability Hindi-2 (RH2):**

$$
RH2 = -0.82 + 1.83(AWL) + 0.09(PSW)
$$

Where:

- **AWL:** Average Word Length (average number of akshars per word).
- **JUK:** Jukta-akshar Density — number of conjunct consonants (संयुक्त अक्षर) per 100 words. Higher = more complex.
- **PSW:** Percentage of Polysyllabic Words (words with 3+ akshars).

**Matra Complexity Index (proposed):**

$$
MCI = \frac{\text{Total Guru syllables}}{\text{Total syllables}} \times 100
$$

Higher MCI indicates heavier, more sonorous text. Useful for comparing tonal weight across poems.

**Cross-Script Considerations:**

- **Hindi vs. Urdu:** Same spoken language (Hindustani), different scripts (Devanagari vs. Nastaliq). Readability metrics should be script-agnostic at the phonological level.
- **Gujarati:** Uses similar akshar structure; RH1/RH2 can be adapted with Gujarati-specific AWL norms.
- **Marathi:** Shares Devanagari script; same matra rules apply but with distinct vocabulary affecting AWL.
- **Sanskrit:** Higher JUK density due to extensive sandhi and compound words (samas); expect RH1 scores 2-3 grades higher than equivalent Hindi text.

### **8.4 Sentiment Analysis & Computational Aesthetics**

**8.4.1 Western Models (Valence-Arousal)**
Using AI to map the "Emotional Valence" of a poem on a graph—not unlike the Pritchard Scale, but measuring "Happiness vs. Sadness" rather than "Importance."

**Emotional Metrics:**

- Positive/Negative sentiment ratio.
- **VAD Scoring:** Valence (Pleasantness), Arousal (Intensity), Dominance (Control).
- **Sentiment Arc:** Plotting sentiment per line to visualize emotional trajectory (Vonnegut shapes).

**8.4.2 Indic Computational Aesthetics (Rasa Theory)**
Mapping text to the 9 Rasas (Navarasa) using NLP, rooted in Bharata's Natyashastra:

| Rasa                     | Emotion (Bhava)   | Hindi    | Colour      |
| ------------------------ | ----------------- | -------- | ----------- |
| **Shringara** (श्रृंगार) | Love/Beauty       | प्रेम    | Light Green |
| **Hasya** (हास्य)        | Laughter/Comedy   | हास      | White       |
| **Karuna** (करुण)        | Compassion/Sorrow | शोक      | Grey        |
| **Raudra** (रौद्र)       | Fury/Anger        | क्रोध    | Red         |
| **Veera** (वीर)          | Heroism/Courage   | उत्साह   | Orange      |
| **Bhayanaka** (भयानक)    | Terror/Fear       | भय       | Black       |
| **Bibhatsa** (बीभत्स)    | Disgust           | जुगुप्सा | Blue        |
| **Adbhuta** (अद्भुत)     | Wonder/Awe        | विस्मय   | Yellow      |
| **Shanta** (शांत)        | Peace/Serenity    | शम       | White-Blue  |

- **Vector Mapping:**

  $$
  \vec{P}_{\text{rasa}} = [\text{Shringara}, \text{Hasya}, \text{Karuna}, \text{Raudra}, \text{Veera}, \text{Bhayanaka}, \text{Bibhatsa}, \text{Adbhuta}, \text{Shanta}]
  $$

- **Dominant Rasa:** $\max(\vec{P}_{\text{rasa}})$ determines the primary aesthetic experience.
- **Rasa Transition Graph:** Plot rasa shifts across couplets to visualize emotional arc in Indic terms (analogous to Western sentiment arc).

**Computational Resources:**

| Tool/Resource                 | Language           | Function                                                                   |
| ----------------------------- | ------------------ | -------------------------------------------------------------------------- |
| **Bhaavana**                  | Hindi              | Rasa-based emotion classification (Hasya, Karuna, Shanta, Shringar, Veera) |
| **Hindi SentiWordNet (HSWN)** | Hindi              | Word-level polarity scoring (~13,889 entries)                              |
| **Anupam SentiWordNet**       | Hindi              | Socio-culturally adapted sentiment lexicon                                 |
| **SUKHAN Corpus**             | Hindi              | 733 annotated shayaris for sentiment analysis                              |
| **Kavan Corpus**              | Gujarati           | 300+ poems with Navarasa annotation (~87.6% classification accuracy)       |
| **IndicBERT / MuRIL**         | Multilingual Indic | Contextual embeddings for Hindi, Urdu, Gujarati, Marathi, Sanskrit         |
| **iNLTK**                     | 13 Indic languages | Tokenization, embeddings, text generation, language ID                     |
| **IndicNLP Library**          | Pan-Indic          | Syllabification, script conversion, text normalization                     |
| **UNLT**                      | Urdu               | Tokenization, POS tagging                                                  |
| **LughaatNLP**                | Urdu               | Preprocessing, stemming, NER, spell check                                  |
| **UrduHack**                  | Urdu               | Pronunciation (PronouncUR), RoBERTa-Urdu-small                             |
| **Rekhta Taqti**              | Urdu               | Online Bahr identification tool                                            |
| **Text2Mātrā**                | Hindi              | Automatic matra scansion (Laghu/Guru)                                      |
| **RPaGen**                    | Hindi              | Rhyming pattern detection                                                  |
| **FoSCal**                    | Hindi              | Figures of speech quantification                                           |

### **8.5 Mathematical Chitrakavya (Visual & Constraint Poetry)**

Ancient Indian tradition of "Picture Poetry" (चित्रकाव्य) employing rigorous mathematical and geometric constraints (**Bandhas**). Three categories: **Shabdachitra** (verbal), **Arthachitra** (semantic), **Ubhayachitra** (both).

| Bandha                            | Constraint                                                 | Mathematical Basis     |
| --------------------------------- | ---------------------------------------------------------- | ---------------------- |
| **Padma-bandha (Lotus)**          | Syllables in 8-petal pattern; petal traversal yields verse | Radial graph traversal |
| **Chakra-bandha (Wheel)**         | Syllables on concentric circles; rotation yields reading   | Circular permutation   |
| **Turaga-bandha (Knight's Tour)** | Syllables on NxN grid; chess knight moves reveal poem      | Hamiltonian path       |
| **Gomutrika-bandha (Zig-zag)**    | Alternating letters between lines create zig-zag           | Interleaving algorithm |
| **Sarvatobhadra**                 | Reads same forwards, backwards, top-down, bottom-up        | Matrix palindrome      |
| **Ardhabhrama**                   | Half-rotation of syllable grid yields a different verse    | 180° rotation symmetry |

- **Constraint Satisfaction Score:** $CSS = 1 - \frac{\text{Violations}}{\text{Total Constraints}}$ (1.0 = perfect)
- **Combinatorial Complexity:** $\text{Difficulty} = \log_2(\text{valid arrangements} / \text{total arrangements})$
- **Yamaka Restrictions:** Same syllable sequence, different meaning — number of valid splits = combinatorial function of word boundaries.

### **8.4 Surprise / Information-Theoretic Measures**

- **Perplexity (PPL):** How surprised a language model is by the poem; lower is "more predictable." Use as a proxy for conformity to training corpora or conventional style.
- **Entropy of Token Distribution:** Measures unpredictability / richness.

### **8.5 Embedding-Based Similarity & Novelty**

- **Semantic Similarity to Canon/Genre Prototypes:** Compute embedding(passage) cosine similarity to a set of canonical exemplars.
- **Novelty Score:** 1 − max(similarity to known set).

### **8.6 Aesthetic Appreciation Metrics**

Research shows both rhyme and regular meter led to enhanced aesthetic appreciation, higher intensity in processing, and more positively perceived feelings.

### **8.7 Combined Heuristic 'Computational Greatness' (Example)**

This is _not authoritative_ — it's a reproducible, composite score to compare poems in a controlled corpus.

$$
G_{\text{comp}} = w_1 \cdot \hat{L}_d + w_2 \cdot \widehat{MTLD} + w_3 \cdot (1 - \hat{PPL}) + w_4 \cdot \hat{N}_{\text{emb}} + w_5 \cdot \hat{R}_d
$$

Where:

- $G_{\text{comp}}$ = Computational Greatness score
- $w_1 \dots w_5$ = user-chosen weights (e.g., 0.15, 0.20, 0.25, 0.25, 0.15)
- $\hat{L}_d$ = normalized lexical density
- $\widehat{MTLD}$ = normalized MTLD
- $\hat{PPL}$ = normalized perplexity
- $\hat{N}_{\text{emb}}$ = normalized embedding novelty
- $\hat{R}_d$ = normalized rhyme density

Choose weights w1..w5 to reflect your values (e.g., w1=0.15, w2=0.20, w3=0.25, w4=0.25, w5=0.15). Normalize each metric to [0,1] across your comparison set.

**Caveat:** This composite is a heuristic for corpus comparison, not a universal aesthetic verdict.

---

## **9. MODERN AI/NLP POETRY ANALYSIS**

Modern tools quantify: lexical density (content words/total words), sentiment valence, metaphor novelty, and rhyme/plosive density. Evolutionary algorithms and BERT models evaluate "poetic intensity."

### **9.1 Automated Poetry Scoring Systems**

Automated poetry scoring is an emerging task in automated text scoring, receiving increasing attention in AI for education.

**BERT-Based Models:**

- Automated poetry scoring using BERT with multi-scale poetry features.
- Fine-tuned BERT models for automated essay/poetry scoring.
- Sentence-BERT networks for automatic grading.

**Evaluation Metrics for AI-Generated Poetry:**

- Rhyming accuracy
- Metre compliance
- Syntax quality
- Semantics coherence
- Amount of unknown words

### **9.2 Computational Poetics Framework**

A systematic review examined applications of NLP in computational poetics and literary analysis, surveying research outputs from 2000 to 2025.

**Core Advances:**

- Computational modeling of poetic structure.
- Automatic poetry classification using NLP.
- Machine learning for metrical analysis of English poetry.
- Computational thematic analysis via bimodal large language models.

### **9.3 Three-Step Evaluation Framework (2025)**

A case study on Tang Poetry introduced a three-step evaluation framework:

1. **Computational Feature Extraction**
2. **LLM-as-a-Judge Evaluation**
3. **Human Expert Validation**

### **9.4 PoetryDiffusion Model**

Allows for individual training and flexible integration, enabling efficient manipulation and assessment of metrical and semantic metrics.

### **9.5 Available Computational Tools**

A 2024 survey provided overview of currently available computational tools for automatic poetry analysis.

**Tool Categories:**

**English:**

- Meter detection algorithms
- Rhyme scheme analyzers
- Sentiment analyzers (VADER, BERT)
- Stylometry software (Voyant Tools, R-Stylo)

**Hindi/Devanagari:**

- **Text2Mātrā:** Automatic Laghu/Guru scansion for Hindi poetry
- **RPaGen:** Rhyming pattern generator/detector
- **FoSCal:** Figures of speech calculator (maps Alankar to numerical scale)
- **Bhaavana:** Rasa-based emotion classifier

**Urdu:**

- **Rekhta Taqti:** Online Bahr identification and syllable breakdown
- **UPMVM:** Rule-based meter verification model (94% accuracy)
- **Qaafiya (GitHub):** ML-based ghazal rule checker

**Gujarati:**

- **Kavan Corpus + Deep Learning pipeline:** Navarasa emotion classification (~87.6% accuracy)

**Pan-Indic:**

- **IndicNLP Library:** Syllabification, script conversion, tokenization across Indian languages
- **iNLTK:** Pre-trained models for 13 Indic languages (embeddings, generation, classification)
- **IndicBERT / MuRIL:** Multilingual contextual embeddings for Indic NLP tasks
- **Stanza (Stanford):** POS tagging, dependency parsing for Hindi and Urdu

### **9.6 Poetic Intensity Multi-Dimensional Framework (PIMF)**

Adds dimensions beyond standard BLEU/ROUGE evaluation:

- Metaphor novelty
- Aesthetic rhythm
- Conceptual depth

### **9.7 Stylometric Predictors**

Plosive/fricative density, rhyme count correlate with perceived quality (demonstrated in Romantic poets study).

### **9.8 Evolutionary Algorithms**

Generate/evaluate poems for metrical + semantic fidelity:

- Edit distance measurement
- Structural alignment comparison

---

## **10. THEORETICAL/CRITICAL DEVICES THAT ACT AS "FORMULAS"**

### **10.1 Objective Correlative (T. S. Eliot)**

**Logic:** A set of objects, a situation, a chain of events which shall be the formula for evoking a particular emotion in the reader — the emotion is evoked without naming it. External objects must evoke exact emotion.

**Use:** Ask: does this poem supply a concrete chain of imagery that reliably evokes the intended emotion?

### **10.2 Imagism / Efficiency Logic (Ezra Pound)**

**Logic:** A good poem expresses an "intellectual and emotional complex" in a single, precise image — in the fewest words for maximum intellectual/emotional complex. Measure: economy of language used to convey dense meaning.

**Heuristic Formula:** Information per word ≈ (semantic density) / (word count). Hard to compute exactly, but approximated with lexical density and surprisal measures (see NLP section).

---

## **11. POETRY COMPETITION & CONTEST JUDGING RUBRICS**

### **11.1 Poetry Out Loud Scoring Rubric**

The scoring rubric provides a consistent measure against which to evaluate recitations.

**Evaluation Criteria:**

| Category                  | Points | Description                  |
| ------------------------- | ------ | ---------------------------- |
| Physical Presence         | 5      | Confidence, posture, gesture |
| Voice and Articulation    | 5      | Volume, pace, pronunciation  |
| Dramatic Appropriateness  | 5      | Tone, emphasis, emotion      |
| Evidence of Understanding | 5      | Comprehension demonstrated   |
| Overall Performance       | 5      | Total impact                 |
| **Total**                 | **25** |                              |

### **11.2 Poetry Slam Judging (0-10 Scale)**

Performers rated with a score from 0-10; average of all judges becomes final score.

**Poem Criteria (4 Points Possible):**

- Well-crafted with effective poetic language
- Originality and creativity
- Emotional impact
- Audience engagement

### **11.3 Original Poetry Contest Rubrics**

Alabama's Original Poetry Contest Scoring Rubric evaluates both poems and recitations.

**Common Contest Criteria:**

- **Impact:** 30 points – Writer has something to say; completeness of content and form.
- **Theme Interpretation:** Clarity of theme adherence.
- **Technical Skills:** Meter, rhyme, structure.
- **Originality:** Creative and unique approach.
- **Language Use:** Diction, imagery, figurative language.

### **11.4 Poetry Nation Rating System**

Three-star rating system with specific criteria:

- Fresh, authentic language
- Interesting subject matter
- Adequate sentence structure

### **11.5 100-Point Judging Systems**

Some competitions use a 100-point system with 10 areas rated from 1 to 10 points each.

**Typical 10 Areas:**

1. Originality
2. Imagery
3. Structure
4. Emotional Impact
5. Intellectual Depth
6. Word Choice
7. Rhythm/Flow
8. Theme Development
9. Technical Execution
10. Overall Impression

### **11.6 AI Poetry Evaluators (Emerging)**

Rate poems on 20-point scale vs. Baudelaire/Plath; detect "masterpiece" potential via text-alone analysis.

---

## **12. FORMAL POETRY STRUCTURE EVALUATION CRITERIA**

### **12.1 Sonnet Evaluation Rubric**

Sonnet rubrics grade based on adherence to sonnet conventions.

**Key Criteria:**

- **Iambic Pentameter:** 10 syllables per line, unstressed-stressed pattern.
- **Rhyme Scheme:** Shakespearean (ABAB CDCD EFEF GG) or Petrarchan (ABBAABBA CDECDE or variations).
- **Volta:** Turn/shift typically at line 9 (Petrarchan) or line 13 (Shakespearean).
- **14 Lines:** Strict line count requirement.

### **12.2 Haiku Evaluation Rubric**

Haiku rubrics evaluate traditional form compliance.

**Scoring Levels:**

| Level          | Points | Criteria                                   |
| -------------- | ------ | ------------------------------------------ |
| Distinguished  | 100    | Follows 5-7-5, nature theme, juxtaposition |
| Proficient     | 75     | Minor deviations from form                 |
| Basic          | 50     | Significant form issues                    |
| Unsatisfactory | 25     | Does not follow haiku conventions          |

### **12.3 Villanelle Characteristics**

A villanelle has a strict form of 19 lines within five triplets and a repeating refrain.

**Structure Requirements:**

- **19 Lines Total**
- **5 Tercets** (3-line stanzas) + **1 Quatrain** (4-line stanza)
- **2 Refrains:** Lines 1 and 3 repeat throughout
- **Rhyme Scheme:** A1bA2 abA1 abA2 abA1 abA2 abA1A2

### **12.4 Form Checklist for Assessment**

Criteria lists should include items like:

- Identify type of poem
- Discuss diversions from form
- Evaluate creative use within constraints

---

## **13. QUANTITATIVE & STYLOMETRIC ANALYSIS**

### **13.1 Stylometry**

Stylometry is the study of authorial or literary style using quantitative metrics.

**Measurable Features:**

- Word frequency distributions
- Sentence length patterns
- Punctuation usage
- Function word ratios
- Character n-grams

### **13.2 Quantitative Analysis Methods**

Quantitative stylistic methods express certain aspects of a text in numeric form, allowing fast, powerful analysis.

**Applications:**

- Author attribution
- Stylistic influence tracking
- Temporal evolution of literary style
- Comparative analysis between poets

### **13.3 Large-Scale Stylometric Studies**

First large-scale temporal stylometric study of literature used vast corpora to track quantitative patterns of stylistic influence.

**Research Findings:**

- Measurable stylistic influence between authors
- Quantifiable evolution of literary conventions
- Statistical patterns in poetic language

### **13.4 Quantitative Linguistics for Poetry**

Methods for objective analysis of poetic language include rhythm measurement, semantic explications, and structural patterns.

---

## **14. PRACTICAL FORMULAS & QUICK RECIPES (MATHEMATICAL NOTATION)**

### **14.1 Lexical Density**

Given a set of tokens $T = \{t_1, t_2, \dots, t_n\}$ and a subset $T_{\text{lex}} \subseteq T$ where each $t \in T_{\text{lex}}$ is a content word:

$$
L_d = \frac{|T_{\text{lex}}|}{|T|}
$$

### **14.2 Type-Token Ratio (TTR)**

Given a token sequence $T$ of length $N$, and the set of unique types $V = \{\text{unique elements of } T\}$:

$$
TTR = \frac{|V|}{N}
$$

### **14.3 Simple Rhyme Density (End-Word Rhyme)**

Given $n$ lines with end-words $E = \{e_1, e_2, \dots, e_n\}$, let $R = \text{number of pairs } (e_i, e_j) \text{ where } i < j \text{ and } \text{rhyme}(e_i, e_j) = \text{true}$:

$$
R_d = \frac{R}{\binom{n}{2}} = \frac{R}{\frac{n(n-1)}{2}}
$$

### **14.4 Metrical Regularity (Heuristic)**

Given $N$ lines, a target metrical pattern $P$, and a stress pattern function $\sigma(\text{line}_i)$:

For each line $i$, compute a match score:

$$
s_i = \text{match}(\sigma(\text{line}_i),\; P) \in \{0, 1\}
$$

Then the metrical regularity is:

$$
M_r = \frac{1}{N} \sum_{i=1}^{N} s_i
$$

---

## **15. USE-CASES AND RECOMMENDED APPROACHES**

| Use-Case                           | Recommended Methods                                                                                                  |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Teaching / Close-Reading**       | TP-CASTT, Perrine's _Sound and Sense_, Practical Criticism, SWIFT                                                    |
| **Corpus Analysis / Research**     | Lexical measures (MTLD, TTR), perplexity, and embedding-based similarity                                             |
| **Creative Constraint and Craft**  | Oulipo constraints and explicit metrical scoring                                                                     |
| **Editorial Selection / Contests** | Combine human juries (qualitative) with objective checks (meter, rhyme, length) — avoid sole reliance on one formula |
| **Academic Analysis**              | New Criticism, Structuralism, Deconstruction, Feminist, Marxist, Psychoanalytic frameworks                           |
| **Computational Research**         | BERT scoring, sentiment analysis, stylometry, PIMF, evolutionary algorithms                                          |

---

## **16. HYBRID & EMERGING APPROACHES**

- **Objective Correlative (T. S. Eliot):** External objects must evoke exact emotion.
- **Imagism (Ezra Pound):** Fewest words for maximum intellectual/emotional complex.
- **Three-Step Evaluation Framework (2025):** Computational Feature Extraction → LLM-as-a-Judge → Human Expert Validation.
- **PoetryDiffusion Model:** Individual training and flexible integration for metrical and semantic assessment.
- **AI Poetry Evaluators:** Rate on 20-point scale vs. canonical poets; detect "masterpiece" potential via text-alone analysis.
- **Evolutionary Algorithms:** Generate/evaluate poems for metrical + semantic fidelity (edit distance, structural alignment).
- **Poetic Intensity Multi-Dimensional Framework (PIMF):** Beyond BLEU/ROUGE — adds metaphor novelty, aesthetic rhythm, conceptual depth.

---

## **17. LIMITATIONS & ETHICAL NOTES**

- **No Single "Perfect" System:** Unlike the fictional Pritchard Scale, no real system can objectively measure poetry's "greatness."
- **Purpose Determines Method:** Different evaluation frameworks serve different purposes—academic analysis, classroom teaching, competition judging, or computational research.
- **Mathematical Approaches Exist:** From prosody and meter to AI scoring and stylometry, quantitative methods are actively used.
- **Human Judgment Remains Central:** Poetry's true value lies in its intimate, personal connection, making conventional rating systems inherently limited.
- **Hybrid Approaches Emerging:** Modern evaluation often combines computational analysis with human expert judgment.
- **Context Matters:** Reader-response theory acknowledges that value changes depending on who is reading and when.
- **Numeric Bias:** Numeric measures can bias toward forms similar to the training corpora used by tools (ML models).
- **Cultural & Historical Factors:** Cultural, historical, and reader-response factors are difficult to quantify but crucial.
- **Composite Scores Are Comparative:** Any composite score must be treated as a comparative tool, not an absolute judgment.

---

## **18. SUMMARY COMPARISON TABLE**

| **Method**                              | **Type**        | **Mathematical?**    | **Primary Focus**         | **Era/Origin**     |
| --------------------------------------- | --------------- | -------------------- | ------------------------- | ------------------ |
| **Pritchard Scale**                     | Fictional       | Yes (Graph Area)     | Perfection × Importance   | 1989 (Film)        |
| **Aristotle's Poetics**                 | Classical       | No                   | Genre, Unity, Catharsis   | 4th Century BCE    |
| **Horace's Ars Poetica**                | Classical       | No                   | Decorum, Unity, Delight   | 19 BCE             |
| **Arnold's Touchstone**                 | Historical      | No                   | Comparison to Masters     | 1880               |
| **I. A. Richards' Practical Criticism** | Historical      | No                   | Blind Close Reading       | 1920s              |
| **Prosody/Scansion**                    | Technical       | Yes (Meter Patterns) | Rhythm, Stress Patterns   | Ancient            |
| **Golden Ratio**                        | Mathematical    | Yes ($\phi = 1.618$) | Structural Proportions    | Modern Application |
| **Fibonacci Poetry**                    | Mathematical    | Yes (Sequence)       | Syllable Patterns         | Modern Application |
| **New Criticism**                       | Theoretical     | No                   | Internal Text Analysis    | 1920s-1960s        |
| **Reader-Response**                     | Theoretical     | No                   | Reader Experience         | 1970s              |
| **Structuralism**                       | Theoretical     | No                   | Underlying Patterns       | 1960s              |
| **Deconstruction**                      | Theoretical     | No                   | Contradictory Meanings    | 1960s-70s          |
| **Feminist Criticism**                  | Theoretical     | No                   | Gender in Writing         | 1970s+             |
| **Psychoanalytic Criticism**            | Theoretical     | No                   | Unconscious Content       | Early 20th Century |
| **Marxist Criticism**                   | Theoretical     | No                   | Class & Power             | 19th Century+      |
| **Ecocriticism**                        | Theoretical     | No                   | Nature & Environment      | 1990s+             |
| **TP-CASTT**                            | Pedagogical     | No                   | Step-by-Step Analysis     | Modern Classroom   |
| **SWIFT / T-SWIFT**                     | Pedagogical     | No                   | 5/6-Element Analysis      | Modern Classroom   |
| **SIFT**                                | Pedagogical     | No                   | Symbol/Image Focus        | Modern Classroom   |
| **Perrine's Sound and Sense**           | Pedagogical     | No (Checklist)       | Sound-Sense Relationship  | Modern Classroom   |
| **Oulipo Constraints**                  | Creative        | Yes (Algorithms)     | Constrained Writing       | 1960s              |
| **Lexical Density**                     | Computational   | Yes (Formula)        | Word Ratio                | Modern             |
| **TTR / MTLD / MATTR**                  | Computational   | Yes (Formula)        | Vocabulary Diversity      | Modern             |
| **Sentiment Analysis**                  | AI/NLP          | Yes (ML Models)      | Emotional Valence         | 2000s+             |
| **Perplexity / Entropy**                | Computational   | Yes (Info Theory)    | Predictability / Richness | Modern             |
| **Embedding Similarity**                | AI/NLP          | Yes (Cosine)         | Canon Proximity / Novelty | 2010s+             |
| **BERT Poetry Scoring**                 | AI/NLP          | Yes (Neural Network) | Automated Grading         | 2020s              |
| **PIMF**                                | AI/NLP          | Yes (Multi-Dim)      | Poetic Intensity          | 2020s              |
| **Evolutionary Algorithms**             | Computational   | Yes (Optimization)   | Metrical + Semantic       | 2010s+             |
| **Stylometry**                          | Quantitative    | Yes (Statistics)     | Authorial Style           | 19th Century+      |
| **Poetry Out Loud**                     | Competition     | No (Rubric)          | Performance Quality       | 2000s              |
| **Poetry Slam**                         | Competition     | No (0-10 Scale)      | Performance + Content     | 1980s+             |
| **100-Point System**                    | Competition     | Yes (Numeric)        | Multi-Criteria Scoring    | Modern             |
| **Sonnet/Haiku Rubrics**                | Formal          | No (Checklist)       | Form Compliance           | Traditional        |
| **Villanelle Structure**                | Formal          | No (Checklist)       | Form Compliance           | Traditional        |
| **Objective Correlative**               | Critical Theory | No                   | Emotion via Objects       | 1919 (Eliot)       |
| **Imagism**                             | Critical Theory | No                   | Economy of Language       | 1910s (Pound)      |
| **AI Poetry Evaluators**                | AI/NLP          | Yes (Scoring)        | Masterpiece Detection     | 2020s+             |

---

## **19. KEY TAKEAWAYS**

1. **No Single "Perfect" System:** Unlike the fictional Pritchard Scale, no real system can objectively measure poetry's "greatness."

2. **Purpose Determines Method:** Different evaluation frameworks serve different purposes—academic analysis, classroom teaching, competition judging, or computational research.

3. **Mathematical Approaches Exist:** From prosody and meter to AI scoring and stylometry, quantitative methods are actively used.

4. **Human Judgment Remains Central:** Poetry's true value lies in its intimate, personal connection, making conventional rating systems inherently limited.

5. **Hybrid Approaches Emerging:** Modern evaluation often combines computational analysis with human expert judgment. The Three-Step Framework (2025) exemplifies this: Computational Feature Extraction → LLM-as-a-Judge → Human Expert Validation.

6. **Context Matters:** Reader-response theory acknowledges that value changes depending on who is reading and when.

7. **Computational Tools Are Growing:** From BERT-based scoring to PIMF, evolutionary algorithms, and PoetryDiffusion models, the field is rapidly advancing—but these tools are best used as comparative aids, not absolute judges.

8. **Constraints Breed Creativity:** The Oulipo tradition demonstrates that mathematical and algorithmic constraints, far from limiting poetry, can generate entirely new creative possibilities.

---

## **20. FURTHER READING & RESOURCES**

### **Textbooks & Classical Works:**

- Laurence Perrine — _Sound and Sense: An Introduction to Poetry_
- I. A. Richards — _Practical Criticism_ and essays on close reading
- Aristotle — _Poetics_
- Horace — _Ars Poetica_
- Matthew Arnold — _The Study of Poetry_
- T. S. Eliot — essays: _Hamlet and His Problems_, _Tradition and the Individual Talent_

### **Oulipo & Constraint-Based Writing:**

- Oulipo resources and examples (N+7, lipogram)
- Raymond Queneau — _Exercises in Style_
- Georges Perec — _A Void_ (lipogram novel)

### **Modern NLP & Computational Papers:**

- _Evaluating Diversity in Automatic Poetry Generation_ (EMNLP/ACL sources)
- Lexical diversity literature (MTLD / MATTR papers)
- Computational Poetics Surveys: Various NLP papers on lexical density, PIMF, evolutionary algorithms (Preprints.org, ACL Anthology)

---

## **21. APPENDIX: EXAMPLES AND WORKED NUMBERS**

_(Short worked examples for one sonnet and one free-verse poem — included as a small table and suggested code to reproduce locally.)_

### **How to Use This Document:**

- Read sections 3–6 for historical context and literary criticism frameworks.
- Use sections 7–10 to understand constraint-based and computational approaches.
- Use section 14 for mathematical formulas you can apply in analysis and experiments.
- Refer to section 15 for choosing the right approach for your use-case.
- Consult section 18 (Summary Comparison Table) for a quick reference of all methods.

---

## **22. REFERENCES & KEY CITATIONS**

### **Online Resources:**

- Harvard Measuring Poetry page (Pritchard recreation): https://people.math.harvard.edu/~knill/various/measuringpoetry/index.html
- Wikipedia Poetry Analysis & Scansion: https://en.wikipedia.org/wiki/Poetry_analysis & https://en.wikipedia.org/wiki/Scansion
- Oulipo Wikipedia (constraints): https://en.wikipedia.org/wiki/Oulipo
- Golden Ratio Poetry (Fibonacci/Phi examples): https://www.goldennumber.net/poetry/
- Bridges Math & Art (Golden Ratio techniques): https://archive.bridgesmathart.org/2025/bridges2025-603.pdf
- Matthew Arnold Touchstone: https://haaconline.org.in/attendence/classnotes/files/1627760810.pdf
- TP-CASTT Guide: https://www.readwritethink.org/sites/default/files/resources/30738_analysis.pdf
- Computational Poetics Surveys: Various NLP papers on lexical density, PIMF, evolutionary algorithms (Preprints.org, ACL Anthology)

### **General Source Notes:**

All sources cited throughout this document are from web search results and academic references. Key sources include academic papers, educational resources, literary theory references, and contemporary AI/NLP research on poetry analysis.
