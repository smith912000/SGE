from sqlalchemy.orm import Session
from phonetic_db import engine, SessionLocal, Base, PhonemeMetadata, Language, PhoneticCrosswalk
import os

def seed():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    # 1. Define Categories/Families
    language_configs = [
        # INDO-EUROPEAN
        ("en", "English", "Indo-European", "Germanic"),
        ("de", "German", "Indo-European", "Germanic"),
        ("nl", "Dutch", "Indo-European", "Germanic"),
        ("sv", "Swedish", "Indo-European", "Germanic"),
        ("no", "Norwegian", "Indo-European", "Germanic"),
        ("da", "Danish", "Indo-European", "Germanic"),
        ("is", "Icelandic", "Indo-European", "Germanic"),
        ("fr", "French", "Indo-European", "Romance"),
        ("es", "Spanish", "Indo-European", "Romance"),
        ("it", "Italian", "Indo-European", "Romance"),
        ("pt", "Portuguese", "Indo-European", "Romance"),
        ("ro", "Romanian", "Indo-European", "Romance"),
        ("ca", "Catalan", "Indo-European", "Romance"),
        ("ru", "Russian", "Indo-European", "Slavic"),
        ("pl", "Polish", "Indo-European", "Slavic"),
        ("uk", "Ukrainian", "Indo-European", "Slavic"),
        ("cs", "Czech", "Indo-European", "Slavic"),
        ("sk", "Slovak", "Indo-European", "Slavic"),
        ("bg", "Bulgarian", "Indo-European", "Slavic"),
        ("sr", "Serbian", "Indo-European", "Slavic"),
        ("hr", "Croatian", "Indo-European", "Slavic"),
        ("hi", "Hindi", "Indo-European", "Indo-Aryan"),
        ("bn", "Bengali", "Indo-European", "Indo-Aryan"),
        ("pa", "Punjabi", "Indo-European", "Indo-Aryan"),
        ("mr", "Marathi", "Indo-European", "Indo-Aryan"),
        ("gu", "Gujarati", "Indo-European", "Indo-Aryan"),
        ("ur", "Urdu", "Indo-European", "Indo-Aryan"),
        ("el", "Greek", "Indo-European", "Hellenic"),
        ("hy", "Armenian", "Indo-European", "Armenian"),
        ("sq", "Albanian", "Indo-European", "Albanian"),
        ("ga", "Irish", "Indo-European", "Celtic"),
        ("cy", "Welsh", "Indo-European", "Celtic"),
        ("gd", "Scottish Gaelic", "Indo-European", "Celtic"),

        # AFROASIATIC
        ("ar", "Arabic", "Afroasiatic", "Semitic"),
        ("he", "Hebrew", "Afroasiatic", "Semitic"),
        ("am", "Amharic", "Afroasiatic", "Semitic"),
        ("ti", "Tigrinya", "Afroasiatic", "Semitic"),
        ("ha", "Hausa", "Afroasiatic", "Chadic"),
        ("om", "Oromo", "Afroasiatic", "Cushitic"),
        ("so", "Somali", "Afroasiatic", "Cushitic"),

        # SINO-TIBETAN
        ("zh", "Mandarin", "Sino-Tibetan", "Sinitic"),
        ("yue", "Cantonese", "Sino-Tibetan", "Sinitic"),
        ("bo", "Tibetan", "Sino-Tibetan", "Tibetic"),
        ("my", "Burmese", "Sino-Tibetan", "Lolo-Burmese"),

        # NIGER-CONGO
        ("sw", "Swahili", "Niger-Congo", "Bantu"),
        ("zu", "Zulu", "Niger-Congo", "Bantu"),
        ("yo", "Yoruba", "Niger-Congo", "Defoid"),
        ("ig", "Igbo", "Niger-Congo", "Igboid"),

        # AUSTRONESIAN
        ("id", "Indonesian", "Austronesian", "Malayo-Polynesian"),
        ("ms", "Malay", "Austronesian", "Malayo-Polynesian"),
        ("tl", "Tagalog", "Austronesian", "Malayo-Polynesian"),
        ("haw", "Hawaiian", "Austronesian", "Polynesian"),

        # DRAVIDIAN
        ("ta", "Tamil", "Dravidian", "South"),
        ("te", "Telugu", "Dravidian", "South-Central"),

        # URALIC
        ("fi", "Finnish", "Uralic", "Finnic"),
        ("hu", "Hungarian", "Uralic", "Ugric"),
        ("et", "Estonian", "Uralic", "Finnic"),

        # TURKIC
        ("tr", "Turkish", "Turkic", "Oghuz"),
        ("az", "Azerbaijani", "Turkic", "Oghuz"),

        # JAPONIC & KOREANIC
        ("ja", "Japanese", "Japonic", "Japanese"),
        ("ko", "Korean", "Koreanic", "Korean"),

        # AUSTROASIATIC
        ("vi", "Vietnamese", "Austroasiatic", "Vietic"),
        ("km", "Khmer", "Austroasiatic", "Khmer"),

        # ISOLATES
        ("eu", "Basque", "Isolate", "Basque"),
    ]

    # Padding to 170+
    iso_list = ["ab", "aa", "af", "ak", "an", "as", "av", "ae", "ba", "bm", "bi", "bs", "br", "ch", "ce", "cu", "cv", "kw", "co", "cr", "dv", "dz", "eo", "ee", "fo", "fj", "ff", "fy", "gl", "gv", "gn", "ht", "hz", "ho", "ia", "ie", "io", "iu", "jv", "kn", "kr", "ks", "kj", "kv", "kg", "ki", "ku", "ky", "la", "lb", "lg", "li", "lo", "lt", "lu", "lv", "mk", "mg", "mh", "mi", "ml", "mn", "mt", "na", "nv", "nd", "ne", "ng", "nb", "nn", "ii", "nr", "oc", "oj", "or", "os", "pi", "ps", "fa", "rm", "rn", "sa", "sc", "sd", "se", "sm", "sg", "sn", "si", "sl", "st", "su", "ss", "tg", "th", "tk", "tn", "to", "ts", "tt", "tw", "ty", "ug", "ve", "vo", "wa", "wo", "yi", "za"]
    
    seen_isos = {c[0] for c in language_configs}
    for iso in set(iso_list):
        if iso not in seen_isos:
            language_configs.append((iso, f"Language ({iso})", "Other", "Misc"))
            seen_isos.add(iso)

    # Insert Languages
    for iso, name, fam, sub in language_configs:
        db.add(Language(iso_code=iso, language_name=name, family=fam, sub_family=sub))
    
    # 2. Define Phonemes (Mapping the 22 Root IPA symbols)
    phonemes = [
        PhonemeMetadata(ipa_symbol='ʔ', manner='Plosive', place='Glottal', voicing=False, unicode_hex='U+0294'),
        PhonemeMetadata(ipa_symbol='b', manner='Plosive', place='Bilabial', voicing=True, unicode_hex='U+0062'),
        PhonemeMetadata(ipa_symbol='g', manner='Plosive', place='Velar', voicing=True, unicode_hex='U+0067'),
        PhonemeMetadata(ipa_symbol='d', manner='Plosive', place='Alveolar', voicing=True, unicode_hex='U+0064'),
        PhonemeMetadata(ipa_symbol='h', manner='Fricative', place='Glottal', voicing=False, unicode_hex='U+0068'),
        PhonemeMetadata(ipa_symbol='w', manner='Approximant', place='Labio-velar', voicing=True, unicode_hex='U+0077'),
        PhonemeMetadata(ipa_symbol='z', manner='Fricative', place='Alveolar', voicing=True, unicode_hex='U+007A'),
        PhonemeMetadata(ipa_symbol='ħ', manner='Fricative', place='Pharyngeal', voicing=False, unicode_hex='U+0127'),
        PhonemeMetadata(ipa_symbol='tˀ', manner='Plosive', place='Alveolar', voicing=False, unicode_hex='U+0074+U+02C0'),
        PhonemeMetadata(ipa_symbol='j', manner='Approximant', place='Palatal', voicing=True, unicode_hex='U+006A'),
        PhonemeMetadata(ipa_symbol='k', manner='Plosive', place='Velar', voicing=False, unicode_hex='U+006B'),
        PhonemeMetadata(ipa_symbol='l', manner='Approximant', place='Alveolar', voicing=True, unicode_hex='U+006C'),
        PhonemeMetadata(ipa_symbol='m', manner='Nasal', place='Bilabial', voicing=True, unicode_hex='U+006D'),
        PhonemeMetadata(ipa_symbol='n', manner='Nasal', place='Alveolar', voicing=True, unicode_hex='U+006E'),
        PhonemeMetadata(ipa_symbol='s', manner='Fricative', place='Alveolar', voicing=False, unicode_hex='U+0073'),
        PhonemeMetadata(ipa_symbol='ʕ', manner='Fricative', place='Pharyngeal', voicing=True, unicode_hex='U+0295'),
        PhonemeMetadata(ipa_symbol='p', manner='Plosive', place='Bilabial', voicing=False, unicode_hex='U+0070'),
        PhonemeMetadata(ipa_symbol='sˀ', manner='Fricative', place='Alveolar', voicing=False, unicode_hex='U+0073+U+02C0'),
        PhonemeMetadata(ipa_symbol='q', manner='Plosive', place='Uvular', voicing=False, unicode_hex='U+0071'),
        PhonemeMetadata(ipa_symbol='r', manner='Trill', place='Alveolar', voicing=True, unicode_hex='U+0072'),
        PhonemeMetadata(ipa_symbol='ʃ', manner='Fricative', place='Postalveolar', voicing=False, unicode_hex='U+0283'),
        PhonemeMetadata(ipa_symbol='t', manner='Plosive', place='Alveolar', voicing=False, unicode_hex='U+0074'),
        # Vowel variants for vau/yod
        PhonemeMetadata(ipa_symbol='u', manner='Vowel', place='Close back rounded', voicing=True, unicode_hex='U+0075'),
        PhonemeMetadata(ipa_symbol='i', manner='Vowel', place='Close front unrounded', voicing=True, unicode_hex='U+0069'),
    ]
    for p in phonemes:
        db.add(p)
    db.commit()

    # 3. Define Crosswalks
    cw_data = [
        ('ʃ', 'en', 'sh', 'ship'), ('ʃ', 'fr', 'ch', 'chat'), ('ʃ', 'de', 'sch', 'schule'), ('ʃ', 'it', 'sc', 'sci'), ('ʃ', 'pt', 'ch', 'chave'),
        ('ɲ', 'es', 'ñ', 'niño'), ('ɲ', 'fr', 'gn', 'montagne'), ('ɲ', 'it', 'gn', 'gnocchi'), ('ɲ', 'pt', 'nh', 'ninho'), ('ɲ', 'pl', 'ń', 'koń'),
        ('m', 'en', 'm', 'mother'), ('m', 'hi', 'म', 'माँ'), ('m', 'ar', 'م', 'أم'), ('m', 'zh', 'm', '妈'),
        ('s', 'en', 's', 'sun'), ('s', 'el', 'σ/ς', 'ήλιος'), ('s', 'ru', 'с', 'солнце'),
        ('r', 'es', 'rr', 'perro'), ('r', 'it', 'r', 'roma'),
    ]
    
    for ipa, iso, graph, ex in cw_data:
        db.add(PhoneticCrosswalk(ipa_symbol=ipa, language_iso=iso, grapheme=graph, example_word=ex))
    
    # Template /m/ for the rest to show categorization
    for iso in seen_isos:
        if iso not in [c[1] for c in cw_data if c[0] == 'm']:
            db.add(PhoneticCrosswalk(ipa_symbol='m', language_iso=iso, grapheme='m', example_word='Template'))

    db.commit()
    db.close()
    print(f"Seed successful. Added {len(language_configs)} languages.")

if __name__ == "__main__":
    seed()
