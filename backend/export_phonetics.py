import json
from sqlalchemy.orm import Session
from phonetic_db import SessionLocal, PhonemeMetadata, Language, PhoneticCrosswalk
import os

def export_to_json():
    db: Session = SessionLocal()
    phonemes = db.query(PhonemeMetadata).all()
    
    export_data = []
    for p in phonemes:
        cw_list = []
        for cw in p.crosswalks:
            cw_list.append({
                "language": cw.language.language_name,
                "iso": cw.language_iso,
                "family": cw.language.family,
                "grapheme": cw.grapheme,
                "example": cw.example_word
            })
            
        export_data.append({
            "ipa_symbol": p.ipa_symbol,
            "manner": p.manner,
            "place": p.place,
            "voicing": p.voicing,
            "unicode_hex": p.unicode_hex,
            "crosswalks": cw_list
        })
    
    # Ensure directory exists
    target_dir = os.path.join("..", "src", "data", "grammatology")
    os.makedirs(target_dir, exist_ok=True)
    target_file = os.path.join(target_dir, "phonetics_data.json")
    
    with open(target_file, "w", encoding="utf-8") as f:
        json.dump(export_data, f, ensure_ascii=False, indent=2)
        
    db.close()
    print(f"Exported {len(export_data)} phonemes to {target_file}")

if __name__ == "__main__":
    export_to_json()
