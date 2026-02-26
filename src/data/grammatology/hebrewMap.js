import { LETTER_DB } from './letterDb.js';

export const HEBREW_CHAR_MAP = {};
LETTER_DB.forEach(l => { HEBREW_CHAR_MAP[l.hebrew] = l; });
export const FINAL_FORMS = { "ך":HEBREW_CHAR_MAP["כ"], "ם":HEBREW_CHAR_MAP["מ"], "ן":HEBREW_CHAR_MAP["נ"], "ף":HEBREW_CHAR_MAP["פ"], "ץ":HEBREW_CHAR_MAP["צ"] };

export const KNOWN_HEBREW = {
  ABRAHAM:"אברהם", AVRAHAM:"אברהם", SARAH:"שרה", SARA:"שרה",
  DAVID:"דוד", MICHAEL:"מיכאל", RACHEL:"רחל", REBECCA:"רבקה",
  MOSES:"משה", MOSHE:"משה", JACOB:"יעקב", ISRAEL:"ישראל",
  JOSHUA:"יהושע", DANIEL:"דניאל", SAMUEL:"שמואל", SOLOMON:"שלמה",
  ESTHER:"אסתר", RUTH:"רות", MIRIAM:"מרים", HANNAH:"חנה",
  ADAM:"אדם", EVE:"חוה", NOAH:"נח", ISAAC:"יצחק",
  JOSEPH:"יוסף", BENJAMIN:"בנימין", AARON:"אהרן", ELIJAH:"אליהו",
  GABRIEL:"גבריאל", RAPHAEL:"רפאל", SHALOM:"שלום", AMEN:"אמן",
  TORAH:"תורה", YHWH:"יהוה", ELOHIM:"אלהים", ADONAI:"אדני",
  JESUS:"ישוע", YESHUA:"ישוע", MARY:"מרים", JOHN:"יוחנן",
  PAUL:"פאול", PETER:"פטר", MATTHEW:"מתיו", MARK:"מרק",
  SIMON:"שמעון", JUDAH:"יהודה", LEVI:"לוי", REUBEN:"ראובן",
  LEAH:"לאה", DEBORAH:"דבורה", NAOMI:"נעמי", ABIGAIL:"אביגיל",
  JONATHAN:"יונתן", NATHAN:"נתן", ELISHA:"אלישע", ISAIAH:"ישעיהו",
  JEREMIAH:"ירמיהו", EZEKIEL:"יחזקאל",
};
