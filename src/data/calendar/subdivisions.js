export const SAMB_SUBDIVISIONS = {
  yinYang:    { sym:"࿊", name:"Yin-Yang",      days:[182], leapDays:[183], fraction:"½" },
  triangle:   { sym:"▲", name:"Triangle",       days:[121,243,365], fraction:"⅓" },
  square:     { sym:"⎕", name:"Square/Season",  days:[91,182,273,365], fraction:"¼" },
  pentagram:  { sym:"⛤", name:"Pentagram",      days:[73,146,219,292,365], fraction:"⅕" },
  hexagram:   { sym:"✡✡",name:"Hexagram",       days:[60,121,182,243,304,365], fraction:"⅙" },
  faeryStar:  { sym:"⏣", name:"Faery Star",     days:[52,104,156,208,260,312,365], fraction:"⅐",
    planets:["☽☾","♂","☿","♃","♀","♄","☉"] },
  octagram:   { sym:"۞", name:"Octagram/Bagua", days:[45,91,136,182,228,273,319,365], fraction:"⅛" },
  enneagram:  { sym:"ⵥ", name:"Enneagram",      days:[40,81,121,162,202,243,283,324,365], fraction:"⅑" },
  decagram:   { sym:"⛤⛧",name:"Decagram",       days:[36,73,109,146,182,219,255,292,328,365], fraction:"⅒" },
  undecagram: { sym:"🝪", name:"Undecagram",     days:[33,66,99,132,166,199,232,265,298,332,365], fraction:"¹⁄₁₁" },
  dodecagram: { sym:"⊛", name:"Dodecagram",     days:[30,60,91,121,152,182,212,243,273,304,334,365], fraction:"¹⁄₁₂" },
  serpentBearer:{sym:"⚕",name:"Serpent Bearer",  days:[28,56,84,112,140,168,196,225,253,281,309,337,365], fraction:"¹⁄₁₃" },
  temperance: { sym:"(14)",name:"Temperance",    days:[26,52,78,104,130,156,182,208,234,260,286,312,338,365], fraction:"¹⁄₁₄" },
  yodDevil:   { sym:"(15)",name:"יה & Devil",    days:[24,48,72,97,121,145,170,194,218,243,267,291,316,340,365], fraction:"¹⁄₁₅" },
  kalas:      { sym:"(16)",name:"Kalas",          days:[22,45,68,91,114,136,159,182,205,228,250,273,296,319,342,365], fraction:"¹⁄₁₆" },
  star:       { sym:"(17)",name:"Star",           days:[21,42,64,85,107,128,150,171,193,214,236,257,279,300,322,343,365], fraction:"¹⁄₁₇" },
  chai:       { sym:"(18)",name:"חי & Moon",      days:[20,40,60,81,101,121,141,162,182,202,223,243,263,283,304,324,344,365], fraction:"¹⁄₁₈" },
  sun19:      { sym:"(19)",name:"Sun",            days:[19,38,57,76,96,115,134,153,172,192,211,230,249,268,288,307,326,345,365], fraction:"¹⁄₁₉" },
  judgment:   { sym:"(20)",name:"Judgment",       days:[18,36,54,73,91,109,127,146,164,182,200,219,237,255,273,292,310,328,346,365], fraction:"¹⁄₂₀" },
  world:      { sym:"(21)",name:"World",          days:[17,34,52,69,86,104,121,139,156,173,191,208,225,243,260,278,295,312,330,347,365], fraction:"¹⁄₂₁" },
};

const _primeSet = new Set(); { for(let i=2;i<=366;i++){let p=true;for(let j=2;j<=Math.sqrt(i);j++)if(i%j===0){p=false;break;}if(p)_primeSet.add(i);} }
const _fibSet = new Set(); { let a=1,b=1;while(a<=366){_fibSet.add(a);[a,b]=[b,a+b];} }
const _lucSet = new Set(); { let a=2,b=1;_lucSet.add(1);while(a<=366){_lucSet.add(a);[a,b]=[a+b,a];} }
const _triSet = new Set(); { for(let n=1;n*(n+1)/2<=366;n++) _triSet.add(n*(n+1)/2); _triSet.add(1); }
const _sqSet = new Set(); { for(let n=1;n*n<=366;n++) _sqSet.add(n*n); }
const _pentSet = new Set(); { for(let n=1;;n++){const v=n*(3*n-1)/2;if(v>366)break;_pentSet.add(v);} _pentSet.add(1); }
const _cenTriSet = new Set([1,4,10,19,31,46,64,85,109,136,166,199,235,274,316,361]);
const _cenSqPentSet = new Set([1,5,13,25,41,61,85,113,145,181,221,265,313,365]);
const _rectSet = new Set([1,2,6,12,20,30,42,56,72,90,110,132,156,182,210,240,272,306,342]);
const _tetraSet = new Set([1,4,10,20,35,56,84,120,165,220,286,364]);
const _octaSet = new Set([1,6,19,44,85,146,231,344]);
const _cubicSet = new Set([1,8,27,64,125,216,343]);
const _cenCubeSet = new Set([1,9,35,91,189,341]);
const _sqPyrSet = new Set([1,5,14,30,55,91,140,204,285]);

export const NUM_SEQ_DEFS = [
  { key:"prime",   sym:"⦾", name:"Prime",              set:_primeSet },
  { key:"fib",     sym:"𝛷", name:"Fibonacci",          set:_fibSet },
  { key:"lucas",   sym:"𝝀", name:"Lucas",              set:_lucSet },
  { key:"tri",     sym:"⧌", name:"Triangular (יהוה)",  set:_triSet },
  { key:"sq",      sym:"⧅", name:"Square",             set:_sqSet },
  { key:"pent",    sym:"⬠", name:"Pentagonal",         set:_pentSet },
  { key:"cenTri",  sym:"◬", name:"Centered Triangular",set:_cenTriSet },
  { key:"cenSqP",  sym:"⍟", name:"Centered Sq/Pent",   set:_cenSqPentSet },
  { key:"rect",    sym:"⏥", name:"Rectangular",        set:_rectSet },
  { key:"tetra",   sym:"⟁", name:"Tetrahedral",        set:_tetraSet },
  { key:"octa",    sym:"⧈", name:"Octahedral",         set:_octaSet },
  { key:"cubic",   sym:"⧉", name:"Cubic",              set:_cubicSet },
  { key:"cenCube", sym:"⟐", name:"Centered Cube",      set:_cenCubeSet },
  { key:"sqPyr",   sym:"⧇", name:"Square Pyramidal",   set:_sqPyrSet },
];
