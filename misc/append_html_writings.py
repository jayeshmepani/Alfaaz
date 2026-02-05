import json
import os

JSON_FILE = r"e:\project\Words\writings.json"

# Data extracted from the previous version of index.html (Step 168)
new_entries = [
    {
        "id": "html_placeholder_1",
        "content": "रात की तन्हाई में जब चाँद निकलता है,\nतुम्हारी याद का एक दरिया सा बहता है।\n\nये दिल के टुकड़े, ये बिखरी हुई यादें,\nइन्हीं से अब तो मेरा ये जहाँ चलता है।",
        "type": "Ghazal",
        "mood": "Melancholic, Romantic",
        "theme": "Memory, Love, Night",
        "tags": ["night", "moon", "memories", "longing"],
        "imagery": "River of memories, moonlit night",
        "language": "Hindi"
    },
    {
        "id": "html_placeholder_2",
        "content": "Between the fading light and rising stars,\nlies a moment that belongs to us alone.\nWhere silence speaks louder than words,\nand hearts find their way back home.\n\nThe evening hums a lullaby so sweet,\nas shadows dance upon the wall.",
        "type": "Poem",
        "mood": "Peaceful, Romantic",
        "theme": "Twilight, Intimacy, Home",
        "tags": ["twilight", "silence", "home", "shadows"],
        "imagery": "Fading light, dancing shadows, evening lullaby",
        "language": "English"
    },
    {
        "id": "html_placeholder_3",
        "content": "कुछ लम्हे ऐसे होते हैं,\nजो शब्दों में नहीं ढलते।\nबस दिल में ही रह जाते हैं,\nऔर खामोशी में पलते।",
        "type": "Quote",
        "mood": "Reflective, Quiet",
        "theme": "Silence, Ineffable Feelings",
        "tags": ["moments", "silence", "feelings"],
        "imagery": "Moments growing in silence",
        "language": "Hindi"
    },
    {
        "id": "html_placeholder_4",
        "content": "I wrote you letters that never left my drawer,\nwords that trembled on the edge of being said.\nEach page a garden of unspoken truths,\nblooming in the silence of my head.",
        "type": "Poem",
        "mood": "Longing, Melancholic",
        "theme": "Unspoken Love, Regret",
        "tags": ["letters", "unspoken", "silence", "truth"],
        "imagery": "Letters in drawer, garden of unspoken truths",
        "language": "English"
    },
    {
        "id": "html_placeholder_5",
        "content": "मंदिर की घंटी, मस्जिद की अज़ान,\nसब में एक ही सच है छुपा।\nप्रेम का वो अनंत सागर,\nजो हर दिल में बसा।",
        "type": "Devotional",
        "mood": "Spiritual, Inclusive",
        "theme": "Unity, Divine Love",
        "tags": ["temple", "mosque", "truth", "love", "divine"],
        "imagery": "Ocean of love, bells and azaan",
        "language": "Hindi"
    },
    {
        "id": "html_placeholder_6",
        "content": "The rain arrived at dawn today,\ngentle as a forgotten song.\nIt washed the world in silver light,\nmaking everything feel less wrong.",
        "type": "Poem",
        "mood": "Refreshing, Hopeful",
        "theme": "Nature, Healing, Rain",
        "tags": ["rain", "dawn", "healing", "silver light"],
        "imagery": "Silver light, gentle rain",
        "language": "English"
    },
    {
        "id": "html_placeholder_7",
        "content": "आज की रात कुछ अलग है,\nचाँद भी मद्धम सा है।\nदिल में कोई गीत अधूरा,\nऔर आँखों में सफ़र का नाम।\n\nबीती रातों की यादें हैं,\nजो अब भी ताज़ा हैं।\nये अल्फ़ाज़ उन्हीं की परछाइयाँ,\nजो दिल में बस गई हैं।",
        "type": "Nazm",
        "mood": "Atmospheric, Nostalgic",
        "theme": "Night, Journey, Memory",
        "tags": ["night", "moon", "song", "journey", "shadows"],
        "imagery": "Dim moon, unfinished song, shadows of words",
        "language": "Hindi"
    },
    {
        "id": "html_placeholder_8",
        "content": "वक़्त की गर्द में दबी कहानियाँ,\nजो कभी किसी ने न सुनीं...",
        "type": "Ghazal",
        "mood": "Nostalgic, Forgotten",
        "theme": "Time, Lost Stories",
        "tags": ["time", "dust", "stories"],
        "imagery": "Stories buried in dust of time",
        "language": "Hindi"
    },
    {
        "id": "html_placeholder_9",
        "content": "Old photographs yellow with time,\nbut memories stay vivid and true...",
        "type": "Poem",
        "mood": "Nostalgic",
        "theme": "Memory, Time",
        "tags": ["photographs", "memories", "time"],
        "imagery": "Yellowed photographs",
        "language": "English"
    },
    {
        "id": "html_placeholder_10",
        "content": "जीवन का हर पल समर्पित,\nउस अनंत को जो सब में बसा...",
        "type": "Devotional",
        "mood": "Surrender",
        "theme": "Faith, Dedication",
        "tags": ["life", "surrender", "infinite"],
        "imagery": "None",
        "language": "Hindi"
    },
    {
        "id": "html_placeholder_11",
        "content": "The mountains stand in silent guard,\nkeeping secrets of a thousand years...",
        "type": "Poem",
        "mood": "Stoic, Majestic",
        "theme": "Nature, Endurance",
        "tags": ["mountains", "secrets", "time"],
        "imagery": "Mountains as silent guards",
        "language": "English"
    },
    {
        "id": "html_placeholder_12",
        "content": "वो गलियाँ अब भी याद हैं,\nजहाँ खेलते थे बेफ़िक्र...",
        "type": "Nazm",
        "mood": "Nostalgic",
        "theme": "Childhood, Hometown",
        "tags": ["childhood", "streets", "carefree"],
        "imagery": "Childhood streets",
        "language": "Hindi"
    },
    {
        "id": "html_placeholder_13",
        "content": "Beneath the city's neon glow,\na thousand stories unfold each night...",
        "type": "Poem",
        "mood": "Urban, Observational",
        "theme": "City Life, Stories",
        "tags": ["city", "neon", "stories"],
        "imagery": "Neon glow",
        "language": "English"
    },
    {
        "id": "html_hero_quote",
        "content": "शब्दों में ढली वो खामोशियाँ,\nजो दिल में बसी थीं सालों से।\nये अल्फ़ाज़ मेरे, ये जज़्बात मेरे,\nजो बुने हैं रातों की तन्हाइयों से।",
        "type": "Sher",
        "mood": "Soulful, Intro",
        "theme": "Words, Emotions, Silence",
        "tags": ["intro", "words", "silence", "emotions"],
        "imagery": "Words molded from silence, woven from night's solitude",
        "language": "Hindi"
    }
]

def append_writings():
    if not os.path.exists(JSON_FILE):
        print("JSON file not found.")
        return

    with open(JSON_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Check for duplicates by content to avoid re-adding
    existing_contents = {item['content'].strip() for item in data}
    
    added_count = 0
    for entry in new_entries:
        if entry['content'].strip() not in existing_contents:
            data.append(entry)
            existing_contents.add(entry['content'].strip())
            added_count += 1
    
    with open(JSON_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully appended {added_count} new items from HTML placeholders.")

if __name__ == "__main__":
    append_writings()
