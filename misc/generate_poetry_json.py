import os
import re
import json

EXTRACTED_DIR = r"e:\project\Words\extracted"
OUTPUT_FILE = r"e:\project\Words\writings.json"

# Detailed metadata map based on analysis of the files
# Includes: Type, Mood, Theme, Keywords/Tags, Context/Imaging
METADATA = {
    "b0_1": {
        "type": "Haiku-esque",
        "mood": "Ethereal, Soft",
        "theme": "Nature's Beauty",
        "tags": ["rainbow", "sky", "poet", "heart", "gold"],
        "imagery": "Golden flame, rainbow arc, poet's heart",
        "language": "English"
    },
    "b1_1": {
        "type": "Ghazal",
        "mood": "Longing, Hopeful, Romantic",
        "theme": "Love, Freedom, Aspiration",
        "tags": ["flight", "sky", "dreams", "love", "freedom", "journey"],
        "imagery": "Morning breeze, melting sun, soaring flight, cage, sky's magic",
        "language": "Hindi"
    },
    "b1_2": {
        "type": "Nazm",
        "mood": "Reflective, Resilient",
        "theme": "Self-Worth, Life's Trials",
        "tags": ["life", "exams", "self-respect", "destiny"],
        "imagery": "Moments of testing, beauty of character",
        "language": "Hindi"
    },
    "b1_3": {
        "type": "Philosophical Thought",
        "mood": "Contemplative, Mystical",
        "theme": "Time, Causality, Reality",
        "tags": ["time", "causality", "future", "past", "reality loops"],
        "imagery": "Shadows of past, loops of self-reference",
        "language": "English"
    },
    "b1_4": {
        "type": "Aphorism",
        "mood": "Determined, Serious",
        "theme": "Ambition, Willpower",
        "tags": ["will", "success", "life goals", "totality"],
        "imagery": "Earning the totality",
        "language": "English"
    },
    "b1_5": {
        "type": "Aphorism",
        "mood": "Philosophical, Contrasting",
        "theme": "Duality of Life",
        "tags": ["vicissitude", "perpetuity", "beauty", "abhorrence"],
        "imagery": "Vicissitude vs Perpetuity",
        "language": "English"
    },
    "b1_6": {
        "type": "Quote",
        "mood": "Witty, Realist",
        "theme": "Expectations",
        "tags": ["expectations", "exceptions", "wordplay"],
        "imagery": "None",
        "language": "English"
    },
    "b1_7": {
        "type": "Nazm",
        "mood": "Melancholic, Bargaining",
        "theme": "Memory, Letting Go, Love",
        "tags": ["memories", "forgetting", "love", "complaint", "confession"],
        "imagery": "Weakening memories, erasing memories, confessing love",
        "language": "Hindi"
    },
    "b2_1": {
        "type": "Sher",
        "mood": "Fatalistic, Ironical",
        "theme": "Time, Destiny",
        "tags": ["time", "fate", "meeting"],
        "imagery": "Time meeting time",
        "language": "Hindi"
    },
    "b2_2": {
        "type": "Poem (Archaic Style)",
        "mood": "Confused, Searching",
        "theme": "Misunderstanding, Communication",
        "tags": ["mind", "eyes", "words", "perception", "archaic"],
        "imagery": "Seeing in eyes vs mind",
        "language": "English"
    },
    "b2_3": {
        "type": "Nazm",
        "mood": "Lonely, Dark, Romantic",
        "theme": "Night, Longing, Separation",
        "tags": ["night", "fireflies", "moth", "stars", "moon", "ishq"],
        "imagery": "Waiting nights, missing fireflies, moth and flame, journey to stars",
        "language": "Hindi"
    },
    "b2_4": {
        "type": "Quote",
        "mood": "Resolute",
        "theme": "Expression",
        "tags": ["understanding", "expression", "communication"],
        "imagery": "None",
        "language": "English"
    },
    "b2_5": {
        "type": "Aphorism",
        "mood": "Analytical",
        "theme": "Love vs Hate",
        "tags": ["love", "hate", "aeonian", "stygian", "philophile"],
        "imagery": "Idyllic aeonian vs antagonistic stygian",
        "language": "English"
    },
    "b2_6": {
        "type": "Haiku-esque",
        "mood": "Patient, Calm",
        "theme": "Patience, Conversation",
        "tags": ["moments", "time", "conversation", "waiting"],
        "imagery": "Passing moments",
        "language": "Hindi"
    },
    "b2_7": {
        "type": "Poem",
        "mood": "Reassuring, Intuitive",
        "theme": "Intuition, Feelings",
        "tags": ["sensing", "feelings", "acceptance", "intuition"],
        "imagery": "Indeterminate sensing",
        "language": "English"
    },
    "b2_8": {
        "type": "Quote",
        "mood": "Observational",
        "theme": "Atmosphere vs Facts",
        "tags": ["vibe", "ambience", "truth", "tale"],
        "imagery": "Ambience telling the vibe",
        "language": "English"
    },
    "b2_9": {
        "type": "Wordplay Poem",
        "mood": "Logical, Playful",
        "theme": "Possibility vs Impossibility",
        "tags": ["logic", "paradox", "harmonic", "problamatic"],
        "imagery": "None",
        "language": "English"
    },
    "b3_1": {
        "type": "Philosophical Thought",
        "mood": "Surreal, Scientific",
        "theme": "Dreams, Quantum Reality",
        "tags": ["dreams", "quantum", "reality", "strings", "nightmares"],
        "imagery": "Strings of possibility vibrating",
        "language": "English"
    },
    "b3_2": {
        "type": "Thought",
        "mood": "Reflective, Social",
        "theme": "Change, Social Masks",
        "tags": ["change", "people", "behavior", "benevolence"],
        "imagery": "None",
        "language": "English"
    },
    "b3_3": {
        "type": "Sher",
        "mood": "Nostalgic, Complete",
        "theme": "Memories, Night",
        "tags": ["lost", "path", "memories", "moonlit night", "stories"],
        "imagery": "Moonlit night (Shab-e-Mahtabi)",
        "language": "Hindi"
    },
    "b3_4": {
        "type": "Aphorism",
        "mood": "Analytical",
        "theme": "Semantics, Logic",
        "tags": ["some", "any", "no", "every", "qualms"],
        "imagery": "Forging qualms",
        "language": "English"
    },
    "b3_5": {
        "type": "Definition",
        "mood": "Aesthetic",
        "theme": "Golden Ratio, Beauty",
        "tags": ["phi", "beauty", "allure", "math"],
        "imagery": "Ballad of allure",
        "language": "English"
    },
    "b3_6": {
        "type": "Haiku",
        "mood": "Serene, Visual",
        "theme": "Nature, Sunset",
        "tags": ["sunset", "birds", "beauty", "evening"],
        "imagery": "Sunset's palette, birds' ballet",
        "language": "English"
    },
    "b3_7": {
        "type": "Haiku",
        "mood": "Lonely, Atmospheric",
        "theme": "Night, Companionship",
        "tags": ["night", "clouds", "wind", "moon"],
        "imagery": "Ragged clouds, wind, moon",
        "language": "English"
    },
    "b3_8": {
        "type": "Quote",
        "mood": "Reflective",
        "theme": "Time, Consistency",
        "tags": ["new year", "memories", "moments", "connate"],
        "imagery": "None",
        "language": "English"
    },
    "b4_1": {"type": "Sher", "mood": "Nostalgic", "theme": "Memories", "tags": ["memories", "night"], "language": "Hindi"}, # Duplicate of b3_3 logic, handling if file has dupe content
    "b4_2": {"type": "Quote", "mood": "Analytical", "theme": "Logic", "tags": ["logic", "words"], "language": "English"}, # Dupe b3_4
    "b4_3": {"type": "Definition", "mood": "Aesthetic", "theme": "Beauty", "tags": ["phi", "beauty"], "language": "English"}, # Dupe b3_5
    "b4_4": {"type": "Haiku", "mood": "Visual", "theme": "Nature", "tags": ["sunset"], "language": "English"}, # Dupe b3_6
    "b4_5": {
        "type": "Quote",
        "mood": "Accepting",
        "theme": "Life, Change",
        "tags": ["cest la vie", "change", "years"],
        "imagery": "None",
        "language": "English"
    },
    "b4_6": {
        "type": "Thought",
        "mood": "Contemplative",
        "theme": "Fate vs Coincidence",
        "tags": ["fate", "destiny", "coincidence", "takdeer"],
        "imagery": "None",
        "language": "Hindi"
    },
    "b4_7": {
        "type": "Ghazal",
        "mood": "Romantic, Dreamy",
        "theme": "Night, Moon, Memory",
        "tags": ["night", "moon", "stars", "memories", "music"],
        "imagery": "Moonlit night, stars meeting poetry, melody of memories, mirage of love",
        "language": "Hindi"
    },
    "b4_8": {
        "type": "Quote",
        "mood": "Philosophical",
        "theme": "Life, Infinity",
        "tags": ["infinity", "life", "exaggeration"],
        "imagery": "None",
        "language": "English"
    },
    "b5_1": {
        "type": "Devotional Dohas",
        "mood": "Devotional, Surrender",
        "theme": "Radha-Krishna, Love",
        "tags": ["radha", "krishna", "flute", "devotion", "surrender"],
        "imagery": "Flute's magic, closing eyes, shoulder support",
        "language": "Hindi"
    },
    "b5_2": {
        "type": "Poem",
        "mood": "Inquisitive",
        "theme": "Connection, Destiny",
        "tags": ["nexus", "entanglement", "chance", "destiny"],
        "imagery": "Nexus, entanglement",
        "language": "English"
    },
    "b5_3": { "type": "Poem", "mood": "Inquisitive", "theme": "Connection", "tags": ["nexus"], "language": "English" }, # Likely dupe of b5_2
    "b5_4": {
        "type": "Devotional Dohas",
        "mood": "Devotional, Divine Love",
        "theme": "Shiva-Parvati, Asceticism",
        "tags": ["shiva", "parvati", "gauri", "love", "ascetic"],
        "imagery": "Shiva becoming loving, Parvati losing senses",
        "language": "Hindi"
    },
    "b5_5": {
        "type": "Poem",
        "mood": "Melancholic, Deep",
        "theme": "Monochrome, Depth",
        "tags": ["monochrome", "colors", "existence", "intimacy"],
        "imagery": "World bereft of hues, weaving subtleties of monochrome",
        "language": "English"
    },
    "b5_6": {
        "type": "Ghazal",
        "mood": "Passionate, Bold",
        "theme": "Transgression (Gustakhiyan), Love",
        "tags": ["eyes", "gustakhiyan", "audacity", "love", "battle"],
        "imagery": "Eyes talking, stealing sleep, sudden rain, silent battles of heart",
        "language": "Hindi"
    },
    "b5_7": {
        "type": "Ghazal",
        "mood": "Inexpressible, Silent",
        "theme": "Silence, Unspoken Love",
        "tags": ["silence", "expression", "words", "feeling"],
        "imagery": "Silence hiding a world of love, hollow words, soul connection",
        "language": "Hindi"
    },
    "b6_1": {
        "type": "Nazm",
        "mood": "Admiring, Grateful",
        "theme": "Beauty, First Meeting",
        "tags": ["beauty", "sahir", "magic", "gratitude", "heart"],
        "imagery": "Magician of heart, touching the soul",
        "language": "Hindi"
    },
    "b6_2": {
        "type": "Poem",
        "mood": "Wistful, Ironical",
        "theme": "Moon, Crush, Distance",
        "tags": ["moon", "crush", "loop", "irony"],
        "imagery": "Phasing into loop",
        "language": "English"
    },
    "b6_3": {
        "type": "Quote",
        "mood": "Accepting",
        "theme": "Imperfection, Beauty",
        "tags": ["moon", "incomplete", "beauty"],
        "imagery": "Incomplete moon",
        "language": "English"
    },
    "b6_4": {
        "type": "Haiku",
        "mood": "Visual, serene",
        "theme": "Golden Hour",
        "tags": ["golden hour", "dusk", "silhouette", "elegance"],
        "imagery": "Golden hour silhouettes",
        "language": "English"
    },
    "b6_5": {
        "type": "Quote",
        "mood": "Mysterious",
        "theme": "Moon, Face, Mystery",
        "tags": ["moon", "face", "unseen"],
        "imagery": "Moon phrasing her face",
        "language": "English"
    },
    "b6_6": {
        "type": "Sher",
        "mood": "Melancholic, Healing",
        "theme": "Tears, Memories, Fate",
        "tags": ["tears", "memories", "rain", "fate"],
        "imagery": "Washing away moments, earning tears back",
        "language": "Hindi"
    },
    "b6_7": {
        "type": "Sher",
        "mood": "Philosophical, Resigned",
        "theme": "Journey, Destiny, Incompleteness",
        "tags": ["search", "incomplete", "destiny", "shore"],
        "imagery": "Boats without shores, continual search",
        "language": "Hindi"
    },
    "b6_8": {
        "type": "Prose Poetry",
        "mood": "Atmospheric, Warm",
        "theme": "Dusk, Anticipation",
        "tags": ["dusk", "honeyed hues", "light", "promise"],
        "imagery": "Honeyed hues, pinpricks of light",
        "language": "English"
    },
    "b7_1": {
        "type": "Ghazal-style Poem",
        "mood": "Procrastinating, Pondering",
        "theme": "Love, Time, Hesitation",
        "tags": ["pondering", "time", "love", "questions"],
        "imagery": "City claims acquaintance, weather, fragrance",
        "language": "English"
    },
    "b7_2": {
        "type": "Poem (Archaic)",
        "mood": "Gothic, Romantic",
        "theme": "Night, Silence, Connection",
        "tags": ["night", "silence", "lake", "moon", "bond"],
        "imagery": "Lake's cold tide, quiet tempest, moon guarding truths",
        "language": "English"
    },
    "b7_3": {
        "type": "Poem",
        "mood": "Romantic",
        "theme": "Moon, Love Stories",
        "tags": ["moon", "love", "fiction", "phases"],
        "imagery": "Love settled in moon",
        "language": "English"
    },
    "b7_4": {
        "type": "Aphorism",
        "mood": "Skeptical",
        "theme": "Perception vs Reality",
        "tags": ["illusion", "reality", "sight"],
        "imagery": "None",
        "language": "English"
    },
    "b7_5": {
        "type": "Quote",
        "mood": "Conflicted",
        "theme": "Imperfection, Right/Wrong",
        "tags": ["perfect", "wrong", "right", "paradox"],
        "imagery": "None",
        "language": "English"
    },
    "b7_6": {
        "type": "Quote",
        "mood": "Warning",
        "theme": "Karma, Time",
        "tags": ["karma", "time", "regret"],
        "imagery": "Time repeating itself",
        "language": "English"
    },
    "b7_7": {
        "type": "Quote",
        "mood": "Peaceful",
        "theme": "Night, Peace",
        "tags": ["night", "moon", "stars", "tranquility"],
        "imagery": "Gazing moon and stars",
        "language": "English"
    },
    "b7_8": {
        "type": "Sher",
        "mood": "Philosophical, Bitter",
        "theme": "Loyalty (Wafa)",
        "tags": ["loyalty", "betrayal", "character"],
        "imagery": "Wafa as nature/upbringing",
        "language": "Hindi"
    },
    "b8_1": {
        "type": "Quote",
        "mood": "Free-spirited",
        "theme": "Reasoning, Spontaneity",
        "tags": ["reason", "unconditional"],
        "imagery": "None",
        "language": "English"
    },
    "b8_2": {
        "type": "Poem",
        "mood": "Stoic",
        "theme": "Adversity, Growth",
        "tags": ["gravity", "adversity", "zest", "growth"],
        "imagery": "Gravitic adversity",
        "language": "English"
    },
    "b8_3": {
        "type": "Caption",
        "mood": "Casual",
        "theme": "Vibe",
        "tags": ["ambience", "vibe", "search"],
        "imagery": "None",
        "language": "English"
    },
    "b8_4": {
        "type": "Ghazal",
        "mood": "Mystical, Waiting",
        "theme": "Night, Moon, Stars, Mystery",
        "tags": ["moon", "stars", "sky", "mystery", "waiting"],
        "imagery": "Silent moon, tangled stars, sky's blanket, hidden stories",
        "language": "Hindi"
    },
    "b8_5": {
        "type": "Poem",
        "mood": "Romantic, Dreamy",
        "theme": "Night, Beauty, Passion",
        "tags": ["night", "beauty", "passion", "elysian"],
        "imagery": "Idyllically elysian realm",
        "language": "English"
    },
    "b8_6": {
        "type": "Quote",
        "mood": "Uplifting",
        "theme": "Love",
        "tags": ["love", "clouds", "flight"],
        "imagery": "Clouds of love",
        "language": "English"
    },
    "b8_7": {
        "type": "Quote",
        "mood": "Reflective",
        "theme": "Self-growth",
        "tags": ["rhythm", "character", "life chapters"],
        "imagery": "Reciting rhythm's variances",
        "language": "English"
    },
    "b8_8": {
        "type": "Fragment",
        "mood": "Silent",
        "theme": "Unspoken",
        "tags": ["heart", "silence", "lips"],
        "imagery": "None",
        "language": "English"
    },
    "b9_1": {
        "type": "Nazm",
        "mood": "Somber, Atmospheric",
        "theme": "Evening, Solitude",
        "tags": ["evening", "shadows", "birds", "dreams"],
        "imagery": "Dark evening sky, dense clouds, birds whispering",
        "language": "Hindi"
    },
    "b9_2": {
        "type": "Quote",
        "mood": "Romantic",
        "theme": "Twilight, Love",
        "tags": ["twilight", "love", "beauty"],
        "imagery": "Sky weaving secrets",
        "language": "English"
    },
    "b9_3": {
        "type": "Poem",
        "mood": "Passionate",
        "theme": "Life, Love",
        "tags": ["life", "love", "fervour", "avidity"],
        "imagery": "Jubilant sway",
        "language": "English"
    },
    "b9_4": {
        "type": "Quote",
        "mood": "Critical",
        "theme": "Beauty vs Charisma",
        "tags": ["moon", "beauty", "jamaal"],
        "imagery": "None",
        "language": "Hinglish"
    },
    "b9_5": {
        "type": "Nazm",
        "mood": "Romantic, Praising",
        "theme": "Moon, Beauty, Personification",
        "tags": ["moon", "simplicity", "beauty", "envy"],
        "imagery": "Moon surprised by your simplicity, moon craving your light",
        "language": "Hindi"
    },
    "b9_6": {
        "type": "Poem",
        "mood": "Melancholic, Mathematical",
        "theme": "Asymptotic Love, Separation",
        "tags": ["math", "curves", "chaos", "separation", "threads"],
        "imagery": "Unfinished curve, knots, taut strings, infinite almost",
        "language": "English"
    },
    "b9_7": {
        "type": "Poem",
        "mood": "Quiet, Solitary",
        "theme": "Night, Nature",
        "tags": ["night", "birds", "sunset", "solitude"],
        "imagery": "Painters of the sky, echo in heart",
        "language": "Hindi"
    },
    "b9_8": {
        "type": "Couplet",
        "mood": "Cynical",
        "theme": "betrayal, Trust",
        "tags": ["lies", "trust", "agony"],
        "imagery": "None",
        "language": "English"
    },
    "b10_1": {
        "type": "Poem",
        "mood": "Wishful, Idealistic",
        "theme": "Destiny, What-If",
        "tags": ["destiny", "stars", "love", "dreams"],
        "imagery": "World unbroken, stars weaving dreams, velvet sky",
        "language": "English"
    },
    "b10_2": {
        "type": "Sher",
        "mood": "Longing, Devotional",
        "theme": "Desire, Life",
        "tags": ["ulfat", "company", "life test", "closeness"],
        "imagery": "Life's test for closeness",
        "language": "Hindi"
    },
    "b10_3": {
        "type": "Poem",
        "mood": "Cosmic, Romantic",
        "theme": "Stars, Cosmic Love",
        "tags": ["stars", "cosmos", "waltz", "love"],
        "imagery": "Cosmic waltz, blooming dreams",
        "language": "English"
    },
    "b10_4": {
        "type": "Quote",
        "mood": "Soft, Sweet",
        "theme": "Love",
        "tags": ["clouds", "cotton candy", "love"],
        "imagery": "Cotton candy clouds",
        "language": "English"
    },
    "b10_5": {
        "type": "Nazm",
        "mood": "Mysterious, Romantic",
        "theme": "Night, Moon, Secrets",
        "tags": ["moon", "night", "fragrance", "secrets"],
        "imagery": "scented wind in darkness, journey of dreams with moon",
        "language": "Hindi"
    },
    "b10_6": {
        "type": "Quote",
        "mood": "Adventurous",
        "theme": "Horizon, Magic",
        "tags": ["sunset", "horizon", "cosmic"],
        "imagery": "Cosmic magic of horizon",
        "language": "English"
    },
    "b10_7": {
        "type": "Quote",
        "mood": "Realist",
        "theme": "Dreams vs Life",
        "tags": ["dreams", "life", "destiny", "hardship"],
        "imagery": "None",
        "language": "Hindi"
    },
    "b10_8": {
        "type": "Aphorism",
        "mood": "Logical",
        "theme": "Physics/Philosophy",
        "tags": ["relativity", "reality"],
        "imagery": "None",
        "language": "English"
    },
    "b11_1": {
        "type": "Couplet",
        "mood": "Peaceful",
        "theme": "Twilight, Peace",
        "tags": ["twilight", "calm", "life"],
        "imagery": "Twilight's gentle veil",
        "language": "English"
    },
    "b11_2": {
        "type": "Quote",
        "mood": "Wisdom",
        "theme": "Reflection",
        "tags": ["past", "future", "reflection"],
        "imagery": "Hidden paths forward",
        "language": "English"
    },
    "b11_3": {
        "type": "Quote",
        "mood": "Romantic",
        "theme": "Love, Moon",
        "tags": ["love", "moon", "elixir"],
        "imagery": "Love's elixir flowing",
        "language": "English"
    },
    "b11_4": {
        "type": "Ghazal",
        "mood": "Tragic, Heartbroken",
        "theme": "Loss, Unrequited Love, Fate",
        "tags": ["falling star", "fate", "defeat", "loneliness", "shore"],
        "imagery": "Broken star, burning planet, ocean without shore",
        "language": "Hindi"
    },
    "b11_5": {
        "type": "Quote",
        "mood": "Spiritual, Honest",
        "theme": "Soul vs Heart",
        "tags": ["heart", "soul", "deceit", "spirituality"],
        "imagery": "None",
        "language": "Hindi"
    },
    "b11_6": {
        "type": "Poem",
        "mood": "Romantic, Magical",
        "theme": "Starry Night, Love",
        "tags": ["aurora", "clouds", "sky", "promise"],
        "imagery": "Aurora-lit clouds painting love",
        "language": "English"
    },
    "b11_7": {
        "type": "Ghazal",
        "mood": "Melancholic, Atmospheric",
        "theme": "Evening, Moon, Loss",
        "tags": ["moon", "clouds", "evening", "silence", "sand", "river"],
        "imagery": "Moon drowned in clouds, boats of hope washing away like sand, silent wish",
        "language": "Hindi"
    },
    "b11_8": {
        "type": "Epic/Philosophical Poem",
        "mood": "Grand, Metaphysical",
        "theme": "Time Travel, Destiny, Nexus",
        "tags": ["nexus", "canon", "time travel", "destiny", "writing"],
        "imagery": "Threads of will, archives of memory, anchor of universe wrecking, poem upon bones of time",
        "language": "English"
    },
    "b12_1": {
        "type": "Nazm",
        "mood": "Ironical, Reflective",
        "theme": "Silence, Pain, Writing",
        "tags": ["silence", "pain", "writing", "stories"],
        "imagery": "Irony of life desires",
        "language": "Hindi"
    },
    "b12_2": {
        "type": "Poem",
        "mood": "Accepting, Gratified",
        "theme": "Passion, Fate",
        "tags": ["passion", "spite", "fate", "fondness"],
        "imagery": "None",
        "language": "English"
    },
    "b12_3": {
        "type": "Poem",
        "mood": "Nostalgic, Dreamy",
        "theme": "Past Moments, Memories",
        "tags": ["past", "dreams", "night", "hope"],
        "imagery": "Dreams wrapped in wishes",
        "language": "Hindi"
    },
    "b12_4": {
        "type": "Sher",
        "mood": "Romantic, Devoted",
        "theme": "Beauty, Obsession",
        "tags": ["beauty", "madness", "shade", "destiny"],
        "imagery": "Home in your shadow",
        "language": "Hindi"
    },
    "b12_5": {
        "type": "Sher",
        "mood": "Secretive, Romantic",
        "theme": "Moon, Secret",
        "tags": ["moon", "eyes", "story", "hiding"],
        "imagery": "Image narrated to moon",
        "language": "Hindi"
    },
    "b12_6": {
        "type": "Quote",
        "mood": "Connected",
        "theme": "Shared Feeling",
        "tags": ["moon", "craving", "carving"],
        "imagery": "Carving moon",
        "language": "English"
    },
    "b12_7": {
        "type": "Haiku",
        "mood": "Serene",
        "theme": "Night, Moon",
        "tags": ["night", "crescent", "symphony"],
        "imagery": "Night's aura, crescent",
        "language": "English"
    },
    "b12_8": {
        "type": "Advice",
        "mood": "Practical, Emotional",
        "theme": "Love, Tears",
        "tags": ["tears", "appreciation", "love"],
        "imagery": "Love reflecting in tears",
        "language": "English"
    },
    "b13_1": {
        "type": "Ballad",
        "mood": "Tragic, Storytelling",
        "theme": "Lost Love, Separation",
        "tags": ["king", "queen", "story", "separation", "memories"],
        "imagery": "World decorated with love colors, rainy words in hearts, fading morning rays",
        "language": "Hindi"
    },
    "b14_1": {
        "type": "Romantic Ballad",
        "mood": "Passionate, Adoring",
        "theme": "Love, Nature, Beauty",
        "tags": ["nature", "hazel eyes", "scent", "universe", "star"],
        "imagery": "Silver watch of stars, hazelnut mocha hair, citrus pheromones, ocean vast",
        "language": "English"
    },
    "b15_1": {
        "type": "Poem",
        "mood": "Contemplative, Awestruck",
        "theme": "Moon, Existence",
        "tags": ["moon", "audacity", "cosmic", "life"],
        "imagery": "Ghostly silver gleam, cosmic stuff",
        "language": "English"
    },
    "b16_1": {
        "type": "Nazm (Ode)",
        "mood": "Worshipping, Romantic",
        "theme": "You are Everything",
        "tags": ["praise", "life", "love", "light", "nature"],
        "imagery": "First glimpse like new day, shelter of hair, moonlight in depth of night, boat of dreams",
        "language": "Hindi"
    }

}

parsed_writings = []

# Regex patterns
image_header_pattern = re.compile(r"\*\*Image\s+(\d+)\*\*")
attribution_pattern = re.compile(r"^\s*[~-]\s*(.*)$")
separator_pattern = re.compile(r"\*\*\*")

files = sorted([f for f in os.listdir(EXTRACTED_DIR) if f.endswith(".md") and f.startswith("b")])

def sort_key(f):
    try:
        return int(f[1:-3])
    except:
        return 0

files.sort(key=sort_key)

global_id = 1  # Start numeric ID from 1

for filename in files:
    filepath = os.path.join(EXTRACTED_DIR, filename)
    base_id = filename.replace(".md", "") # e.g. b1
    
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Split by separator
    chunks = separator_pattern.split(content)
    
    item_index = 0
    
    for chunk in chunks:
        chunk = chunk.strip()
        if not chunk:
            continue
            
        # Helper to clean content
        preamble_pattern = re.compile(r"Here is the text extracted.*?from the images exactly as it appears:\s*", re.DOTALL | re.IGNORECASE)
        timestamp_pattern = re.compile(r"\b\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?\b")

        # Initial cleanup of the whole chunk
        clean_text = preamble_pattern.sub("", chunk).strip()
        clean_text = timestamp_pattern.sub("", clean_text).strip()
        
        # Check for Image header
        header_match = image_header_pattern.search(clean_text)
        if header_match:
             clean_text = image_header_pattern.sub("", clean_text).strip()
             idx_str = header_match.group(1)
             item_index += 1
             unique_str_id = f"{base_id}_{item_index}"
        else:
            # No header, just text
            # Double check for Preamble if it wasn't caught (e.g. inside the chunk logic deeper)
            # But the global replace above should handle it.
            
            item_index += 1
            unique_str_id = f"{base_id}_{item_index}"
            
        # Extract attribution
        lines = clean_text.split('\n')
        attribution = None
        text_lines = []
        
        # Process lines to find attribution at bottom
        for line in lines:
            attr_match = attribution_pattern.match(line)
            if attr_match:
                attribution = line.strip() 
            else:
                text_lines.append(line)
        
        final_content = "\n".join(text_lines).strip()
        
        if not final_content:
            continue

        # Look up metadata
        info = METADATA.get(unique_str_id, {})
        
        # Fallback if I missed one in the map
        if not info:
            # Generic fallback
            info = {
                "type": "Unknown",
                "mood": "Unknown", 
                "tags": [],
                "language": "Hindi" if any(ord(c) > 128 for c in final_content[:100]) else "English" 
            }

        entry = {
            "id": global_id,
            "content": final_content,
            **info # Spread the metadata
        }
        
        parsed_writings.append(entry)
        global_id += 1

# Write to JSON
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(parsed_writings, f, indent=2, ensure_ascii=False)

print(f"Successfully generated {OUTPUT_FILE} with {len(parsed_writings)} items.")
