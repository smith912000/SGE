from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from phonetic_db import get_db, PhonemeMetadata, Language, PhoneticCrosswalk
from pydantic import BaseModel

router = APIRouter(prefix="/phonetics", tags=["phonetics"])

class CrosswalkDetail(BaseModel):
    language: str
    iso: str
    family: str = "Other"
    grapheme: str
    example: str

class PhonemeResponse(BaseModel):
    ipa_symbol: str
    manner: str
    place: str
    voicing: bool
    unicode_hex: str
    crosswalks: List[CrosswalkDetail]

@router.get("/all", response_model=List[PhonemeResponse])
def get_all_phonemes(db: Session = Depends(get_db)):
    phonemes = db.query(PhonemeMetadata).all()
    results = []
    for p in phonemes:
        cw_list = []
        for cw in p.crosswalks:
            cw_list.append(CrosswalkDetail(
                language=cw.language.language_name,
                iso=cw.language_iso,
                family=cw.language.family,
                grapheme=cw.grapheme,
                example=cw.example_word
            ))
        results.append(PhonemeResponse(
            ipa_symbol=p.ipa_symbol,
            manner=p.manner,
            place=p.place,
            voicing=p.voicing,
            unicode_hex=p.unicode_hex,
            crosswalks=cw_list
        ))
    return results

@router.get("/crosswalk/{ipa_symbol}", response_model=PhonemeResponse)
def get_phoneme_crosswalk(ipa_symbol: str, db: Session = Depends(get_db)):
    p = db.query(PhonemeMetadata).filter(PhonemeMetadata.ipa_symbol == ipa_symbol).first()
    if not p:
        return {"error": "Phoneme not found"}
    
    cw_list = []
    for cw in p.crosswalks:
        cw_list.append(CrosswalkDetail(
            language=cw.language.language_name,
            iso=cw.language_iso,
            family=cw.language.family,
            grapheme=cw.grapheme,
            example=cw.example_word
        ))
        
    return PhonemeResponse(
        ipa_symbol=p.ipa_symbol,
        manner=p.manner,
        place=p.place,
        voicing=p.voicing,
        unicode_hex=p.unicode_hex,
        crosswalks=cw_list
    )

@router.get("/filter", response_model=List[PhonemeResponse])
def filter_phonemes(
    manner: Optional[str] = None,
    place: Optional[str] = None,
    voicing: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    query = db.query(PhonemeMetadata)
    if manner:
        query = query.filter(PhonemeMetadata.manner == manner)
    if place:
        query = query.filter(PhonemeMetadata.place == place)
    if voicing is not None:
        query = query.filter(PhonemeMetadata.voicing == voicing)
    
    phonemes = query.all()
    results = []
    for p in phonemes:
        cw_list = []
        for cw in p.crosswalks:
            cw_list.append(CrosswalkDetail(
                language=cw.language.language_name,
                iso=cw.language_iso,
                family=cw.language.family,
                grapheme=cw.grapheme,
                example=cw.example_word
            ))
        results.append(PhonemeResponse(
            ipa_symbol=p.ipa_symbol,
            manner=p.manner,
            place=p.place,
            voicing=p.voicing,
            unicode_hex=p.unicode_hex,
            crosswalks=cw_list
        ))
    return results
