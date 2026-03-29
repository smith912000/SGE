from sqlalchemy import create_engine, Column, String, Boolean, ForeignKey, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import os

# SQLite database file
DB_PATH = os.path.join(os.path.dirname(__file__), "phonetics.db")
SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class PhonemeMetadata(Base):
    __tablename__ = "phoneme_metadata"

    ipa_symbol = Column(String, primary_key=True, index=True)
    manner = Column(String)
    place = Column(String)
    voicing = Column(Boolean)
    unicode_hex = Column(String)

    crosswalks = relationship("PhoneticCrosswalk", back_populates="phoneme")

class Language(Base):
    __tablename__ = "languages"

    iso_code = Column(String, primary_key=True)  # e.g., 'en', 'es', 'fr'
    language_name = Column(String)
    family = Column(String, default="Other")
    sub_family = Column(String, nullable=True)

    crosswalks = relationship("PhoneticCrosswalk", back_populates="language")

class PhoneticCrosswalk(Base):
    __tablename__ = "phonetic_crosswalk"

    id = Column(Integer, primary_key=True, autoincrement=True)
    ipa_symbol = Column(String, ForeignKey("phoneme_metadata.ipa_symbol"))
    language_iso = Column(String, ForeignKey("languages.iso_code"))
    grapheme = Column(String)
    example_word = Column(String)

    phoneme = relationship("PhonemeMetadata", back_populates="crosswalks")
    language = relationship("Language", back_populates="crosswalks")

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
