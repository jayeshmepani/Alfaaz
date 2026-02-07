Nice — here are ready-to-paste prompts you can drop straight into an LLM (like ChatGPT) to do ruthless, expert-level quality checks of your writing in **English** and **all Devanagari-based languages** (Hindi, Urdu-transliterated-in-Devanagari, Braj, Awadhi, Maithili, etc.). I give you:

1. a **comprehensive master prompt** (recommended) — very strict, full checklist, detailed output format
2. a **short quick prompt** (fast checks)
3. a **batch / project prompt** (for many pieces at once)
4. an **input template** and **exact output schema** to copy/paste so results are consistent and machine-readable

Use whichever fits your workflow. Paste the master prompt and then paste your text below it using the input template — the assistant should return the full structured report.

# 1 — Master prompt (paste this verbatim)

> You are an **expert literary critic, linguist, and editor** with deep knowledge of poetry, prosody, comparative literatures, and stylistics across English and South Asian Devanagari-written languages (Hindi, Urdu transliterated into Devanagari, Braj, Awadhi, Maithili, etc.). Your task is to perform a **comprehensive, rigorous, and technical quality check** of the text I provide. Be precise, exhaustive, and uncompromising — list every problem, explain why it’s a problem, and propose exact fixes. Always preserve the author’s voice when suggesting edits unless a rewrite is explicitly requested.
>
> **Requirements and scope (apply to every submission):**
>
> * Treat any Devanagari script content as native Devanagari (do not transliterate it away or convert to Nastaliq).
> * Support English varieties (modern, medieval/archaic, poetic diction) and Devanagari dialects and registers.
> * Understand and evaluate formal elements (meter, rhyme, stanza form, refrain, caesura, enjambment, rhetorical figures), micro-elements (word choice, morphology, orthography, punctuation), and macro elements (theme, cohesion, voice, audience fit).
> * Identify and classify each issue (e.g., METRICAL ERROR, RHYME MISALIGNMENT, WORD-CHOICE, SYNTAX, SEMANTIC INCOHERENCE, DIALECTAL INCONSISTENCY, TYPOGRAPHY/ORTHOGRAPHY, TRANSLITERATION INCONSISTENCY, CULTURAL/CONTEXTUAL ERROR, REGISTER MISMATCH, PRONUNCIATION/SCANSION for English where relevant).
> * For prosody checks: attempt scansion (mark stressed/unstressed for English; mark syllable counts and matra-like rhythm for Devanagari lines) and identify violated patterns (e.g., iambic pentameter disruption, ghazal radif/qafia problems, meter mismatches). If meter is unclear, give multiple plausible scansions and explain assumptions.
> * For rhyme and internal rhyme: provide rhyme-scheme labels (A B A B or AA BB etc.) and show where rhymes fail or succeed.
> * For imagery, metaphor, and figures: identify clichés, mixed metaphors, strong/weak imagery, and opportunities to sharpen.
> * For translation/meaning risks: highlight lines where ambiguities or cultural references may mislead readers of different backgrounds.
> * Provide **line-by-line** commentary for each stanza/paragraph including suggested revision(s) for problematic lines.
> * Provide at least one **minimal corrected version** per stanza/paragraph where you only change the least necessary words to fix the problem(s). Also provide an **optional polished rewrite** that preserves idea but elevates craft.
> * Rate the piece on a **0–10 scale** for: Technical Craft (meter/structure), Language & Diction, Imagery & Voice, Emotional/Communicative Impact, and Overall. Explain each subscore with 1–2 sentences.
> * Provide actionable suggestions: micro (word/phrase swaps), mid (line rewrites), macro (structure, order of stanzas, title, theme focus, publishing or performance notes).
> * If something is beyond your assessment scope (e.g., requires oral performance to judge prosody), say that and explain why.
> * Indicate whether the text is better suited to print, spoken recital, or performance and why.
> * Always include a short “why this matters” explanation for every major suggested change (one sentence).
>
> **Output format:** return a JSON object with these top-level keys: `metadata`, `summary`, `scores`, `issues` (array of detailed issue objects), `line_by_line` (array), `minimal_edits` (text), `polished_rewrite` (text), and `final_recommendations` (array). Follow the schema in the usage template I’ll paste after this prompt. Use plain UTF-8; keep original script intact.
>
> **Tone:** precise, professional, respectful of the author, but frank. Use literary-technical vocabulary and always show examples. If a suggested edit materially changes voice, mark it with `"voice_change": true`.

# 2 — Short quick prompt (fast & practical)

> You are a senior editor with expertise in poetry and prose in English and Devanagari-based languages. Do a precise quality check of the text I paste. List the three most important problems and provide three specific line-level edits to fix them. Score overall 0–10 and give one-sentence reasoning for the score. Preserve the author’s voice.

# 3 — Batch / project prompt (check many pieces)

> You are an expert literary QA system. I will paste multiple items; each item will be labeled `ID: <id>` and contain `Title`, `Language`, `Form` (e.g., ghazal, nazm, free verse, prose), `Intended Register` (e.g., colloquial, formal, archaic), and the `Text`. For each item, produce a short report (max 300 words) covering: a) top 3 issues, b) a corrected minimal edit, c) score 0–10, d) whether publishable as-is. Output a JSON array with one object per ID.

# 4 — Input template (paste after the prompt; do not alter)

> ```
> ID: <any short unique id>
> Title: <title or "untitled">
> Language: <e.g., "Hindi (Devanagari)", "English (modern)", "Urdu-transliterated (Devanagari)", "Braj (Devanagari)">
> Form: <e.g., ghazal, nazm, free verse, short poem, prose, quote, ukti, essay>
> Intended audience: <e.g., "literary readers", "general public", "academic", "social media", "recital">
> Register/Tone: <e.g., colloquial, formal, devotional, lyrical, archaic>
> Strictness: <number 1–10: 1 = light copyedit, 10 = forensic, exhaustive critique>
> Text:
> <paste your text here, with line breaks exactly as intended>
> ```

# 5 — Exact output schema (what you should expect back)

Use this JSON blueprint to check the assistant’s compliance. You can ask the assistant to produce only this JSON.

```json
{
  "metadata": {
    "id": "<ID>",
    "title": "<Title>",
    "language": "<Language>",
    "form": "<Form>",
    "date_checked": "<YYYY-MM-DD>",
    "strictness": "<1-10>"
  },
  "summary": "One-paragraph evaluation (40-80 words).",
  "scores": {
    "technical_craft": 0-10,
    "language_diction": 0-10,
    "imagery_voice": 0-10,
    "impact": 0-10,
    "overall": 0-10
  },
  "issues": [
    {
      "type": "METER" | "RHYME" | "DICTION" | "SYNTAX" | "SEMANTICS" | "ORTHOGRAPHY" | "TRANSLITERATION" | "REGISTER" | "CULTURAL" | "METAPHOR" | "TYPO" | "OTHER",
      "severity": "minor" | "moderate" | "major" | "critical",
      "line_numbers": [1,2],
      "excerpt": "<exact excerpt>",
      "explanation": "Why this is an issue",
      "suggested_fix": "<exact suggested text or instruction>",
      "why_it_matters": "One-sentence rationale"
    }
  ],
  "line_by_line": [
    {
      "line": 1,
      "text": "<original line text>",
      "comment": "<specific note>",
      "suggested_edit": "<if any>"
    }
  ],
  "minimal_edits": "<full text with only minimal necessary edits applied>",
  "polished_rewrite": "<full revised text preserving meaning but improving craft> (optional)",
  "final_recommendations": [
    "One-sentence next action (e.g., review meter with a prosody specialist, change stanza order, test aloud)",
    "Publishing suitability (e.g., ready, needs light edits, needs heavy revision)"
  ],
  "notes": "<any limitations or suggestions for further testing>"
}
```

# 6 — Rubric for scoring (copyable)

* 9–10: professional-grade — publishable after very light copyediting
* 7–8: strong — needs a few targeted edits (lines, diction)
* 5–6: promising — structural or technical issues visible, needs substantial revision
* 3–4: weak — many technical and clarity issues; major rework suggested
* 0–2: draft — not ready, core problems with sense, language, or form

# 7 — Checklist of specific checks the assistant must perform (for you to confirm it ran)

* [ ] Script integrity: do not change Devanagari script or transliteration style
* [ ] Orthography and punctuation (Devanagari and English)
* [ ] Transcription/transliteration consistency (if any Latin used)
* [ ] Scansion attempt: mark stresses/syllable counts or explain why impossible
* [ ] Rhyme-scheme labeling and rhyme integrity check
* [ ] Meter violation detection and suggested corrections
* [ ] Figures of speech analysis (metaphor, simile, personification, synecdoche, etc.)
* [ ] Register/voice alignment check (does tone match intended audience)
* [ ] Lexical anachronism (e.g., medieval diction used inconsistently)
* [ ] Cultural/contextual clarity and sensitivity check
* [ ] Read-aloud / performance suitability note
* [ ] Concrete micro-edits + at least one polished rewrite suggestion

---

## Quick examples of how to use it

* Single poem check (strictness 9): paste master prompt + input template + your poem.
* Social media quote (strictness 4): use short quick prompt + paste quote.
* Bulk upload of 50 micro-poems: use batch prompt and prepare items labeled `ID: 001` etc.

---

If you want, I can now:

* convert the master prompt into a **one-click template** you can reuse, or
* run a **sample QA** on one of your actual poems right now — paste it using the input template and I’ll return the full JSON-style critique.
