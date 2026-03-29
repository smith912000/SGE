from sqlalchemy.orm import Session
from phonetic_db import SessionLocal, PhonemeMetadata, Language, PhoneticCrosswalk, init_db

def seed_data():
    init_db()
    db = SessionLocal()
    
    # Check if already seeded
    if db.query(Language).filter(Language.iso_code == 'en').first():
        print("Database already seeded.")
        db.close()
        return

    # Languages
    langs = [
        Language(iso_code='en', language_name='English'),
        Language(iso_code='es', language_name='Spanish'),
        Language(iso_code='fr', language_name='French'),
        Language(iso_code='de', language_name='German'),
        Language(iso_code='it', language_name='Italian'),
    ]
    db.add_all(langs)

    # Phonemes
    phonemes = [
        PhonemeMetadata(
            ipa_symbol='ʃ', 
            manner='Fricative', 
            place='Postalveolar', 
            voicing=False, 
            unicode_hex='U+0283'
        ),
        PhonemeMetadata(
            ipa_symbol='ɲ', 
            manner='Nasal', 
            place='Palatal', 
            voicing=True, 
            unicode_hex='U+0272'
        ),
    ]
    db.add_all(phonemes)
    db.commit()

    # Crosswalks
    crosswalks = [
        # /ʃ/
        PhoneticCrosswalk(ipa_symbol='ʃ', language_iso='en', grapheme='sh', example_word='ship'),
        PhoneticCrosswalk(ipa_symbol='ʃ', language_iso='fr', grapheme='ch', example_word='chat'),
        PhoneticCrosswalk(ipa_symbol='ʃ', language_iso='de', grapheme='sch', example_word='schule'),
        
        # /ɲ/
        PhoneticCrosswalk(ipa_symbol='ɲ', language_iso='es', grapheme='ñ', example_word='niño'),
        PhoneticCrosswalk(ipa_symbol='ɲ', language_iso='fr', grapheme='gn', example_word='montagne'),
        PhoneticCrosswalk(ipa_symbol='ɲ', language_iso='it', grapheme='gn', example_word='gnocchi'),
    ]
    db.add_all(crosswalks)
    db.commit()
    db.close()
    print("Seed successful.")

if __name__ == "__main__":
    seed_data()
