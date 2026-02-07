
import json
import os

INPUT_FILE = r"e:\project\Words\writings.json"
OUTPUT_FILE = r"e:\project\Words\writings_corrected.json"

# Corrections Dictionary mapped by ID
# Based on analysis_report.md "Minimal Corrected Versions"
CORRECTIONS = {
    1: "One is what one thinks;\nThinking is what one's thoughts are;\nOne is what one's thoughts are.",
    2: "In the depth of the ocean,\nI found a drop;\nIn the depth of the drop,\nI found an ocean.",
    3: "Life is a journey,\nMake it worth the ride.", 
    4: "The heart that beats for you,\nIs the heart that beats in you.",
    5: "One should live with the will to earn the totality; only subsequently will one be able to achieve what one's life is set on.",
    6: "The most beautiful things happen in the vicissitudes of life;\nthe most abhorrent things happen in the perpetuity of life.",
    7: "I have had expectations with exceptions.",
    8: "..Seldom,\nIn admiration of them..;\nWhat thou hast in thy mind,\nI see not in thine eyes;\nWhat thou sayest,\nI see not in thy mind..",
    9: "रातें तकती हैं कोई रास्ता...\nजुगनू दिखते नहीं हैं अब...\nइश्क़ भी लुटने लगे चाँद के ऐतबार में,\nअफ़साने भी बयाँ होने लगे।",
    10: "Though it is hard to be understood,\nyet one must express.",
    11: "The most idyllic eternity is with love;\nthe most antagonistic hell is with hate;\nSo be loving and guard against hate.",
    12: "कुछ लम्हे गुज़रने दो\nवक़्त न हो तो इंतज़ार ही सही\nकुछ गुफ़्तगू हैरत-अंगेज़ होने दो",
    13: "You don't know what you're sensing,\nbut whatever this feeling is,\nit’s right...\nYou aren't saying\nwhat you're sensing;\nso whatever you feel,\nunconditionally please accept!",
    14: "The tale might be wrong,\nbut the ambience tells the truth.",
    15: "If it's possible then it's relativistic\nIf it's relativistic then it's realistic\nIf it's realistic then it's materialistic\nIf it's materialistic then it's naturalistic\nIf it's naturalistic then it's problematic\nIf it's problematic then it's idealistic\nIf it's idealistic then it's fantastic\nIf it's fantastic then it's enthusiastic\nIf it's enthusiastic then it's optimistic\nIf it's optimistic then it's energetic\nIf it's energetic then it's electric\nIf it's electric then it's magnetic\nIf it's magnetic then it's charismatic\nIf it's charismatic then it's diplomatic\nIf it's diplomatic then it's democratic\nIf it's democratic then it's republic\nIf it's republic then it's public\nIf it's public then it's specific\nIf it's specific then it's oceanic\nIf it's oceanic then it's pacific\nIf it's pacific/specific then it's terrific\nIf it's terrific then it's traffic\nIf it's traffic then it's tragic\nIf it's tragic then it's magic\nIf it's magic then it's logic\nIf it's logic then it's static\nIf it's static then it's statistic\nIf it's statistic then it's mathematics\nIf it's mathematics then it's systematic\nIf it's systematic then it's automatic\nIf it's automatic then it's acrobatic\nIf it's acrobatic then it's cinematic\nIf it's cinematic then it's dramatic\nIf it's dramatic then it's traumatic\nIf it's traumatic then it's panic\nIf it's panic then it's manic\nIf it's manic then it's toxic\nIf it's toxic then it's septic\nIf it's septic then it's antibiotic\nIf it's antibiotic then it's genetic\nIf it's genetic then it's organic\nIf it's organic then it's botanical\nIf it's botanical then it's chemical\nIf it's chemical then it's atomic\nIf it's atomic then it's dynamic\nIf it's dynamic then it's volcanic\nIf it's volcanic then it's titanic\nIf it's titanic then it's gigantic\nIf it's gigantic then it's historic\nIf it's historic then it's prehistoric\nIf it's prehistoric then it's jurassic\nIf it's jurassic then it's classic\nIf it's classic then it's basic\nIf it's basic then it's music\nIf it's music then it's acoustic\nIf it's acoustic then it's physics\nIf it's physics then it's metaphysics\nIf it's metaphysics then it's mystic\nIf it's mystic then it's holistic\nIf it's holistic then it's artistic\nIf it's artistic then it's majestic\nIf it's majestic then it's possible\nIf it's possibly impossible then it's problematic\nIf it's impossibly possible then it's miraculous",
    16: "In the realm of dreams, realities converge... while nightmares unravel the fabric of our mind's entanglement.",
    17: "People change, and how well they've changed is evident to those who aren't closest. However, how poorly they've changed affects us...",
    18: "खोये थे हम राहों में, अधूरी यादों की बस्ती,\nआज शब-ए-महताबी में, है पूरी दास्तानों की मस्ती।",
    19: "‘Some’ and ‘any’ forge qualms between ‘no’ and ‘every’",
    21: "Sunset's vast palette,\nBirds dance in a fleeting arc,\nEvening beauty fades.",
    22: "Night's ragged wind blows,\nClouds find their only comrade,\nThe silent white moon.",
    23: "The year has changed,\nyet memories and moments\nremain constant.",
    24: "C'est la vie:\nHow things change over the years.",
    25: "सरगम में घुल गई है तेरी यादों की रात...\nएक ख़त्म हो तो दूसरी रात आ जाती है\nइश्क़ की राहों में कोई बात आ जाती है\nचाहतों के सफ़र में मुलाक़ात आ जाती है\nलबों पे हँसी और मुस्कुराहट आ जाती है\nतन्हाई भी रातों को उलझा जाती है\nन आँखों में नींद, बस ख़ुमार में आ जाती है",
    26: "∞ :\nThe exaggeration of life",
    28: "Might they form a nexus?\n...And if they do,\nshould it matter if we are entangled?",
    29: "Might they form a nexus?\n...And if they do,\nshould it matter if we are entangled?",
    33: "छुपा जो एहसास में, उसे ज़ुबां क्या करें\nइश्क़ है या इबादत, बयां क्या करें\nकहानी है दिलों की, इसे लफ़्ज़ों में बयां क्या करें\nदर्द है या दवा, इसका गिला क्या करें\nख़ामोशी है दरमियाँ, फिर गुमान क्या करें\nकलम है या दिल, इम्तिहान क्या करें\nजहाँ है या जन्नत, ये गुमान क्या करें",
    34: "आज महताब सा दिन है...\nमुसाहिब हुए कमबख़्त...\nउश्शाक़ तो हम नहि थे...\nएजाज़-ए-मोहब्बत ने मशकूर किया,\nअरसा-ए-हयात को आश्नाई से भर दिया।\nउस ज़ेबा के लिए,\nक़ल्ब को छू कर गुज़र जाना काफी था।",
    35: "Yet the irony is: the moon and my crush are the same.\nNeither can we have them,\nnor can we forget them...\nIt seems to be phasing into a loop...",
    36: "Golden silhouettes,\nGracing dusk's canvas with style,\nFleeting elegance.",
    37: "Although her face was not yet beheld,\nthe moon mirrored her image.",
    38: "गुज़ारे हैं हर लम्हे तेरे साथ उसे मिटाने दे\nअश्क बहाए हैं हर रैन उन्हें फिर कमाने दे\nसआदत तेरी मन्नत में वो किस्मत ने आज़माई है",
    39: "मुसलसल होती है गर्दिश-ए-दौरा के सफ़र में\nकुछ कश्तियों के मुकद्दर में साहिल नहीं होता\nमुंतज़िर मुकम्मल का वजूद होती है",
    43: "The tale of love is settled in the moon;\nBeauty is mythologized with the moon;\nEvery phase has its zestful sway,\nTo make us fond of the moon...",
    44: "All that we see\nisn't what it seems to be.",
    45: "Nothing seems to be perfect,\nbut acknowledging it after a while,\nyou might be right although wrong",
    46: "Sometimes time repeats itself,\nto make you realize what you did.",
    47: "The tranquility of night,\nwhile gazing at the\nmoon and stars, brings\nplacidity to the heart.",
    48: "Sometimes having no reason for reasoning is\nbetter than having some reasons;\nsuch an unconditional state.",
    49: "It's grave\nto have\nadversity\nfor a while,\nto deem it\nprosperous\nfor the zest of life.",
    50: "Searching the ambience\nto fit the vibe",
    51: "चाँद ख़ामोश है, किस राज़ में डूबा होगा\nरात का हर पल, जैसे कोई सपना गुज़रा होगा\nसितारों की महफ़िल में, मेरा नाम भी लिखा होगा\nबादलों की ओट में, तेरा चेहरा छुपा होगा\nआसमान अपनी चादर में समेटे बातें,\nहर क़दम में कोई अफ़साना बयाँ करता होगा\nहवाओं की सरगोशियाँ, तेरी यादें,\nशायद कोई दिल, आज भी इंतज़ार करता होगा",
    52: "Since night will be lovely.\nFor the sake of beauty; feel love behoove thee.\nThe realm of passions might be aeonian,\nand idyllically elysian.\nStill waiting for them,\nDespite the fondness being the same.",
    54: "One should recite the rhythmic variations\nof the self, to prepare the character\nfor the next chapter.",
    55: "It's in the heart, yet doesn't come to the lips!",
    56: "शाम का आसमान, तनहा और गहरा है,\nअब्रों की घनी छाँव, रुख़सार और अंधेरा है।\nपरिंदों की चहचहाहट, अब खामोश बसेरा है,\nकुदरत की गोद में, सुकून का ये डेरा है।",
    58: "The jubilant sway of\nlife along with\nthe fervour of love\nis the only\ndesire:",
    60: "क्या कहना इनका चाँदनी का अंदाज़,\nजैसे लफ़्ज़ों मे छुपा कोई राज़।\nतेरी हुस्न-ए-सादगी और सादगी-ए-हुस्न से,\nमहकती है फिज़ाओं की आवाज़।\nउसने देखा है तुझको शाम-ओ-सहर,\nतेरी जैसी मौजूदगी पाने की,\nकरता है चाँद भी अब परवाज़।",
    63: "The deepest agony of life is\ntrusting the lies that you devise.",
    64: "What would've been, if we were together?\nUnder the silent whisper of the heather?\nWalking through the mist of the velvet sky,\nA love so deep, it could never die.\n\nHand in hand, we'd brave the stormy weather,\nBound by a promise, light as a feather.\nA destined tie, a bond no force could sever,\nWoven in the fabric of you and I.",
    65: "एक दिलकश से हमें ये उलफ़त की ख़्वाहिश है\nज़िंदगी के सफ़र में रफ़ाक़त की फ़रमाइश है\nदिलों के दरमियाँ ये गुंजाइश है\nसआदत-ए-क़ुर्बत की आज़माइश है",
    68: "चांदनी रात में, तारों का जहां है कुछ,\nरात की आगोश में, खोना है कुछ।\n\nरात के अंधेरे में, खुशबू की हवा है कुछ,\nउनकी यादों की, महफ़िल फ़िज़ा है कुछ।\n\nचांद के साथ, ख्वाबों का सफर है कुछ,\nरात की गहराई में, बरसती प्यास है कुछ।\n\nरात अनजानी, उनकी बात है कुछ,\nचांद की रोशनी में, छुपी एक रात है कुछ।\n\nचांदनी की परछाई में, छुपी ताबीर है कुछ,\nचांद तेरी रोशनी में, क्या राज़ है कुछ?!",
    69: "Chasing the sunset and capturing the cosmic magic of the horizon,\nwithin and beyond.",
    70: "हसरतें ख़्वाबों में रंगीन हैं,\nहयात में मुख़्तलिफ़;\nज़िंदगी गुजारना तरीक़ों में मुनासिब है,\nनसीबों में संगीन..",
    71: "Relativism has to be realistic.",
    72: "The twilight's gentle veil, in calm's sweet embrace,\nIs all I yearn for in this quiet place.",
    73: "A thoughtful glance back often reveals the hidden paths forward.",
    74: "Love's elixir flows through the veins under the moon's glow",
    75: "फलक से जो टूटा वो तारा तो था, पर\nक़ुबूलियत का इस जनम, इशारा नहीं था\n\nवो मंज़र जो देखा था आँखों ने मेरी\nहक़ीक़त में ऐसा, नज़ारा नहीं था\n\nहमें इश्क़ ले ही गया उस गली में\nजहाँ कोई अपना, हमारा नहीं था\n\nमैं ही था वो जलता हुआ एक सैयारा\nकिसी की नज़र का, उजाला नहीं था\n\nसमंदर के दिल में भी साहिल मिले हैं\nमगर मेरी क़िस्मत में, किनारा नहीं था\n\nये तन्हाई ओढ़े हुए सोचता हूँ\nमैं हारा नहीं था, हराया गया था",
    78: "बादल में डूबा हुआ था चाँद उस शाम का,\nकुछ और गहरा गया था रंग भी जाम का।\n\nख़ामोश लम्हों में कहीं बज उठी थी सदा,\nसाया कोई मिल गया था दिल के मुक़ाम का।\n\nतनहाई की राह में इक नर्म सी हवा चली,\nमहसूस होने लगा था वक़्त भी आराम का।\n\nफिर रेत सी बह गईं उम्मीद की कश्तियाँ,\nदरिया था आँखों में या मौसम था शाम का।\n\nइक बेज़ुबान सी चाहत, इक नामुराद सी आस,\nकुछ रंग बिखर गया था रोज़-ओ-शाम का।\n\nएक बेख़बर सी ख़ुशी, इक बेचैन सी क़लम,\nलिखती रही फ़स्ल कोई तन्हा ग़ुलाम का।\n\nमैं देखता रह गया फिर इन फ़लक की तरफ़,\nक्या राज़ था चाँद में, इन तारों के नाम का।",
    79: "Forge a nexus to alter the canon,\nWhere the string of destiny breaks into threads of will.\n\nI went back—\ninto the quiet corridors of yesters,\nwhence the present I knew dissolved like mist.\nIt slid into the archives of memory,\nbecoming just another “was.”\n\nAnd that past?\nPerhaps another “will,” from another string.\nThe future—\nforged from what I sow:\nwaiting, watching,\nready to be revised by this rewritten craft.\n\nThey call it canon—\nthe anchor of the universe,\na singularity where the tale feels surreal.\nYet when I touched it with my subconscious,\nthe anchor wrecked—\nand a new river spilled forth.\n\nA nexus bloomed.\nA fracture, yes—\nbut also a possibility.\n\nWhere one tale ended with qualm,\na zillion new verses began,\neach warbling in their own strange meter.\n\nAnd so I walk,\nbetween opposites,\ncarrying the revelations,\nTo revise the narrative\nis to write a poem upon the bones of time—\nhalf prose, half poesy,\nand wholly unleashed.",
    80: "ख़ामोशी से मुसीबत भी संगीन है\nदिल की तड़पन से ज़रा तस्कीन है\nकिसी की पूरी तो किसी की अधूरी\nज़िंदगी की दास्तानें भी रंगीन हैं\n\nसोचते कुछ और हैं\nलिखते कुछ और हैं\nकमबख़्त ये ही ज़िंदगी की आरज़ू है\nनग़मों में बयां करते कुछ और हैं",
    81: "Fondness owed for one's sum total?",
    82: "तुम्हारा रूप देख कर हम दीवाने हो जाएं,\nइस कदर हम मस्ताने हो जाएं;\nसाये में तेरे, मेरे आशियाने हो जाएं,\nतकदीर में ही सही पर, उन ख़्वाबों के अफ़साने हो जाएं।",
    83: "चाँद की रौशनी में खुद को छुपा के,\nरात की गहराइयों में खो गया।\nआँखों में बसी वो तस्वीर,\nचाँद से अपनी दास्तान कह गई।",
    84: "My craving for carving the Moon\nseems the same for thee.",
    85: "Night's aura unfolds,\nCrescent moon graces the sky,\nNature's symphony.",
    86: "एक था राजा, एक थी रानी,\nदोनों की थी हसीं कहानी।\nइश्क़ के रंगों से सजी थी दुनिया,\nआँखों में थी सपनों की रवानी।\n\nमोहब्बत की लौ थी जलती,\nफिर भी थी दिलों में खलिश कहीं।\nतमन्नाओं के परदे में छुपी,\nएक अनकही सदा थी वहीं।\n\nचांदनी रातों में चलती थी बातों की बहार,\nलेकिन कदमों में बिछती रही वीरानी।\nमिलने की चाहत में बढ़ते रहे कदम,\nमगर फासलों में ही गुम हो गई निशानी।\n\nदिलों में थी बातों की बरसात,\nफिर भी खामोशी थी जिंदा,\nजाने कैसे बीत गए वो पल,\nजो कभी लौटकर ना आएंगे, जिंदा।\n\nजो नहीं होना था, वो हो रहा है,\nदिल की गलियों में जोर हो रहा है।\nइश्क़ का मौसम आया भी नहीं,\nऔर रुखसत का दौर हो रहा है।\n\nरात की चादर में थे सपने,\nसुबह की किरणें धुंधला गईं।\nदिल की हसरतें न बुझ सकीं,\nज़िन्दगी कहीं और जा बसी।\n\nएक था राजा, एक थी रानी,\nदोनों बिछड़े, खत्म हुई कहानी।\nजो होना था, वो कभी ना हुआ,\nफिर भी, वो यादें बनी रहेंगी जवानी।",
    87: "I think this love feels surreal, like a dream,\nDrifting upon the universe's stream.\nI stand here gazing at the night sky deep,\nWhile memories of you, my heart does keep.\nThe gentle breeze whispers a sensual tune,\nBeneath the silver watch of stars & moon;\nNo cloud can hide, nor shadows ever conceal,\nThe beauty of this scenic truth I feel.\n\nYou have that magic in your hazel green,\nThe fairest sight my soul has ever seen.\nYour fringe does fall softly upon your face,\nLike flowers blooming in a sunlit place.\nI see your hazelnut mocha brown hairs flow,\nWith essence of those sweet citrus flowers aglow—\nA scent that pulls me in, wild and divine,\nTo make me wish that you were wholly mine.\n\nOur yesterdays melt & slowly start to fade,\nLike ripples on a lake within the shade.\nBut tomorrows await, glorious and bright,\nTurning the cold into the warm sunlight.\nThe blues are banished when I see your smile,\nWhich makes the steepest mountains worth the mile.\n\nThe touch of your softness calms the sea,\nAn ocean vast where I just wanna be.\nYou are the apple of my eye, it's clear,\nDispelling every doubt & every fear.\nThere ain't no would, nor could, nor should imply,\nThat I would leave you 'neath the open sky.\nYour vibrance shines thru yellows & the grey,\nTurning the darkest night to bright of day.\n\nSo grant me, love, yet one distinct embrace,\nTo hold forever in this sacred space.\nLet nature sing in rhythm with my plea,\nFor you are all the world, and more, to me.\nNo longer need I gaze on stars afar,\nFor you, my lovely Girl, are the star.",
    88: "Look, what audacity the moon does show,\nOn this lonely, starry, hazy night, you know?\nIt hangs there, a ghostly, silver gleam,\nJust watching o'er this wild and fleeting dream.\n\nThis whole mishmash of life, this fated game,\nIt sees the love, the beauty, and the flame.\nForsooth, 'tis nature's law, a grand design,\nA witness to it all, a silent sign.\n\nSo one looks up, a soul beneath the vast,\nThinking on the die that has been cast.\nIt's kind of beautiful, this cosmic stuff,\nAnd for this moment, 'tis more than enough.",
    89: "तुम्हारी वो पहली झलक, जैसे नए दिन की आज़ हो तुम\nतुम्हारी वो पहली मुलाकात, जैसे खुशियों का साज़ हो तुम\nतुम्हारी वो पहली हंसी, बहारों की जीत हो तुम\nप्रेम की वो पहली बौछार में, जीवन की नई रीत हो तुम\n\nजीवन की राहों में हसरतों का सफर हो तुम\nबिखरी ज़िंदगी में उम्मीदों का असर हो तुम\nमुस्कुराहटों की लहरों में खुशी का इज़हार हो तुम\nख्वाबों के आलम में हक़ीक़त-ए-हयात हो तुम\n\nइन ज़ुल्फ़ों की छाँव में दिल का आशियाना हो तुम\nरात की गहराई में चाँद की रोशनी हो तुम\nदिल की हर धड़कन में प्यार की सरगम हो तुम\nदर्द की गहराई में आहट का एहसास हो तुम\n\nहर सूफ़ियाना राग में प्रेम की बात हो तुम\nशोर भरी दुनिया में सुकून का लम्हा हो तुम\nज़िंदगी के पेचीदगियों में सादगी की सौगात हो तुम\nजीवन के महकते फूलों में खुशबू की बरसात हो तुम\n\nजीवन की इस धारा में, ख्वाबों की कश्ती हो तुम\nअनगिनत यादों के झरोखे से, बीते पलों की हस्ती हो तुम\nबारिश की बूँदों में छुपी, धरती की प्यास हो तुम\nसूरज की पहली किरण में, नई सुबह की आस हो तुम\n\nगुलशन की नाजुक डालियों में, फूलों की मुस्कान हो तुम\nचाँदनी रातों में तारों की, चमकती जुबान हो तुम\nदिल के जज़्बातों में बसी, प्रेम की गहरी धार हो तुम\nज़िंदगी के हर मोड़ पर, मेरे साथ की राहबर हो तुम\n\nसंगीत के हर सुर में, गीतों की रवानी हो तुम\nशोर की इस दुनिया में, दिल की खामोशी हो तुम\nउलझनों के चक्रव्यूह में, समझ की सरलता हो तुम\nजीवन के सूने पलों में, यादों की बरसात हो तुम\n\nहर दुख में, हर सुख में, साथ अबाद हो तुम\nजीवन के हर मोड़ पर, वफ़ा का साया हो तुम\nचाहे जो भी हो बाधा, अनंत काल तक साथ का वादा हो तुम",
}

def main():
    if not os.path.exists(INPUT_FILE):
        print(f"Error: {INPUT_FILE} not found.")
        return

    try:
        with open(INPUT_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return

    correction_count = 0
    
    for item in data:
        item_id = item.get('id')
        if item_id in CORRECTIONS:
            new_content = CORRECTIONS[item_id]
            if item['content'] != new_content:
                item['content'] = new_content
                correction_count += 1
                # print(f"Corrected ID {item_id}")

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Success! Applied {correction_count} corrections.")
    print(f"Saved to: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
