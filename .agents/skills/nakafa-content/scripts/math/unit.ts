/**
 * The unit symbols that join a number inside its math, longest first so the
 * alternation never stops at a prefix. Words such as `meter`, `jam`, or
 * `hours` stay prose after the number; one-letter symbols that also name an
 * answer option or a word (`A`, `C`, `a`, `l`, `t`) are left out.
 */
const UNIT_SYMBOLS = [
  "kWh",
  "MWh",
  "mmHg",
  "cmHg",
  "Mbps",
  "kbps",
  "kcal",
  "kkal",
  "mmol",
  "kHz",
  "MHz",
  "GHz",
  "keV",
  "MeV",
  "kPa",
  "hPa",
  "MPa",
  "atm",
  "bar",
  "cal",
  "kal",
  "mol",
  "ppm",
  "rpm",
  "rad",
  "min",
  "km",
  "cm",
  "mm",
  "dm",
  "nm",
  "µm",
  "μm",
  "mL",
  "ml",
  "dL",
  "cL",
  "kL",
  "cc",
  "mg",
  "kg",
  "µg",
  "μg",
  "ms",
  "Hz",
  "kN",
  "kJ",
  "MJ",
  "Wh",
  "kW",
  "MW",
  "GW",
  "eV",
  "mV",
  "kV",
  "mA",
  "kΩ",
  "MΩ",
  "Pa",
  "dB",
  "KB",
  "kB",
  "MB",
  "GB",
  "TB",
  "ha",
  "°C",
  "°F",
  "Ω",
  "m",
  "g",
  "s",
  "h",
  "L",
  "N",
  "J",
  "W",
  "V",
  "K",
  "°",
];

/** Words that may follow a slash after a unit, such as `km/jam`. */
const RATE_WORDS = ["jam", "menit", "detik", "hari", "Stunde", "Tag"];

/** Escapes one literal for a regular expression. */
function escapeLiteral(literal: string): string {
  return literal.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

const ATOM = `(?:${UNIT_SYMBOLS.map(escapeLiteral).join("|")})`;
const POWER = "(?:[⁻]?[¹²³]|\\^-?\\d)?";
const RATE = `(?:${[...UNIT_SYMBOLS, ...RATE_WORDS].map(escapeLiteral).join("|")})`;

/**
 * A unit after a number: an optional space, one symbol with an optional
 * power, and optional `/` or `·` factors, ending where no letter or digit
 * follows, as in ` cm`, ` m/s²`, `°C`, or ` km/jam`.
 */
const UNIT_PATTERN = new RegExp(
  `^ ?${ATOM}${POWER}(?:[/·⋅]${RATE}${POWER})*(?![\\p{L}\\p{N}_])`,
  "u"
);
const GLUED_LETTER_PATTERN = /^\p{L}$/u;

/**
 * Returns the length of the unit at the start of the text after a number, or
 * 0 when no unit follows. A one-letter unit needs its space, because `1990s`
 * or `5x` glued to a number is a name, not a measurement.
 */
export function unitLength(after: string): number {
  const unit = UNIT_PATTERN.exec(after)?.[0] ?? "";
  return GLUED_LETTER_PATTERN.test(unit) ? 0 : unit.length;
}
