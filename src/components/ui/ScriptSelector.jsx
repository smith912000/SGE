import { useMemo, useState } from "react";
import alphabetIndex from "../../data/datasets/linguistics/alphabet_index.json";

// Unicode sample characters for all 174 Unicode scripts
const SCRIPT_SAMPLES = {
  Adlam:                 { sample:"𞤀 𞤁 𞤂 𞤃 𞤄 𞤅 𞤆 𞤇 𞤈 𞤉 𞤊 𞤋", lang:"Fulani (West Africa)", dir:"RTL" },
  Ahom:                  { sample:"𑜀 𑜁 𑜂 𑜃 𑜄 𑜅 𑜆 𑜇 𑜈 𑜉 𑜊", lang:"Ahom (Assam, India)", dir:"LTR" },
  Anatolian_Hieroglyphs: { sample:"𔐀 𔐁 𔐂 𔐃 𔐄 𔐅 𔐆 𔐇 𔐈 𔐉", lang:"Luwian (Anatolia)", dir:"LTR" },
  Arabic:                { sample:"ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي", lang:"Arabic, Persian, Urdu", dir:"RTL" },
  Armenian:              { sample:"Ա Բ Գ Դ Ե Զ Է Ը Թ Ժ Ի Լ Խ Ծ Կ Հ Ձ Ղ Ճ Մ Յ Ն Շ Ո Չ Պ Ջ Ռ Ս Վ Տ Ր Ց Փ Ք Օ Ֆ", lang:"Armenian", dir:"LTR" },
  Avestan:               { sample:"𐬀 𐬁 𐬂 𐬃 𐬄 𐬅 𐬆 𐬇 𐬈 𐬉 𐬊 𐬋 𐬌 𐬍 𐬎 𐬏 𐬐", lang:"Avestan (Zoroastrian)", dir:"RTL" },
  Balinese:              { sample:"ᬅ ᬆ ᬇ ᬈ ᬉ ᬊ ᬋ ᬌ ᬍ ᬎ ᬏ ᬐ ᬑ ᬒ ᬓ ᬔ ᬕ ᬖ ᬗ ᬘ", lang:"Balinese (Bali)", dir:"LTR" },
  Bamum:                 { sample:"ꚠ ꚡ ꚢ ꚣ ꚤ ꚥ ꚦ ꚧ ꚨ ꚩ ꚪ ꚫ ꚬ ꚭ ꚮ ꚯ ꚰ ꚱ", lang:"Bamum (Cameroon)", dir:"LTR" },
  Bassa_Vah:             { sample:"𖫐 𖫑 𖫒 𖫓 𖫔 𖫕 𖫖 𖫗 𖫘 𖫙 𖫚 𖫛 𖫜 𖫝 𖫞 𖫟 𖫠 𖫡 𖫢", lang:"Bassa Vah (Liberia)", dir:"LTR" },
  Batak:                 { sample:"ᯀ ᯁ ᯂ ᯃ ᯄ ᯅ ᯆ ᯇ ᯈ ᯉ ᯊ ᯋ ᯌ ᯍ ᯎ ᯏ ᯐ ᯑ ᯒ ᯓ ᯔ ᯕ ᯖ", lang:"Batak (Sumatra)", dir:"LTR" },
  Bengali:               { sample:"অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম য র ল শ ষ স হ", lang:"Bengali, Assamese", dir:"LTR" },
  Beria_Erfe:            { sample:"𞟀 𞟁 𞟂 𞟃 𞟄 𞟅 𞟆 𞟇 𞟈 𞟉 𞟊 𞟋 𞟌 𞟍 𞟎", lang:"Beria Erfe (Sudan/Chad)", dir:"LTR" },
  Bhaiksuki:             { sample:"𑰀 𑰁 𑰂 𑰃 𑰄 𑰅 𑰆 𑰇 𑰈 𑰊 𑰋 𑰌 𑰍 𑰎 𑰏 𑰐 𑰑 𑰒 𑰓", lang:"Bhaiksuki (India)", dir:"LTR" },
  Bopomofo:              { sample:"ㄅ ㄆ ㄇ ㄈ ㄉ ㄊ ㄋ ㄌ ㄍ ㄎ ㄏ ㄐ ㄑ ㄒ ㄓ ㄔ ㄕ ㄖ ㄗ ㄘ ㄙ ㄚ ㄛ ㄜ ㄝ ㄞ ㄟ ㄠ ㄡ ㄢ ㄣ ㄤ ㄥ ㄦ ㄧ ㄨ ㄩ", lang:"Mandarin phonetics (Taiwan)", dir:"LTR" },
  Brahmi:                { sample:"𑀅 𑀆 𑀇 𑀈 𑀉 𑀊 𑀋 𑀌 𑀍 𑀎 𑀏 𑀐 𑀑 𑀒 𑀓 𑀔 𑀕 𑀖 𑀗 𑀘 𑀙 𑀚 𑀛 𑀜 𑀝 𑀞", lang:"Brahmi (ancient India, Ashoka)", dir:"LTR" },
  Braille:               { sample:"⠁ ⠃ ⠉ ⠙ ⠑ ⠋ ⠛ ⠓ ⠊ ⠚ ⠅ ⠇ ⠍ ⠝ ⠕ ⠏ ⠟ ⠗ ⠎ ⠞ ⠥ ⠧ ⠭ ⠽ ⠵ ⠼", lang:"Braille (tactile)", dir:"LTR" },
  Buginese:              { sample:"ᨀ ᨁ ᨂ ᨃ ᨄ ᨅ ᨆ ᨇ ᨈ ᨉ ᨊ ᨋ ᨌ ᨍ ᨎ ᨏ ᨐ ᨑ ᨒ ᨓ ᨔ ᨕ", lang:"Buginese (South Sulawesi)", dir:"LTR" },
  Buhid:                 { sample:"ᝀ ᝁ ᝂ ᝃ ᝄ ᝅ ᝆ ᝇ ᝈ ᝉ ᝊ ᝋ ᝌ ᝍ ᝎ ᝏ ᝐ ᝑ", lang:"Buhid (Mindoro, Philippines)", dir:"LTR" },
  Canadian_Aboriginal:   { sample:"ᐁ ᐃ ᐅ ᐊ ᐸ ᑎ ᑕ ᑭ ᑳ ᒋ ᒐ ᒥ ᒪ ᓂ ᓇ ᓕ ᓚ ᔑ ᔕ ᕕ ᕖ ᕗ ᕘ ᕙ ᕚ", lang:"Cree, Ojibwe, Inuktitut", dir:"LTR" },
  Carian:                { sample:"𐊠 𐊡 𐊢 𐊣 𐊤 𐊥 𐊦 𐊧 𐊨 𐊩 𐊪 𐊫 𐊬 𐊭 𐊮 𐊯 𐊰 𐊱 𐊲 𐊳 𐊴 𐊵 𐊶 𐊷 𐊸 𐊹 𐊺 𐊻", lang:"Carian (ancient Anatolia)", dir:"LTR" },
  Caucasian_Albanian:    { sample:"𖹀 𖹁 𖹂 𖹃 𖹄 𖹅 𖹆 𖹇 𖹈 𖹉 𖹊 𖹋 𖹌 𖹍 𖹎 𖹏 𖹐 𖹑 𖹒 𖹓", lang:"Caucasian Albanian (Azerbaijan)", dir:"LTR" },
  Chakma:                { sample:"𑄃 𑄄 𑄅 𑄆 𑄇 𑄈 𑄉 𑄊 𑄋 𑄌 𑄍 𑄎 𑄏 𑄐 𑄑 𑄒 𑄓 𑄔 𑄕 𑄖 𑄗 𑄘 𑄙", lang:"Chakma (Bangladesh/India)", dir:"LTR" },
  Cham:                  { sample:"ꨀ ꨁ ꨂ ꨃ ꨄ ꨅ ꨆ ꨇ ꨈ ꨉ ꨊ ꨋ ꨌ ꨍ ꨎ ꨏ ꨐ ꨑ ꨒ ꨓ ꨔ ꨕ ꨖ ꨗ ꨘ ꨙ", lang:"Cham (Vietnam/Cambodia)", dir:"LTR" },
  Cherokee:              { sample:"Ꭰ Ꭱ Ꭲ Ꭳ Ꭴ Ꭵ Ꭶ Ꭷ Ꭸ Ꭹ Ꭺ Ꭻ Ꭼ Ꭽ Ꭾ Ꭿ Ꮀ Ꮁ Ꮂ Ꮃ Ꮄ Ꮅ Ꮆ Ꮇ Ꮈ Ꮉ Ꮊ Ꮋ Ꮌ Ꮍ Ꮎ Ꮏ Ꮐ Ꮑ Ꮒ Ꮓ Ꮔ Ꮕ", lang:"Cherokee (Eastern USA)", dir:"LTR" },
  Chorasmian:            { sample:"𐾰 𐾱 𐾲 𐾳 𐾴 𐾵 𐾶 𐾷 𐾸 𐾹 𐾺 𐾻 𐾼 𐾽 𐾾 𐾿", lang:"Chorasmian (Central Asia)", dir:"RTL" },
  Common:                { sample:"0 1 2 3 4 5 6 7 8 9 + - × ÷ = % @ # & * ©", lang:"Shared across scripts", dir:"LTR" },
  Coptic:                { sample:"Ⲁ Ⲃ Ⲅ Ⲇ Ⲉ Ⲋ Ⲍ Ⲏ Ⲑ Ⲓ Ⲕ Ⲗ Ⲙ Ⲛ Ⲝ Ⲟ Ⲡ Ⲣ Ⲥ Ⲧ Ⲩ Ⲫ Ⲭ Ⲯ Ⲱ Ϣ Ϥ Ϧ Ϩ Ϫ Ϭ Ϯ", lang:"Coptic (Egypt, liturgical)", dir:"LTR" },
  Cuneiform:             { sample:"𒀀 𒀁 𒀂 𒀃 𒀄 𒀅 𒀆 𒀇 𒀈 𒀉 𒀊 𒀋 𒀌 𒀍 𒀎 𒀏 𒀐 𒀑 𒀒 𒀓 𒀔 𒀕 𒀖 𒀗", lang:"Sumerian, Akkadian, Babylonian", dir:"LTR" },
  Cypriot:               { sample:"𐠀 𐠁 𐠂 𐠃 𐠄 𐠅 𐠈 𐠊 𐠋 𐠌 𐠍 𐠎 𐠏 𐠐 𐠑 𐠒 𐠓 𐠔 𐠕 𐠖 𐠗 𐠘 𐠙 𐠚 𐠛 𐠜 𐠝 𐠞 𐠟", lang:"Cypriot Greek (ancient Cyprus)", dir:"RTL" },
  Cypro_Minoan:          { sample:"𒾐 𒾑 𒾒 𒾓 𒾔 𒾕 𒾖 𒾗 𒾘 𒾙 𒾚 𒾛 𒾜 𒾝 𒾞 𒾟 𒾠 𒾡", lang:"Cypro-Minoan (Bronze Age Cyprus)", dir:"LTR" },
  Cyrillic:              { sample:"А Б В Г Д Е Ж З И К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я", lang:"Russian, Ukrainian, Bulgarian, Serbian", dir:"LTR" },
  Deseret:               { sample:"𐐀 𐐁 𐐂 𐐃 𐐄 𐐅 𐐆 𐐇 𐐈 𐐉 𐐊 𐐋 𐐌 𐐍 𐐎 𐐏 𐐐 𐐑 𐐒 𐐓 𐐔 𐐕 𐐖 𐐗 𐐘 𐐙 𐐚 𐐛 𐐜 𐐝", lang:"Deseret (Mormon phonetic script)", dir:"LTR" },
  Devanagari:            { sample:"अ आ इ ई उ ऊ ऋ ए ऐ ओ औ क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह", lang:"Hindi, Sanskrit, Nepali, Marathi", dir:"LTR" },
  Dives_Akuru:           { sample:"𑤀 𑤁 𑤂 𑤃 𑤄 𑤅 𑤆 𑤈 𑤉 𑤊 𑤋 𑤌 𑤍 𑤎 𑤏 𑤐 𑤑 𑤒 𑤓 𑤔 𑤕 𑤖 𑤗 𑤘", lang:"Dives Akuru (Maldives, historical)", dir:"RTL" },
  Dogra:                 { sample:"𑠀 𑠁 𑠂 𑠃 𑠄 𑠅 𑠆 𑠇 𑠈 𑠉 𑠊 𑠋 𑠌 𑠍 𑠎 𑠏 𑠐 𑠑 𑠒 𑠓 𑠔 𑠕", lang:"Dogri (Jammu region, India)", dir:"LTR" },
  Duployan:              { sample:"𛰀 𛰁 𛰂 𛰃 𛰄 𛰅 𛰆 𛰇 𛰈 𛰉 𛰊 𛰋 𛰌 𛰍 𛰎 𛰏", lang:"Duployan shorthand (French)", dir:"LTR" },
  Egyptian_Hieroglyphs:  { sample:"𓀀 𓁀 𓂀 𓃀 𓄀 𓅀 𓆀 𓇀 𓈀 𓉀 𓊀 𓋀 𓌀 𓍀 𓎀 𓏀 𓐀 𓑀 𓒀 𓓀 𓔀 𓕀 𓀠 𓁐 𓂧 𓃾 𓄿 𓅓", lang:"Ancient Egyptian", dir:"LTR/RTL" },
  Elbasan:               { sample:"𐔀 𐔁 𐔂 𐔃 𐔄 𐔅 𐔆 𐔇 𐔈 𐔉 𐔊 𐔋 𐔌 𐔍 𐔎 𐔏 𐔐 𐔑 𐔒 𐔓 𐔔 𐔕 𐔖 𐔗 𐔘 𐔙 𐔚 𐔛 𐔜 𐔝 𐔞 𐔟 𐔠 𐔡 𐔢 𐔣", lang:"Albanian (Elbasan school)", dir:"LTR" },
  Elymaic:               { sample:"𐿠 𐿡 𐿢 𐿣 𐿤 𐿥 𐿦 𐿧 𐿨 𐿩 𐿪 𐿫 𐿬 𐿭 𐿮 𐿯 𐿰 𐿱 𐿲 𐿳 𐿴 𐿵 𐿶 𐿷", lang:"Elymaic (ancient Iran)", dir:"RTL" },
  Ethiopic:              { sample:"አ ቀ በ ተ ሀ ነ አ ከ ወ ዘ የ ደ ጀ ገ ጠ ጸ ፀ ፈ ፐ ሀ ሁ ሂ ሃ ሄ ህ ሆ", lang:"Amharic, Tigrinya, Ge'ez", dir:"LTR" },
  Garay:                 { sample:"𐵀 𐵁 𐵂 𐵃 𐵄 𐵅 𐵆 𐵇 𐵈 𐵉 𐵊 𐵋 𐵌 𐵍 𐵎 𐵏 𐵐 𐵑 𐵒 𐵓", lang:"Garay (Wolof, Senegal)", dir:"RTL" },
  Georgian:              { sample:"ა ბ გ დ ე ვ ზ თ ი კ ლ მ ნ ო პ ჟ რ ს ტ უ ფ ქ ღ ყ შ ჩ ც ძ წ ჭ ხ ჯ ჰ", lang:"Georgian", dir:"LTR" },
  Glagolitic:            { sample:"Ⰰ Ⰱ Ⰲ Ⰳ Ⰴ Ⰵ Ⰶ Ⰷ Ⰸ Ⰹ Ⰺ Ⰻ Ⰼ Ⰽ Ⰾ Ⰿ Ⱀ Ⱁ Ⱂ Ⱃ Ⱄ Ⱅ Ⱆ Ⱇ Ⱈ Ⱉ Ⱊ Ⱋ Ⱌ Ⱍ Ⱎ Ⱏ Ⱐ Ⱑ Ⱒ Ⱓ Ⱔ Ⱕ Ⱖ Ⱗ Ⱘ Ⱙ Ⱚ Ⱛ", lang:"Church Slavonic (Great Moravia)", dir:"LTR" },
  Gothic:                { sample:"𐌰 𐌱 𐌲 𐌳 𐌴 𐌵 𐌶 𐌷 𐌸 𐌹 𐌺 𐌻 𐌼 𐌽 𐌾 𐌿 𐍀 𐍁 𐍂 𐍃 𐍄 𐍅 𐍆 𐍇 𐍈 𐍉 𐍊", lang:"Gothic (Visigoths, Bishop Wulfila)", dir:"LTR" },
  Grantha:               { sample:"𑌅 𑌆 𑌇 𑌈 𑌉 𑌊 𑌋 𑌌 𑌏 𑌐 𑌓 𑌔 𑌕 𑌖 𑌗 𑌘 𑌙 𑌚 𑌛 𑌜 𑌝 𑌞 𑌟 𑌠 𑌡 𑌢 𑌣 𑌤 𑌥 𑌦 𑌧 𑌨 𑌪 𑌫 𑌬 𑌭 𑌮", lang:"Grantha (Sanskrit, Tamil Nadu)", dir:"LTR" },
  Greek:                 { sample:"Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Χ Ψ Ω α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ τ υ φ χ ψ ω", lang:"Greek, Classical Greek", dir:"LTR" },
  Gujarati:              { sample:"અ આ ઇ ઈ ઉ ઊ ઋ એ ઐ ઓ ઔ ક ખ ગ ઘ ઙ ચ છ જ ઝ ઞ ટ ઠ ડ ઢ ણ ત થ દ ધ ન પ ફ બ ભ મ ય ર લ ળ વ શ ષ સ હ", lang:"Gujarati (Gujarat, India)", dir:"LTR" },
  Gunjala_Gondi:         { sample:"𑵠 𑵡 𑵢 𑵣 𑵤 𑵥 𑵧 𑵨 𑵪 𑵫 𑵬 𑵭 𑵮 𑵯 𑵰 𑵱 𑵲 𑵳 𑵴 𑵵 𑵶 𑵷 𑵸 𑵹 𑵺 𑵻", lang:"Gondi (central India)", dir:"LTR" },
  Gurmukhi:              { sample:"ਅ ਆ ਇ ਈ ਉ ਊ ਏ ਐ ਓ ਔ ਕ ਖ ਗ ਘ ਙ ਚ ਛ ਜ ਝ ਞ ਟ ਠ ਡ ਢ ਣ ਤ ਥ ਦ ਧ ਨ ਪ ਫ ਬ ਭ ਮ ਯ ਰ ਲ ਵ ਸ਼ ਸ ਹ", lang:"Punjabi (Sikh scripture)", dir:"LTR" },
  Gurung_Khema:          { sample:"𖿰 𖿱 𖿲 𖿳 𖿴 𖿵 𖿶 𖿷 𖿸 𖿹 𖿺 𖿻 𖿼 𖿽 𖿾 𖿿", lang:"Gurung (Nepal)", dir:"LTR" },
  Han:                   { sample:"一 二 三 四 五 六 七 八 九 十 百 千 万 日 月 山 水 火 木 金 土 人 大 小 中 上 下 左 右 手 心 目 耳 口", lang:"Chinese, Japanese Kanji, Korean Hanja", dir:"LTR" },
  Hangul:                { sample:"가 나 다 라 마 바 사 아 자 차 카 타 파 하 기 니 디 리 미 비 시 이 지 치 키 티 피 히", lang:"Korean", dir:"LTR" },
  Hanifi_Rohingya:       { sample:"𐴀 𐴁 𐴂 𐴃 𐴄 𐴅 𐴆 𐴇 𐴈 𐴉 𐴊 𐴋 𐴌 𐴍 𐴎 𐴏 𐴐 𐴑 𐴒 𐴓 𐴔 𐴕 𐴖 𐴗 𐴘 𐴙", lang:"Rohingya (Myanmar/Bangladesh)", dir:"RTL" },
  Hanunoo:               { sample:"ᜠ ᜡ ᜢ ᜣ ᜤ ᜥ ᜦ ᜧ ᜨ ᜩ ᜪ ᜫ ᜬ ᜭ ᜮ ᜯ ᜰ ᜱ", lang:"Hanunoo (Mindoro, Philippines)", dir:"LTR" },
  Hatran:                { sample:"𐣠 𐣡 𐣢 𐣣 𐣤 𐣥 𐣦 𐣧 𐣨 𐣩 𐣪 𐣫 𐣬 𐣭 𐣮 𐣯 𐣰 𐣱 𐣲 𐣵 𐣶 𐣷", lang:"Hatran Aramaic (Hatra, Iraq)", dir:"RTL" },
  Hebrew:                { sample:"א ב ג ד ה ו ז ח ט י כ ל מ נ ס ע פ צ ק ר ש ת ך ם ן ף ץ", lang:"Hebrew, Yiddish, Ladino", dir:"RTL" },
  Hiragana:              { sample:"あ い う え お か き く け こ さ し す せ そ た ち つ て と な に ぬ ね の は ひ ふ へ ほ ま み む め も や ゆ よ ら り る れ ろ わ を ん", lang:"Japanese", dir:"LTR" },
  Imperial_Aramaic:      { sample:"𐡀 𐡁 𐡂 𐡃 𐡄 𐡅 𐡆 𐡇 𐡈 𐡉 𐡊 𐡋 𐡌 𐡍 𐡎 𐡏 𐡐 𐡑 𐡒 𐡓 𐡔 𐡕", lang:"Imperial Aramaic (Achaemenid Empire)", dir:"RTL" },
  Inherited:             { sample:"̀ ́ ̂ ̃ ̈ ̊ ̇ ̧ ̄ ̃ ͡ ͏ ͒ ͓ ͔ ͕ ͖", lang:"Inherited (diacritics, shared)", dir:"LTR" },
  Inscriptional_Pahlavi: { sample:"𐭠 𐭡 𐭢 𐭣 𐭤 𐭥 𐭦 𐭧 𐭨 𐭩 𐭪 𐭫 𐭬 𐭭 𐭮 𐭯 𐭰 𐭱 𐭲", lang:"Middle Persian (Sasanian Empire)", dir:"RTL" },
  Inscriptional_Parthian:{ sample:"𐭀 𐭁 𐭂 𐭃 𐭄 𐭅 𐭆 𐭇 𐭈 𐭉 𐭊 𐭋 𐭌 𐭍 𐭎 𐭏 𐭐 𐭑 𐭒 𐭓 𐭔", lang:"Parthian (Arsacid Empire)", dir:"RTL" },
  Javanese:              { sample:"ꦄ ꦅ ꦆ ꦇ ꦈ ꦉ ꦊ ꦋ ꦌ ꦍ ꦎ ꦏ ꦐ ꦑ ꦒ ꦓ ꦔ ꦕ ꦖ ꦗ ꦘ ꦙ ꦚ ꦛ ꦜ ꦝ ꦞ ꦟ ꦠ ꦡ ꦢ ꦣ ꦤ ꦥ ꦦ ꦧ ꦨ ꦩ ꦪ ꦫ ꦬ ꦭ ꦮ ꦯ ꦰ ꦱ ꦲ", lang:"Javanese (Java, Indonesia)", dir:"LTR" },
  Kaithi:                { sample:"𑂅 𑂆 𑂇 𑂈 𑂉 𑂊 𑂋 𑂌 𑂍 𑂎 𑂏 𑂐 𑂑 𑂒 𑂓 𑂔 𑂕 𑂖 𑂗 𑂘 𑂙 𑂚 𑂛 𑂜 𑂝 𑂞 𑂟 𑂠 𑂡 𑂢 𑂣 𑂤 𑂥 𑂦", lang:"Kaithi (Bihar, India)", dir:"LTR" },
  Kannada:               { sample:"ಅ ಆ ಇ ಈ ಉ ಊ ಋ ಎ ಏ ಐ ಒ ಓ ಔ ಕ ಖ ಗ ಘ ಙ ಚ ಛ ಜ ಝ ಞ ಟ ಠ ಡ ಢ ಣ ತ ಥ ದ ಧ ನ ಪ ಫ ಬ ಭ ಮ ಯ ರ ಱ ಲ ಳ ವ ಶ ಷ ಸ ಹ", lang:"Kannada (Karnataka, India)", dir:"LTR" },
  Katakana:              { sample:"ア イ ウ エ オ カ キ ク ケ コ サ シ ス セ ソ タ チ ツ テ ト ナ ニ ヌ ネ ノ ハ ヒ フ ヘ ホ マ ミ ム メ モ ヤ ユ ヨ ラ リ ル レ ロ ワ ヲ ン", lang:"Japanese (foreign words, technical)", dir:"LTR" },
  Kawi:                  { sample:"𑽀 𑽁 𑽂 𑽃 𑽄 𑽅 𑽆 𑽇 𑽈 𑽉 𑽊 𑽋 𑽌 𑽍 𑽎 𑽏 𑽐 𑽑 𑽒 𑽓 𑽔 𑽕", lang:"Kawi (Old Javanese, Indonesia)", dir:"LTR" },
  Kayah_Li:              { sample:"꤀ ꤁ ꤂ ꤃ ꤄ ꤅ ꤆ ꤇ ꤈ ꤉ ꤊ ꤋ ꤌ ꤍ ꤎ ꤏ ꤐ ꤑ ꤒ ꤓ ꤔ ꤕ ꤖ ꤗ ꤘ ꤙ ꤚ ꤛ ꤜ ꤝ ꤞ ꤟ ꤠ ꤡ", lang:"Kayah Li (Myanmar/Thailand)", dir:"LTR" },
  Kharoshthi:            { sample:"𐨀 𐨐 𐨑 𐨒 𐨓 𐨕 𐨖 𐨗 𐨙 𐨚 𐨛 𐨜 𐨝 𐨞 𐨟 𐨠 𐨡 𐨢 𐨣 𐨤 𐨥 𐨦 𐨧 𐨨 𐨩 𐨪 𐨫 𐨬 𐨭 𐨮 𐨯 𐨰 𐨱 𐨲 𐨳", lang:"Kharosthi (Gandhara, Pakistan)", dir:"RTL" },
  Khitan_Small_Script:   { sample:"𘴀 𘴁 𘴂 𘴃 𘴄 𘴅 𘴆 𘴇 𘴈 𘴉 𘴊 𘴋 𘴌 𘴍 𘴎 𘴏 𘴐 𘴑 𘴒 𘴓 𘴔 𘴕", lang:"Khitan (ancient Manchuria)", dir:"LTR" },
  Khmer:                 { sample:"ក ខ គ ឃ ង ច ឆ ជ ឈ ញ ដ ឋ ឌ ឍ ណ ត ថ ទ ធ ន ប ផ ព ភ ម យ រ ល វ ស ហ ឡ អ", lang:"Khmer (Cambodia)", dir:"LTR" },
  Khojki:                { sample:"𑈀 𑈁 𑈂 𑈃 𑈄 𑈅 𑈆 𑈇 𑈈 𑈉 𑈊 𑈋 𑈌 𑈍 𑈎 𑈏 𑈐 𑈑 𑈒 𑈓 𑈔 𑈕 𑈖 𑈗 𑈘 𑈙 𑈚 𑈛 𑈜 𑈝 𑈞 𑈟 𑈠 𑈡", lang:"Khojki (Sindhi merchants, India)", dir:"LTR" },
  Khudawadi:             { sample:"𑊰 𑊱 𑊲 𑊳 𑊴 𑊵 𑊶 𑊷 𑊸 𑊹 𑊺 𑊻 𑊼 𑊽 𑊾 𑊿 𑋀 𑋁 𑋂 𑋃 𑋄 𑋅 𑋆 𑋇 𑋈 𑋉 𑋊 𑋋 𑋌 𑋍 𑋎", lang:"Khudawadi (Sindhi, Pakistan/India)", dir:"LTR" },
  Kirat_Rai:             { sample:"𑾰 𑾱 𑾲 𑾳 𑾴 𑾵 𑾶 𑾷 𑾸 𑾹 𑾺 𑾻 𑾼 𑾽 𑾾 𑾿", lang:"Kirat Rai (Nepal)", dir:"LTR" },
  Lao:                   { sample:"ກ ຂ ຄ ງ ຈ ສ ຊ ຍ ດ ຕ ຖ ທ ນ ບ ປ ຜ ຝ ພ ຟ ມ ຢ ຣ ລ ວ ຫ ອ ຮ", lang:"Lao (Laos)", dir:"LTR" },
  Latin:                 { sample:"A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z", lang:"English, French, Spanish, Portuguese, German…", dir:"LTR" },
  Lepcha:                { sample:"ᰀ ᰁ ᰂ ᰃ ᰄ ᰅ ᰆ ᰇ ᰈ ᰉ ᰊ ᰋ ᰌ ᰍ ᰎ ᰏ ᰐ ᰑ ᰒ ᰓ ᰔ ᰕ ᰖ ᰗ ᰘ ᰙ ᰚ ᰛ ᰜ ᰝ ᰞ ᰟ", lang:"Lepcha (Sikkim, India)", dir:"LTR" },
  Limbu:                 { sample:"ᤀ ᤁ ᤂ ᤃ ᤄ ᤅ ᤆ ᤇ ᤈ ᤉ ᤊ ᤋ ᤌ ᤍ ᤎ ᤏ ᤐ ᤑ ᤒ ᤓ ᤔ ᤕ ᤖ ᤗ ᤘ ᤙ ᤚ ᤛ ᤜ", lang:"Limbu (Sikkim/Nepal)", dir:"LTR" },
  Linear_A:              { sample:"𐘀 𐘁 𐘂 𐘃 𐘄 𐘅 𐘆 𐘇 𐘈 𐘉 𐘊 𐘋 𐘌 𐘍 𐘎 𐘏 𐘐 𐘑 𐘒 𐘓 𐘔 𐘕 𐘖 𐘗 𐘘 𐘙", lang:"Minoan Crete (undeciphered)", dir:"LTR" },
  Linear_B:              { sample:"𐀀 𐀁 𐀂 𐀃 𐀄 𐀅 𐀆 𐀇 𐀈 𐀉 𐀊 𐀋 𐀍 𐀎 𐀏 𐀐 𐀑 𐀒 𐀓 𐀔 𐀕 𐀖 𐀗 𐀘 𐀙 𐀚 𐀛 𐀜 𐀝 𐀞 𐀟 𐀠 𐀡 𐀢 𐀣 𐀤 𐀥 𐀦 𐀨 𐀩 𐀪 𐀫 𐀬 𐀭", lang:"Mycenaean Greek", dir:"LTR" },
  Lisu:                  { sample:"ꓐ ꓑ ꓒ ꓓ ꓔ ꓕ ꓖ ꓗ ꓘ ꓙ ꓚ ꓛ ꓜ ꓝ ꓞ ꓟ ꓠ ꓡ ꓢ ꓣ ꓤ ꓥ ꓦ ꓧ ꓨ ꓩ ꓪ ꓫ ꓬ ꓭ ꓮ ꓯ ꓰ ꓱ ꓲ ꓳ ꓴ ꓵ ꓶ ꓷ ꓸ ꓹ ꓺ ꓻ ꓼ ꓽ", lang:"Lisu/Fraser (Yunnan, China/Myanmar)", dir:"LTR" },
  Lycian:                { sample:"𐊀 𐊁 𐊂 𐊃 𐊄 𐊅 𐊆 𐊇 𐊈 𐊊 𐊋 𐊌 𐊍 𐊏 𐊐 𐊑 𐊒 𐊓 𐊔 𐊕 𐊖 𐊗 𐊘 𐊙 𐊚 𐊛 𐊜", lang:"Lycian (ancient Anatolia)", dir:"LTR" },
  Lydian:                { sample:"𐤠 𐤡 𐤢 𐤣 𐤤 𐤥 𐤦 𐤧 𐤨 𐤩 𐤪 𐤫 𐤬 𐤭 𐤮 𐤯 𐤰 𐤱 𐤲 𐤳 𐤴 𐤵 𐤶 𐤷 𐤸 𐤹", lang:"Lydian (ancient Anatolia)", dir:"RTL" },
  Mahajani:              { sample:"𑅐 𑅑 𑅒 𑅓 𑅔 𑅕 𑅖 𑅗 𑅘 𑅙 𑅚 𑅛 𑅜 𑅝 𑅞 𑅟 𑅠 𑅡 𑅢 𑅣 𑅤 𑅥 𑅦 𑅧 𑅨 𑅩", lang:"Mahajani (Rajasthani traders)", dir:"LTR" },
  Makasar:               { sample:"𑻠 𑻡 𑻢 𑻣 𑻤 𑻥 𑻦 𑻧 𑻨 𑻩 𑻪 𑻫 𑻬 𑻭 𑻮 𑻯 𑻰 𑻱 𑻲 𑻳 𑻴 𑻵", lang:"Makasar (South Sulawesi)", dir:"LTR" },
  Malayalam:             { sample:"അ ആ ഇ ഈ ഉ ഊ ഋ എ ഏ ഐ ഒ ഓ ഔ ക ഖ ഗ ഘ ങ ച ഛ ജ ഝ ഞ ട ഠ ഡ ഢ ണ ത ഥ ദ ധ ന പ ഫ ബ ഭ മ യ ര ല വ ശ ഷ സ ഹ ള ഴ റ", lang:"Malayalam (Kerala, India)", dir:"LTR" },
  Mandaic:               { sample:"ࡀ ࡁ ࡂ ࡃ ࡄ ࡅ ࡆ ࡇ ࡈ ࡉ ࡊ ࡋ ࡌ ࡍ ࡎ ࡏ ࡐ ࡑ ࡒ ࡓ ࡔ ࡕ ࡖ ࡗ ࡘ", lang:"Mandaic (Mandaean gnostics)", dir:"RTL" },
  Manichaean:            { sample:"𐫀 𐫁 𐫂 𐫃 𐫄 𐫅 𐫆 𐫇 𐫈 𐫉 𐫊 𐫋 𐫌 𐫍 𐫎 𐫏 𐫐 𐫑 𐫒 𐫓 𐫔 𐫕 𐫖 𐫗 𐫘 𐫙 𐫚 𐫛", lang:"Manichaean (Silk Road)", dir:"RTL" },
  Marchen:               { sample:"𑱰 𑱱 𑱲 𑱳 𑱴 𑱵 𑱶 𑱷 𑱸 𑱹 𑱺 𑱻 𑱼 𑱽 𑱾 𑱿 𑲀 𑲁 𑲂 𑲃 𑲄 𑲅 𑲆 𑲇 𑲈 𑲉 𑲊 𑲋 𑲌", lang:"Zhang-Zhung (Tibet/Bon religion)", dir:"LTR" },
  Masaram_Gondi:         { sample:"𑴀 𑴁 𑴂 𑴃 𑴄 𑴅 𑴆 𑴇 𑴈 𑴉 𑴊 𑴋 𑴌 𑴍 𑴎 𑴏 𑴐 𑴑 𑴒 𑴓 𑴔 𑴕 𑴖 𑴗 𑴘 𑴙 𑴚 𑴛 𑴜 𑴝", lang:"Gondi (central India)", dir:"LTR" },
  Medefaidrin:           { sample:"𖹠 𖹡 𖹢 𖹣 𖹤 𖹥 𖹦 𖹧 𖹨 𖹩 𖹪 𖹫 𖹬 𖹭 𖹮 𖹯 𖹰 𖹱 𖹲 𖹳 𖹴 𖹵 𖹶 𖹷 𖹸 𖹹 𖹺 𖹻 𖹼 𖹽 𖹾 𖹿", lang:"Medefaidrin (Nigeria)", dir:"LTR" },
  Meetei_Mayek:          { sample:"ꯀ ꯁ ꯂ ꯃ ꯄ ꯅ ꯆ ꯇ ꯈ ꯉ ꯊ ꯋ ꯌ ꯍ ꯎ ꯏ ꯐ ꯑ ꯒ ꯓ ꯔ ꯕ ꯖ ꯗ ꯘ ꯙ", lang:"Meitei (Manipur, India)", dir:"LTR" },
  Mende_Kikakui:         { sample:"𞠀 𞠁 𞠂 𞠃 𞠄 𞠅 𞠆 𞠇 𞠈 𞠉 𞠊 𞠋 𞠌 𞠍 𞠎 𞠏 𞠐 𞠑 𞠒 𞠓 𞠔 𞠕 𞠖 𞠗 𞠘 𞠙 𞠚 𞠛 𞠜 𞠝 𞠞 𞠟", lang:"Mende Kikakui (Sierra Leone)", dir:"RTL" },
  Meroitic_Cursive:      { sample:"𐦠 𐦡 𐦢 𐦣 𐦤 𐦥 𐦦 𐦧 𐦨 𐦩 𐦪 𐦫 𐦬 𐦭 𐦮 𐦯 𐦰 𐦱 𐦲 𐦳 𐦴 𐦵 𐦶 𐦷 𐦸 𐦹 𐦺 𐦻 𐦼 𐦽 𐦾 𐦿", lang:"Meroitic (Nubia/Kush)", dir:"RTL" },
  Meroitic_Hieroglyphs:  { sample:"𐦀 𐦁 𐦂 𐦃 𐦄 𐦅 𐦆 𐦇 𐦈 𐦉 𐦊 𐦋 𐦌 𐦍 𐦎 𐦏 𐦐 𐦑 𐦒 𐦓 𐦔 𐦕 𐦖 𐦗 𐦘 𐦙 𐦚 𐦛 𐦜 𐦝 𐦞 𐦟", lang:"Meroitic hieroglyphs (Kush/Sudan)", dir:"RTL" },
  Miao:                  { sample:"𖼀 𖼁 𖼂 𖼃 𖼄 𖼅 𖼆 𖼇 𖼈 𖼉 𖼊 𖼋 𖼌 𖼍 𖼎 𖼏 𖼐 𖼑 𖼒 𖼓 𖼔 𖼕 𖼖 𖼗 𖼘 𖼙 𖼚 𖼛 𖼜 𖼝 𖼞 𖼟 𖼠 𖼡 𖼢 𖼣 𖼤", lang:"Miao/Pollard (Yunnan, China)", dir:"LTR" },
  Modi:                  { sample:"𑙀 𑙁 𑙂 𑙃 𑙄 𑙅 𑙆 𑙇 𑙈 𑙉 𑙊 𑙋 𑙌 𑙍 𑙎 𑙏 𑙐 𑙑 𑙒 𑙓 𑙔 𑙕 𑙖 𑙗 𑙘 𑙙 𑙚 𑙛 𑙜 𑙝 𑙞 𑙟 𑙠 𑙡", lang:"Modi (Marathi, India)", dir:"LTR" },
  Mongolian:             { sample:"ᠠ ᠡ ᠢ ᠣ ᠤ ᠥ ᠦ ᠧ ᠨ ᠩ ᠪ ᠫ ᠬ ᠭ ᠮ ᠯ ᠰ ᠱ ᠲ ᠳ ᠴ ᠵ ᠶ ᠷ ᠸ ᠹ ᠺ ᠻ ᠼ ᠽ ᠾ ᠿ", lang:"Mongolian, Inner Mongolian", dir:"TOP-BOTTOM" },
  Mro:                   { sample:"𖩀 𖩁 𖩂 𖩃 𖩄 𖩅 𖩆 𖩇 𖩈 𖩉 𖩊 𖩋 𖩌 𖩍 𖩎 𖩏 𖩐 𖩑 𖩒 𖩓 𖩔 𖩕 𖩖 𖩗 𖩘 𖩙", lang:"Mru (Bangladesh/Myanmar)", dir:"LTR" },
  Multani:               { sample:"𑊀 𑊁 𑊂 𑊃 𑊄 𑊅 𑊆 𑊇 𑊈 𑊉 𑊊 𑊋 𑊌 𑊍 𑊎 𑊏 𑊐 𑊑 𑊒 𑊓 𑊔 𑊕 𑊖 𑊗 𑊘 𑊙 𑊚 𑊛 𑊜 𑊝 𑊞 𑊟 𑊠 𑊡 𑊢 𑊣 𑊤 𑊥 𑊦 𑊧 𑊨 𑊩", lang:"Multani (Sindhi traders, Punjab)", dir:"LTR" },
  Myanmar:               { sample:"က ခ ဂ ဃ င စ ဆ ဇ ဈ ဉ ည ဋ ဌ ဍ ဎ ဏ တ ထ ဒ ဓ န ပ ဖ ဗ ဘ မ ယ ရ လ ဝ သ ဟ ဠ အ", lang:"Burmese (Myanmar)", dir:"LTR" },
  Nabataean:             { sample:"𐢀 𐢁 𐢂 𐢃 𐢄 𐢅 𐢆 𐢇 𐢈 𐢉 𐢊 𐢋 𐢌 𐢍 𐢎 𐢏 𐢐 𐢑 𐢒 𐢓 𐢔 𐢕 𐢖 𐢗 𐢘 𐢙 𐢚 𐢛", lang:"Nabataean (Petra, ancestor of Arabic)", dir:"RTL" },
  Nag_Mundari:           { sample:"𞓐 𞓑 𞓒 𞓓 𞓔 𞓕 𞓖 𞓗 𞓘 𞓙 𞓚 𞓛 𞓜 𞓝 𞓞 𞓟 𞓠 𞓡 𞓢 𞓣 𞓤 𞓥 𞓦 𞓧 𞓨 𞓩", lang:"Mundari (Jharkhand, India)", dir:"LTR" },
  Nandinagari:           { sample:"𑦠 𑦡 𑦢 𑦣 𑦤 𑦥 𑦦 𑦧 𑦨 𑦩 𑦪 𑦫 𑦬 𑦭 𑦮 𑦯 𑦰 𑦱 𑦲 𑦳 𑦴 𑦵 𑦶 𑦷 𑦸 𑦹 𑦺 𑦻 𑦼 𑦽 𑦾 𑦿", lang:"Nandinagari (Kannada variant, India)", dir:"LTR" },
  New_Tai_Lue:           { sample:"ᦀ ᦁ ᦂ ᦃ ᦄ ᦅ ᦆ ᦇ ᦈ ᦉ ᦊ ᦋ ᦌ ᦍ ᦎ ᦏ ᦐ ᦑ ᦒ ᦓ ᦔ ᦕ ᦖ ᦗ ᦘ ᦙ ᦚ ᦛ ᦜ ᦝ ᦞ ᦟ ᦠ ᦡ ᦢ ᦣ ᦤ ᦥ ᦦ ᦧ ᦨ ᦩ", lang:"Tai Lue (Yunnan/Thailand)", dir:"LTR" },
  Newa:                  { sample:"𑐀 𑐁 𑐂 𑐃 𑐄 𑐅 𑐆 𑐇 𑐈 𑐉 𑐊 𑐋 𑐌 𑐍 𑐎 𑐏 𑐐 𑐑 𑐒 𑐓 𑐔 𑐕 𑐖 𑐗 𑐘 𑐙 𑐚 𑐛 𑐜 𑐝 𑐞 𑐟 𑐠 𑐡 𑐢 𑐣 𑐤", lang:"Newa/Pracalit (Nepal Bhasa, Kathmandu)", dir:"LTR" },
  Nko:                   { sample:"ߊ ߋ ߌ ߍ ߎ ߏ ߐ ߑ ߒ ߓ ߔ ߕ ߖ ߗ ߘ ߙ ߚ ߛ ߜ ߝ ߞ ߟ ߠ ߡ ߢ ߣ ߤ ߥ ߦ ߧ ߨ ߩ ߪ", lang:"N'Ko (West Africa, Guinea)", dir:"RTL" },
  Nushu:                 { sample:"𛅰 𛅱 𛅲 𛅳 𛅴 𛅵 𛅶 𛅷 𛅸 𛅹 𛅺 𛅻 𛅼 𛅽 𛅾 𛅿 𛆀 𛆁 𛆂 𛆃 𛆄 𛆅 𛆆 𛆇 𛆈 𛆉 𛆊 𛆋 𛆌 𛆍 𛆎 𛆏", lang:"Nüshu (women's script, Hunan China)", dir:"TOP-BOTTOM" },
  Nyiakeng_Puachue_Hmong:{ sample:"𞄀 𞄁 𞄂 𞄃 𞄄 𞄅 𞄆 𞄇 𞄈 𞄉 𞄊 𞄋 𞄌 𞄍 𞄎 𞄏 𞄐 𞄑 𞄒 𞄓 𞄔 𞄕 𞄖 𞄗 𞄘 𞄙 𞄚", lang:"Nyiakeng Puachue Hmong (SE Asia)", dir:"LTR" },
  Ogham:                 { sample:"ᚁ ᚂ ᚃ ᚄ ᚅ ᚆ ᚇ ᚈ ᚉ ᚊ ᚋ ᚌ ᚍ ᚎ ᚏ ᚐ ᚑ ᚒ ᚓ ᚔ ᚕ ᚖ ᚗ ᚘ ᚙ", lang:"Ogham (ancient Ireland, Britain)", dir:"BTT" },
  Ol_Chiki:              { sample:"ᱚ ᱛ ᱜ ᱝ ᱞ ᱟ ᱠ ᱡ ᱢ ᱣ ᱤ ᱥ ᱦ ᱧ ᱨ ᱩ ᱪ ᱫ ᱬ ᱭ ᱮ ᱯ ᱰ ᱱ ᱲ ᱳ ᱴ ᱵ ᱶ ᱷ", lang:"Ol Chiki (Santali, India)", dir:"LTR" },
  Ol_Onal:               { sample:"𞾰 𞾱 𞾲 𞾳 𞾴 𞾵 𞾶 𞾷 𞾸 𞾹 𞾺 𞾻 𞾼 𞾽 𞾾 𞾿", lang:"Ol Onal (Mundari, India)", dir:"LTR" },
  Old_Hungarian:         { sample:"𐲀 𐲁 𐲂 𐲃 𐲄 𐲅 𐲆 𐲇 𐲈 𐲉 𐲊 𐲋 𐲌 𐲍 𐲎 𐲏 𐲐 𐲑 𐲒 𐲓 𐲔 𐲕 𐲖 𐲗 𐲘 𐲙 𐲚 𐲛 𐲜 𐲝 𐲞 𐲟 𐲠 𐲡 𐲢 𐲣 𐲤", lang:"Old Hungarian runic (Székely)", dir:"RTL" },
  Old_Italic:            { sample:"𐌀 𐌁 𐌂 𐌃 𐌄 𐌅 𐌆 𐌇 𐌈 𐌉 𐌊 𐌋 𐌌 𐌍 𐌎 𐌏 𐌐 𐌑 𐌒 𐌓 𐌔 𐌕 𐌖 𐌗 𐌘 𐌙 𐌚 𐌛", lang:"Etruscan, Oscan, Umbrian (Italy)", dir:"RTL" },
  Old_North_Arabian:     { sample:"𐪀 𐪁 𐪂 𐪃 𐪄 𐪅 𐪆 𐪇 𐪈 𐪉 𐪊 𐪋 𐪌 𐪍 𐪎 𐪏 𐪐 𐪑 𐪒 𐪓 𐪔 𐪕 𐪖 𐪗 𐪘 𐪙 𐪚 𐪛 𐪜", lang:"Old North Arabian (pre-Islamic Arabia)", dir:"RTL" },
  Old_Permic:            { sample:"𐍐 𐍑 𐍒 𐍓 𐍔 𐍕 𐍖 𐍗 𐍘 𐍙 𐍚 𐍛 𐍜 𐍝 𐍞 𐍟 𐍠 𐍡 𐍢 𐍣 𐍤 𐍥 𐍦 𐍧 𐍨 𐍩 𐍪 𐍫 𐍬 𐍭 𐍮 𐍯 𐍰 𐍱 𐍲 𐍳 𐍴 𐍵", lang:"Komi (Ural region, Russia)", dir:"LTR" },
  Old_Persian:           { sample:"𐎠 𐎡 𐎢 𐎣 𐎤 𐎥 𐎦 𐎧 𐎨 𐎩 𐎪 𐎫 𐎬 𐎭 𐎮 𐎯 𐎰 𐎱 𐎲 𐎳 𐎴 𐎵 𐎶 𐎷 𐎸 𐎹 𐎺 𐎻 𐎼 𐎽 𐎾 𐎿 𐏀 𐏁 𐏂 𐏃", lang:"Old Persian cuneiform (Achaemenid)", dir:"LTR" },
  Old_Sogdian:           { sample:"𐼀 𐼁 𐼂 𐼃 𐼄 𐼅 𐼆 𐼇 𐼈 𐼉 𐼊 𐼋 𐼌 𐼍 𐼎 𐼏 𐼐 𐼑 𐼒 𐼓 𐼔 𐼕 𐼖 𐼗 𐼘 𐼙 𐼚 𐼛", lang:"Old Sogdian (Central Asia, Silk Road)", dir:"RTL" },
  Old_South_Arabian:     { sample:"𐩠 𐩡 𐩢 𐩣 𐩤 𐩥 𐩦 𐩧 𐩨 𐩩 𐩪 𐩫 𐩬 𐩭 𐩮 𐩯 𐩰 𐩱 𐩲 𐩳 𐩴 𐩵 𐩶 𐩷 𐩸 𐩹 𐩺 𐩻 𐩼 𐩽 𐩾 𐩿", lang:"Old South Arabian (Saba, Himyar, Yemen)", dir:"RTL" },
  Old_Turkic:            { sample:"𐰀 𐰁 𐰂 𐰃 𐰄 𐰅 𐰆 𐰇 𐰈 𐰉 𐰊 𐰋 𐰌 𐰍 𐰎 𐰏 𐰐 𐰑 𐰒 𐰓 𐰔 𐰕 𐰖 𐰗 𐰘 𐰙 𐰚 𐰛 𐰜 𐰝 𐰞 𐰟 𐰠 𐰡 𐰢", lang:"Old Turkic runic (Orkhon inscriptions)", dir:"RTL" },
  Old_Uyghur:            { sample:"𐽰 𐽱 𐽲 𐽳 𐽴 𐽵 𐽶 𐽷 𐽸 𐽹 𐽺 𐽻 𐽼 𐽽 𐽾 𐽿 𐾀 𐾁 𐾂 𐾃 𐾄 𐾅 𐾆 𐾇 𐾈 𐾉", lang:"Old Uyghur (Central Asia, Silk Road)", dir:"TOP-BOTTOM" },
  Oriya:                 { sample:"ଅ ଆ ଇ ଈ ଉ ଊ ଋ ଏ ଐ ଓ ଔ କ ଖ ଗ ଘ ଙ ଚ ଛ ଜ ଝ ଞ ଟ ଠ ଡ ଢ ଣ ତ ଥ ଦ ଧ ନ ପ ଫ ବ ଭ ମ ଯ ର ଲ ଳ ଵ ଶ ଷ ସ ହ", lang:"Odia (Odisha, India)", dir:"LTR" },
  Osage:                 { sample:"𐒰 𐒱 𐒲 𐒳 𐒴 𐒵 𐒶 𐒷 𐒸 𐒹 𐒺 𐒻 𐒼 𐒽 𐒾 𐒿 𐓀 𐓁 𐓂 𐓃 𐓄 𐓅 𐓆 𐓇 𐓈 𐓉 𐓊 𐓋 𐓌 𐓍 𐓎 𐓏 𐓐 𐓑 𐓒 𐓓", lang:"Osage (Great Plains, USA)", dir:"LTR" },
  Osmanya:               { sample:"𐒀 𐒁 𐒂 𐒃 𐒄 𐒅 𐒆 𐒇 𐒈 𐒉 𐒊 𐒋 𐒌 𐒍 𐒎 𐒏 𐒐 𐒑 𐒒 𐒓 𐒔 𐒕 𐒖 𐒗 𐒘 𐒙 𐒚 𐒛 𐒜 𐒝", lang:"Osmanya (Somali)", dir:"LTR" },
  Pahawh_Hmong:          { sample:"𖬀 𖬁 𖬂 𖬃 𖬄 𖬅 𖬆 𖬇 𖬈 𖬉 𖬊 𖬋 𖬌 𖬍 𖬎 𖬏 𖬐 𖬑 𖬒 𖬓 𖬔 𖬕 𖬖 𖬗 𖬘 𖬙 𖬚 𖬛 𖬜 𖬝 𖬞 𖬟", lang:"Pahawh Hmong (Laos/Vietnam)", dir:"LTR" },
  Palmyrene:             { sample:"𐡠 𐡡 𐡢 𐡣 𐡤 𐡥 𐡦 𐡧 𐡨 𐡩 𐡪 𐡫 𐡬 𐡭 𐡮 𐡯 𐡰 𐡱 𐡲 𐡳 𐡴 𐡵", lang:"Palmyrene Aramaic (Palmyra, Syria)", dir:"RTL" },
  Pau_Cin_Hau:           { sample:"𑫀 𑫁 𑫂 𑫃 𑫄 𑫅 𑫆 𑫇 𑫈 𑫉 𑫊 𑫋 𑫌 𑫍 𑫎 𑫏 𑫐 𑫑 𑫒 𑫓 𑫔 𑫕 𑫖 𑫗 𑫘 𑫙 𑫚 𑫛 𑫜", lang:"Pau Cin Hau (Chin state, Myanmar)", dir:"LTR" },
  Phags_Pa:              { sample:"ꡀ ꡁ ꡂ ꡃ ꡄ ꡅ ꡆ ꡇ ꡈ ꡉ ꡊ ꡋ ꡌ ꡍ ꡎ ꡏ ꡐ ꡑ ꡒ ꡓ ꡔ ꡕ ꡖ ꡗ ꡘ ꡙ ꡚ ꡛ ꡜ ꡝ ꡞ ꡟ ꡠ ꡡ ꡢ ꡣ ꡤ ꡥ ꡦ", lang:"Phags-Pa (Mongol/Yuan dynasty China)", dir:"TOP-BOTTOM" },
  Phoenician:            { sample:"𐤀 𐤁 𐤂 𐤃 𐤄 𐤅 𐤆 𐤇 𐤈 𐤉 𐤊 𐤋 𐤌 𐤍 𐤎 𐤏 𐤐 𐤑 𐤒 𐤓 𐤔 𐤕", lang:"Phoenician (ancestor of all alphabets)", dir:"RTL" },
  Psalter_Pahlavi:       { sample:"𐮀 𐮁 𐮂 𐮃 𐮄 𐮅 𐮆 𐮇 𐮈 𐮉 𐮊 𐮋 𐮌 𐮍 𐮎 𐮏 𐮐 𐮑 𐮒 𐮓 𐮔 𐮕 𐮖 𐮗 𐮘 𐮙 𐮚 𐮛", lang:"Psalter Pahlavi (Zoroastrian)", dir:"RTL" },
  Rejang:                { sample:"ꤰ ꤱ ꤲ ꤳ ꤴ ꤵ ꤶ ꤷ ꤸ ꤹ ꤺ ꤻ ꤼ ꤽ ꤾ ꤿ ꥀ ꥁ ꥂ ꥃ ꥄ ꥅ ꥆ", lang:"Rejang (Sumatra, Indonesia)", dir:"LTR" },
  Runic:                 { sample:"ᚠ ᚡ ᚢ ᚣ ᚤ ᚥ ᚦ ᚧ ᚨ ᚩ ᚪ ᚫ ᚬ ᚭ ᚮ ᚯ ᚰ ᚱ ᚲ ᚳ ᚴ ᚵ ᚶ ᚷ ᚸ ᚹ ᚺ ᚻ ᚼ ᚽ ᚾ ᚿ ᛀ ᛁ ᛂ ᛃ ᛄ ᛅ ᛆ ᛇ ᛈ ᛉ ᛊ ᛋ ᛌ ᛍ ᛎ ᛏ ᛐ ᛑ ᛒ ᛓ ᛔ ᛕ ᛖ ᛗ ᛘ ᛙ ᛚ ᛛ ᛜ ᛝ ᛞ ᛟ", lang:"Elder Futhark Norse/Germanic runic", dir:"LTR" },
  Samaritan:             { sample:"ࠀ ࠁ ࠂ ࠃ ࠄ ࠅ ࠆ ࠇ ࠈ ࠉ ࠊ ࠋ ࠌ ࠍ ࠎ ࠏ ࠐ ࠑ ࠒ ࠓ ࠔ ࠕ", lang:"Samaritan (Nablus community)", dir:"RTL" },
  Saurashtra:            { sample:"ꢀ ꢁ ꢂ ꢃ ꢄ ꢅ ꢆ ꢇ ꢈ ꢉ ꢊ ꢋ ꢌ ꢍ ꢎ ꢏ ꢐ ꢑ ꢒ ꢓ ꢔ ꢕ ꢖ ꢗ ꢘ ꢙ ꢚ ꢛ ꢜ ꢝ ꢞ ꢟ ꢠ ꢡ ꢢ ꢣ ꢤ ꢥ ꢦ ꢧ ꢨ ꢩ", lang:"Saurashtra (Tamil Nadu, India)", dir:"LTR" },
  Sharada:               { sample:"𑆃 𑆄 𑆅 𑆆 𑆇 𑆈 𑆉 𑆊 𑆋 𑆌 𑆍 𑆎 𑆏 𑆐 𑆑 𑆒 𑆓 𑆔 𑆕 𑆖 𑆗 𑆘 𑆙 𑆚 𑆛 𑆜 𑆝 𑆞 𑆟 𑆠 𑆡 𑆢 𑆣 𑆤 𑆥 𑆦 𑆧 𑆨 𑆩 𑆪 𑆫 𑆬 𑆭 𑆮 𑆯 𑆰 𑆱 𑆲", lang:"Sharada (Kashmir Sanskrit)", dir:"LTR" },
  Shavian:               { sample:"𐑐 𐑑 𐑒 𐑓 𐑔 𐑕 𐑖 𐑗 𐑘 𐑙 𐑚 𐑛 𐑜 𐑝 𐑞 𐑟 𐑠 𐑡 𐑢 𐑣 𐑤 𐑥 𐑦 𐑧 𐑨 𐑩 𐑪 𐑫 𐑬 𐑭 𐑮 𐑯 𐑰 𐑱 𐑲 𐑳 𐑴 𐑵 𐑶 𐑷 𐑸 𐑹 𐑺 𐑻 𐑼 𐑽 𐑾 𐑿", lang:"Shavian (George Bernard Shaw phonetic)", dir:"LTR" },
  Siddham:               { sample:"𑖀 𑖁 𑖂 𑖃 𑖄 𑖅 𑖆 𑖇 𑖈 𑖉 𑖊 𑖋 𑖌 𑖍 𑖎 𑖏 𑖐 𑖑 𑖒 𑖓 𑖔 𑖕 𑖖 𑖗 𑖘 𑖙 𑖚 𑖛 𑖜 𑖝 𑖞 𑖟 𑖠 𑖡 𑖢 𑖣 𑖤 𑖥 𑖦 𑖧 𑖨 𑖩 𑖪 𑖫 𑖬 𑖭 𑖮 𑖯", lang:"Siddham (Sanskrit Buddhism, Japan)", dir:"LTR" },
  Sidetic:               { sample:"— (limited Unicode support) — ancient Pamphylia (Anatolian)", lang:"Sidetic (ancient Anatolia)", dir:"LTR" },
  SignWriting:            { sample:"𝠀 𝠁 𝠂 𝠃 𝠄 𝠅 𝠆 𝠇 𝠈 𝠉 𝠊 𝠋 𝠌 𝠍 𝠎 𝠏 𝠐 𝠑 𝠒 𝠓 𝠔 𝠕 𝠖 𝠗 𝠘 𝠙 𝠚 𝠛 𝠜 𝠝 𝠞 𝠟 𝠠 𝠡 𝠢", lang:"SignWriting (signed languages)", dir:"TOP-DOWN" },
  Sinhala:               { sample:"අ ආ ඇ ඈ ඉ ඊ උ ඌ ඍ ඎ ඏ ඐ එ ඒ ඓ ඔ ඕ ඖ ක ඛ ග ඝ ඞ ඟ ච ඡ ජ ඣ ඤ ඥ ට ඨ ඩ ඪ ණ ඬ ත ථ ද ධ න ඳ ප ඵ බ භ ම ඹ ය ර ල ව ශ ෂ ස හ ළ ෆ", lang:"Sinhala (Sri Lanka)", dir:"LTR" },
  Sogdian:               { sample:"𐼰 𐼱 𐼲 𐼳 𐼴 𐼵 𐼶 𐼷 𐼸 𐼹 𐼺 𐼻 𐼼 𐼽 𐼾 𐼿 𐽀 𐽁 𐽂 𐽃 𐽄 𐽅 𐽆 𐽇 𐽈 𐽉 𐽊 𐽋 𐽌 𐽍 𐽎 𐽏 𐽐 𐽑 𐽒 𐽓 𐽔 𐽕 𐽖 𐽗", lang:"Sogdian (Central Asia, Silk Road)", dir:"RTL" },
  Sora_Sompeng:          { sample:"𑃐 𑃑 𑃒 𑃓 𑃔 𑃕 𑃖 𑃗 𑃘 𑃙 𑃚 𑃛 𑃜 𑃝 𑃞 𑃟 𑃠 𑃡 𑃢 𑃣 𑃤 𑃥 𑃦 𑃧 𑃨 𑃩 𑃪 𑃫 𑃬 𑃭 𑃮 𑃯 𑃰 𑃱 𑃲 𑃳 𑃴", lang:"Sorang Sompeng (Sora, India)", dir:"LTR" },
  Soyombo:               { sample:"𑩐 𑩑 𑩒 𑩓 𑩔 𑩕 𑩖 𑩗 𑩘 𑩙 𑩚 𑩛 𑩜 𑩝 𑩞 𑩟 𑩠 𑩡 𑩢 𑩣 𑩤 𑩥 𑩦 𑩧 𑩨 𑩩 𑩪 𑩫 𑩬 𑩭 𑩮 𑩯", lang:"Soyombo (Mongolian Buddhism)", dir:"LTR" },
  Sundanese:             { sample:"ᮃ ᮄ ᮅ ᮆ ᮇ ᮈ ᮉ ᮊ ᮋ ᮌ ᮍ ᮎ ᮏ ᮐ ᮑ ᮒ ᮓ ᮔ ᮕ ᮖ ᮗ ᮘ ᮙ ᮚ ᮛ ᮜ ᮝ ᮞ ᮟ", lang:"Sundanese (West Java, Indonesia)", dir:"LTR" },
  Sunuwar:               { sample:"𑯰 𑯱 𑯲 𑯳 𑯴 𑯵 𑯶 𑯷 𑯸 𑯹 𑯺 𑯻 𑯼 𑯽 𑯾 𑯿 𑰀 𑰁 𑰂 𑰃 𑰄 𑰅 𑰆 𑰇", lang:"Sunuwar/Koĩts (Nepal)", dir:"LTR" },
  Syloti_Nagri:          { sample:"ꠀ ꠁ ꠂ ꠃ ꠄ ꠅ ꠇ ꠈ ꠉ ꠊ ꠋ ꠌ ꠍ ꠎ ꠏ ꠐ ꠑ ꠒ ꠓ ꠔ ꠕ ꠖ ꠗ ꠘ ꠙ ꠚ ꠛ ꠜ ꠝ ꠞ ꠟ ꠠ ꠡ ꠢ", lang:"Sylheti Nagri (Bangladesh/Assam)", dir:"LTR" },
  Syriac:                { sample:"ܐ ܒ ܓ ܕ ܗ ܘ ܙ ܚ ܛ ܝ ܟ ܠ ܡ ܢ ܣ ܥ ܦ ܨ ܩ ܪ ܫ ܬ", lang:"Syriac (Assyrian, Chaldean, Maronite)", dir:"RTL" },
  Tagalog:               { sample:"ᜀ ᜁ ᜂ ᜃ ᜄ ᜅ ᜆ ᜇ ᜈ ᜉ ᜊ ᜋ ᜌ ᜎ ᜏ ᜐ ᜑ", lang:"Tagalog/Baybayin (Philippines)", dir:"LTR" },
  Tagbanwa:              { sample:"ᝠ ᝡ ᝢ ᝣ ᝤ ᝥ ᝦ ᝧ ᝨ ᝩ ᝪ ᝫ ᝬ ᝮ ᝯ ᝰ", lang:"Tagbanwa (Palawan, Philippines)", dir:"LTR" },
  Tai_Le:                { sample:"ᥐ ᥑ ᥒ ᥓ ᥔ ᥕ ᥖ ᥗ ᥘ ᥙ ᥚ ᥛ ᥜ ᥝ ᥞ ᥟ ᥠ ᥡ ᥢ ᥣ ᥤ ᥥ ᥦ ᥧ ᥨ ᥩ ᥪ ᥫ ᥬ ᥭ", lang:"Tai Le (Yunnan, China)", dir:"LTR" },
  Tai_Tham:              { sample:"ᨣ ᨤ ᨥ ᨦ ᨧ ᨨ ᨩ ᨪ ᨫ ᨬ ᨭ ᨮ ᨯ ᨰ ᨱ ᨲ ᨳ ᨴ ᨵ ᨶ ᨷ ᨸ ᨹ ᨺ ᨻ ᨼ ᨽ ᨾ ᨿ ᩀ ᩁ ᩂ ᩃ ᩄ ᩅ ᩆ ᩇ ᩈ ᩉ ᩊ ᩋ ᩌ ᩍ ᩎ ᩏ ᩐ ᩑ ᩒ ᩓ", lang:"Tai Tham/Lanna (North Thailand)", dir:"LTR" },
  Tai_Viet:              { sample:"꺰 꺱 꺲 꺳 꺴 꺵 꺶 꺷 꺸 꺹 꺺 꺻 꺼 꺽 꺾 꺿 껀 껁 껂 껃 껄 껅 껆 껇 껈 껉 껊 껋 껌 껍 껎 껏", lang:"Tai Viet (Vietnam/Laos)", dir:"LTR" },
  Tai_Yo:                { sample:"𞊰 𞊱 𞊲 𞊳 𞊴 𞊵 𞊶 𞊷 𞊸 𞊹 𞊺 𞊻 𞊼 𞊽 𞊾 𞊿 𞋀 𞋁 𞋂 𞋃", lang:"Tai Yo (Laos)", dir:"LTR" },
  Takri:                 { sample:"𑚀 𑚁 𑚂 𑚃 𑚄 𑚅 𑚆 𑚇 𑚈 𑚉 𑚊 𑚋 𑚌 𑚍 𑚎 𑚏 𑚐 𑚑 𑚒 𑚓 𑚔 𑚕 𑚖 𑚗 𑚘 𑚙 𑚚 𑚛 𑚜 𑚝 𑚞 𑚟 𑚠", lang:"Takri (Himachal Pradesh, India)", dir:"LTR" },
  Tamil:                 { sample:"அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ க ங ச ஞ ட ண த ந ப ம ய ர ல வ ழ ள ற ன ஶ ஷ ஸ ஹ", lang:"Tamil (Tamil Nadu, Sri Lanka, Singapore)", dir:"LTR" },
  Tangsa:                { sample:"𖫿 𖬀 𖬁 𖬂 𖬃 𖬄 𖬅 𖬆 𖬇 𖬈 𖬉 𖬊 𖬋 𖬌 𖬍 𖬎 𖬏 𖬐 𖬑 𖬒 𖬓 𖬔 𖬕 𖬖 𖬗 𖬘", lang:"Tangsa (Assam/Myanmar)", dir:"LTR" },
  Tangut:                { sample:"𗀀 𗀁 𗀂 𗀃 𗀄 𗀅 𗀆 𗀇 𗀈 𗀉 𗀊 𗀋 𗀌 𗀍 𗀎 𗀏 𗀐 𗀑 𗀒 𗀓 𗀔 𗀕 𗀖 𗀗 𗀘 𗀙 𗀚 𗀛 𗀜 𗀝", lang:"Tangut (Xi Xia dynasty, China)", dir:"LTR" },
  Telugu:                { sample:"అ ఆ ఇ ఈ ఉ ఊ ఋ ఎ ఏ ఐ ఒ ఓ ఔ క ఖ గ ఘ ఙ చ ఛ జ ఝ ఞ ట ఠ డ ఢ ణ త థ ద ధ న ప ఫ బ భ మ య ర ల వ శ ష స హ", lang:"Telugu (Andhra Pradesh, India)", dir:"LTR" },
  Thaana:                { sample:"ހ ށ ނ ރ ބ ޅ ކ އ ވ މ ފ ދ ތ ލ ގ ޏ ސ ޑ ޒ ޓ ޔ ޕ ޖ ×— ޘ ޙ ޚ ޛ ޜ ޝ ޞ ޟ ޠ ޡ ޢ ޣ ޤ ޥ", lang:"Thaana (Dhivehi/Maldives)", dir:"RTL" },
  Thai:                  { sample:"ก ข ค ฆ ง จ ฉ ช ซ ฌ ญ ฎ ฏ ฐ ฑ ฒ ณ ด ต ถ ท ธ น บ ป ผ ฝ พ ฟ ภ ม ย ร ล ว ศ ษ ส ห ฬ อ ฮ", lang:"Thai", dir:"LTR" },
  Tibetan:               { sample:"ཀ ཁ ག གྷ ང ཅ ཆ ཇ ཉ ཏ ཐ ད དྷ ན པ ཕ བ བྷ མ ཙ ཚ ཛ ཛྷ ཝ ཞ ཟ འ ཡ ར ལ ཤ ཥ ས ཧ ཨ", lang:"Tibetan, Dzongkha (Bhutan)", dir:"LTR" },
  Tifinagh:              { sample:"ⴰ ⴱ ⴲ ⴳ ⴴ ⴵ ⴶ ⴷ ⴸ ⴹ ⴺ ⴻ ⴼ ⴽ ⴾ ⴿ ⵀ ⵁ ⵂ ⵃ ⵄ ⵅ ⵆ ⵇ ⵈ ⵉ ⵊ ⵋ ⵌ ⵍ ⵎ ⵏ ⵐ ⵑ ⵒ ⵓ ⵔ ⵕ ⵖ ⵗ ⵘ ⵙ ⵚ ⵛ ⵜ ⵝ ⵞ ⵟ ⵠ ⵡ ⵢ ⵣ ⵤ ⵥ ⵦ ⵧ", lang:"Tifinagh/Berber (North Africa, Tuareg)", dir:"LTR" },
  Tirhuta:               { sample:"𑒀 𑒁 𑒂 𑒃 𑒄 𑒅 𑒆 𑒇 𑒈 𑒉 𑒊 𑒋 𑒌 𑒍 𑒎 𑒏 𑒐 𑒑 𑒒 𑒓 𑒔 𑒕 𑒖 𑒗 𑒘 𑒙 𑒚 𑒛 𑒜 𑒝 𑒞 𑒟 𑒠 𑒡 𑒢 𑒣 𑒤 𑒥 𑒦 𑒧 𑒨 𑒩 𑒪 𑒫 𑒬 𑒭 𑒮 𑒯", lang:"Tirhuta (Maithili, Bihar India)", dir:"LTR" },
  Todhri:                { sample:"𐖀 𐖁 𐖂 𐖃 𐖄 𐖅 𐖆 𐖇 𐖈 𐖉 𐖊 𐖋 𐖌 𐖍 𐖎 𐖏 𐖐 𐖑 𐖒 𐖓 𐖔 𐖕 𐖖 𐖗 𐖘 𐖙 𐖚 𐖛 𐖜 𐖝 𐖞 𐖟 𐖠 𐖡 𐖢 𐖣 𐖤 𐖥 𐖦", lang:"Todhri (Albanian)", dir:"LTR" },
  Tolong_Siki:           { sample:"𑣀 𑣁 𑣂 𑣃 𑣄 𑣅 𑣆 𑣇 𑣈 𑣉 𑣊 𑣋 𑣌 𑣍 𑣎 𑣏 𑣐 𑣑 𑣒 𑣓 𑣔 𑣕 𑣖 𑣗 𑣘 𑣙 𑣚 𑣛 𑣜 𑣝 𑣞 𑣟 𑣠 𑣡 𑣢 𑣣 𑣤 𑣥 𑣦 𑣧 𑣨 𑣩", lang:"Tolong Siki (Ho, India)", dir:"LTR" },
  Toto:                  { sample:"𞊰 𞊱 𞊲 𞊳 𞊴 𞊵 𞊶 𞊷 𞊸 𞊹 𞊺 𞊻 𞊼 𞊽 𞊾 𞊿", lang:"Toto (West Bengal, India)", dir:"LTR" },
  Tulu_Tigalari:         { sample:"𑎀 𑎁 𑎂 𑎃 𑎄 𑎅 𑎆 𑎇 𑎈 𑎉 𑎊 𑎋 𑎌 𑎍 𑎎 𑎏 𑎐 𑎑 𑎒 𑎓 𑎔 𑎕 𑎖 𑎗 𑎘 𑎙 𑎚 𑎛 𑎜 𑎝 𑎞 𑎟 𑎠 𑎡 𑎢 𑎣 𑎤 𑎥 𑎦 𑎧 𑎨 𑎩 𑎪 𑎫", lang:"Tulu-Tigalari (Karnataka, India)", dir:"LTR" },
  Ugaritic:              { sample:"𐎀 𐎁 𐎂 𐎃 𐎄 𐎅 𐎆 𐎇 𐎈 𐎉 𐎊 𐎋 𐎌 𐎍 𐎎 𐎏 𐎐 𐎑 𐎒 𐎓 𐎔 𐎕 𐎖 𐎗 𐎘 𐎙 𐎚 𐎛 𐎜 𐎝", lang:"Ugaritic (ancient Syria, cuneiform abjad)", dir:"LTR" },
  Vai:                   { sample:"ꔀ ꔁ ꔂ ꔃ ꔄ ꔅ ꔆ ꔇ ꔈ ꔉ ꔊ ꔋ ꔌ ꔍ ꔎ ꔏ ꔐ ꔑ ꔒ ꔓ ꔔ ꔕ ꔖ ꔗ ꔘ ꔙ ꔚ ꔛ ꔜ ꔝ ꔞ ꔟ ꔠ ꔡ ꔢ ꔣ ꔤ ꔥ ꔦ ꔧ ꔨ ꔩ ꔪ ꔫ ꔬ ꔭ ꔮ ꔯ ꔰ ꔱ ꔲ", lang:"Vai (Liberia)", dir:"LTR" },
  Vithkuqi:              { sample:"𐕰 𐕱 𐕲 𐕳 𐕴 𐕵 𐕶 𐕷 𐕸 𐕹 𐕺 𐕻 𐕼 𐕽 𐕾 𐕿 𐖀 𐖁 𐖂 𐖃 𐖄 𐖅 𐖆 𐖇 𐖈 𐖉 𐖊 𐖋 𐖌 𐖍 𐖎 𐖏 𐖐 𐖑 𐖒 𐖓", lang:"Vithkuqi (Albanian)", dir:"LTR" },
  Wancho:                { sample:"𞋀 𞋁 𞋂 𞋃 𞋄 𞋅 𞋆 𞋇 𞋈 𞋉 𞋊 𞋋 𞋌 𞋍 𞋎 𞋏 𞋐 𞋑 𞋒 𞋓 𞋔 𞋕 𞋖 𞋗 𞋘 𞋙 𞋚 𞋛 𞋜 𞋝 𞋞 𞋟 𞋠 𞋡 𞋢", lang:"Wancho (Arunachal Pradesh, India)", dir:"LTR" },
  Warang_Citi:           { sample:"𑢠 𑢡 𑢢 𑢣 𑢤 𑢥 𑢦 𑢧 𑢨 𑢩 𑢪 𑢫 𑢬 𑢭 𑢮 𑢯 𑢰 𑢱 𑢲 𑢳 𑢴 𑢵 𑢶 𑢷 𑢸 𑢹 𑢺 𑢻 𑢼 𑢽 𑢾 𑢿 𑣀 𑣁", lang:"Warang Citi (Ho, India)", dir:"LTR" },
  Yezidi:                { sample:"𱀀 𱀁 𱀂 𱀃 𱀄 𱀅 𱀆 𱀇 𱀈 𱀉 𱀊 𱀋 𱀌 𱀍 𱀎 𱀏 𱀐 𱀑 𱀒 𱀓 𱀔 𱀕 𱀖 𱀗 𱀘 𱀙 𱀚 𱀛 𱀜", lang:"Yezidi (Kurdish minority religion)", dir:"RTL" },
  Yi:                    { sample:"ꀀ ꀁ ꀂ ꀃ ꀄ ꀅ ꀆ ꀇ ꀈ ꀉ ꀊ ꀋ ꀌ ꀍ ꀎ ꀏ ꀐ ꀑ ꀒ ꀓ ꀔ ꀕ ꀖ ꀗ ꀘ ꀙ ꀚ ꀛ ꀜ ꀝ ꀞ ꀟ ꀠ ꀡ ꀢ ꀣ ꀤ ꀥ ꀦ ꀧ ꀨ ꀩ ꀪ ꀫ ꀬ ꀭ ꀮ ꀯ ꀰ ꀱ ꀲ ꀳ ꀴ ꀵ ꀶ ꀷ ꀸ ꀹ ꀺ ꀻ ꀼ ꀽ ꀾ ꀿ", lang:"Yi (Sichuan/Yunnan, China)", dir:"LTR" },
  Zanabazar_Square:      { sample:"𑨀 𑨁 𑨂 𑨃 𑨄 𑨅 𑨆 𑨇 𑨈 𑨉 𑨊 𑨋 𑨌 𑨍 𑨎 𑨏 𑨐 𑨑 𑨒 𑨓 𑨔 𑨕 𑨖 𑨗 𑨘 𑨙 𑨚 𑨛 𑨜 𑨝 𑨞 𑨟 𑨠 𑨡 𑨢 𑨣 𑨤 𑨥 𑨦 𑨧 𑨨 𑨩 𑨪 𑨫 𑨬 𑨭 𑨮 𑨯", lang:"Zanabazar Square (Mongolia/Tibet)", dir:"LTR" },
};

export default function ScriptSelector({ onSelect }) {
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState(null);
  const scripts = (alphabetIndex && alphabetIndex.scripts) || [];

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return scripts;
    return scripts.filter(s => {
      const info = SCRIPT_SAMPLES[s];
      const search = [s, info?.lang || "", info?.dir || ""].join(" ").toLowerCase();
      return search.includes(qq);
    });
  }, [q, scripts]);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder={`Search ${scripts.length} scripts by name or language…`}
        style={{ padding:"8px 10px", borderRadius:8, border:"1px solid rgba(187,134,252,0.3)",
          background:"rgba(0,0,0,0.2)", color:"inherit", outline:"none",
          fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem" }}
      />
      <div style={{ maxHeight:300, overflowY:"auto", borderRadius:8,
        border:"1px solid rgba(187,134,252,0.1)", background:"rgba(0,0,0,0.15)" }}>
        {filtered.map(s => {
          const info = SCRIPT_SAMPLES[s] || {};
          const isOpen = expanded === s;
          return (
            <div key={s} style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
              <div
                onClick={() => { setExpanded(isOpen ? null : s); if (onSelect) onSelect(s); }}
                style={{ padding:"7px 10px", cursor:"pointer", display:"flex",
                  alignItems:"center", justifyContent:"space-between", gap:8,
                  background: isOpen ? "rgba(187,134,252,0.08)" : "transparent" }}>
                <div>
                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem",
                    color: isOpen ? "#bb86fc" : "inherit" }}>
                    {s.replace(/_/g, " ")}
                  </span>
                  {info.lang && (
                    <span style={{ fontSize:"0.62rem", opacity:0.5, marginLeft:6,
                      fontFamily:"'EB Garamond',Georgia,serif", fontStyle:"italic" }}>
                      {info.lang}
                    </span>
                  )}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  {info.dir && (
                    <span style={{ fontSize:"0.54rem", opacity:0.4,
                      fontFamily:"'Share Tech Mono',monospace",
                      border:"1px solid rgba(255,255,255,0.15)", borderRadius:3,
                      padding:"1px 4px" }}>
                      {info.dir}
                    </span>
                  )}
                  <span style={{ opacity:0.4, fontSize:"0.7rem" }}>{isOpen ? "▲" : "▼"}</span>
                </div>
              </div>
              {isOpen && info.sample && (
                <div style={{ padding:"8px 12px 10px", background:"rgba(187,134,252,0.05)",
                  borderTop:"1px solid rgba(187,134,252,0.1)" }}>
                  <div style={{ fontSize:"1.05rem", lineHeight:1.9, letterSpacing:"0.08em",
                    wordBreak:"break-all", color:"#e8e0ff", marginBottom:4 }}>
                    {info.sample}
                  </div>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem",
                    opacity:0.45 }}>
                    {info.lang} · {info.dir} · click to use in Cross-Script analysis
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ padding:12, opacity:0.5, fontSize:"0.72rem",
            fontFamily:"'Share Tech Mono',monospace" }}>
            No matches
          </div>
        )}
      </div>
    </div>
  );
}
