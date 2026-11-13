import assert from "node:assert/strict";
import type { AppLocaleCode } from "@nakafa/aksara-contracts/locale";
import { unitLength } from "#nakafa-content/math/unit";

/** The prefix, number, and suffix of one plain quantity. */
const QUANTITY_PATTERN =
  /^(?<sign>[-−])?(?<currency>Rp\.?\s?|US\$|\$|€\s?|£)?(?<number>\d+(?:[.,:/]\d+)*)(?:[-–](?<upper>\d+(?:[.,:/]\d+)*))?(?<suffix>.*)$/su;
const PERCENT_PATTERN = /^\s?%$/u;
const UNIT_PATTERN = /^ ?(?<unit>.+?)(?<power>[⁻]?[¹²³]|\^-?\d)?$/su;
const TIME_BEFORE_PATTERN =
  /(?:pukul|jam|at|um|by|until|bis|sampai|hingga)\s+$/iu;
const DOT_THOUSANDS_PATTERN = /^\d{1,3}(?:\.\d{3})+(?:,\d+)?$/u;
const DOT_PLAIN_PATTERN = /^\d+(?:,\d+)?$/u;
const COMMA_THOUSANDS_PATTERN = /^\d{1,3}(?:,\d{3})+(?:\.\d+)?$/u;
const COMMA_PLAIN_PATTERN = /^\d+(?:\.\d+)?$/u;
const FRACTION_PATTERN = /^(?<top>\d+)\/(?<bottom>\d+)$/u;
const TIME_PATTERN = /^\d{1,2}[.:]\d{2}$/u;
const RATIO_PATTERN = /^\d+:\d+$/u;

const SUPERSCRIPTS: Record<string, string> = {
  "²": "2",
  "³": "3",
  "¹": "1",
  "⁻²": "{-2}",
  "⁻³": "{-3}",
  "⁻¹": "{-1}",
};

/** The locales that write `5.000,5`; the others write `5,000.5`. */
const DECIMAL_COMMA_LOCALES = new Set<AppLocaleCode>(["de", "id"]);

/** Writes a number's separators the way the corpus writes them in math. */
function numberLatex(
  number: string,
  locale: AppLocaleCode,
  before: string
): string | undefined {
  const fraction = FRACTION_PATTERN.exec(number)?.groups;
  if (fraction) {
    return `\\frac{${fraction.top}}{${fraction.bottom}}`;
  }
  if (TIME_PATTERN.test(number) && TIME_BEFORE_PATTERN.test(before)) {
    return number.replace(":", "{:}");
  }
  if (RATIO_PATTERN.test(number)) {
    return number;
  }
  if (DECIMAL_COMMA_LOCALES.has(locale)) {
    return DOT_THOUSANDS_PATTERN.test(number) || DOT_PLAIN_PATTERN.test(number)
      ? number.replaceAll(".", "{.}").replaceAll(",", "{,}")
      : undefined;
  }
  return COMMA_THOUSANDS_PATTERN.test(number) ||
    COMMA_PLAIN_PATTERN.test(number)
    ? number.replaceAll(",", "{,}")
    : undefined;
}

/** Writes one currency prefix as math. */
function currencyLatex(currency: string): string {
  const symbol = currency.trim().replace(".", "");
  if (symbol === "$") {
    return "\\$";
  }
  if (symbol === "US$") {
    return "\\text{US}\\$";
  }
  return `\\text{${symbol}}`;
}

/** Writes one unit symbol, keeping Ω and the degree sign as math symbols. */
function unitText(unit: string): string {
  if (unit === "°") {
    return "^\\circ";
  }
  if (unit.startsWith("°")) {
    return `^\\circ\\text{${unit.slice(1)}}`;
  }
  const text = unit.replaceAll(/[·⋅]/gu, "}\\cdot\\text{");
  if (text.endsWith("Ω")) {
    const prefix = text.slice(0, -1);
    return prefix === "" ? "\\ \\Omega" : `\\text{ ${prefix}}\\Omega`;
  }
  return `\\text{ ${text}}`;
}

/** Writes the unit or percent sign after a number, or `undefined`. */
function suffixLatex(suffix: string): string | undefined {
  if (suffix === "") {
    return "";
  }
  if (PERCENT_PATTERN.test(suffix)) {
    return "\\%";
  }
  if (unitLength(suffix) !== suffix.length) {
    return;
  }
  const groups = UNIT_PATTERN.exec(suffix)?.groups;
  assert.ok(groups?.unit);
  const power = groups.power ?? "";
  const exponent = power.startsWith("^") ? power.slice(1) : SUPERSCRIPTS[power];
  return `${unitText(groups.unit)}${exponent ? `^${exponent}` : ""}`;
}

/**
 * Returns the `math` value for one plain quantity in the corpus convention
 * (`5\text{ cm}`, `\text{ m/s}^2`, `30^\circ\text{C}`, `25\%`, `2\text{-}3`,
 * `\text{Rp}5{.}000`, `2{,}5` in Indonesian and German, `5{,}000` in English
 * and Malay), or `undefined` when its separators are ambiguous in the locale
 * and a person must decide. `before` is the text before the quantity, which
 * tells a clock time from a decimal.
 */
export function quantityMath(
  raw: string,
  locale: AppLocaleCode,
  before: string
): string | undefined {
  const groups = QUANTITY_PATTERN.exec(raw)?.groups;
  if (!groups?.number) {
    return;
  }
  assert.ok(groups.suffix !== undefined);
  const lower = numberLatex(groups.number, locale, before);
  const upper = groups.upper ? numberLatex(groups.upper, locale, before) : "";
  const suffix = suffixLatex(groups.suffix);
  if (lower === undefined || upper === undefined || suffix === undefined) {
    return;
  }
  const number = groups.upper ? `${lower}\\text{-}${upper}` : lower;
  const sign = groups.sign ? "-" : "";
  const currency = groups.currency ? currencyLatex(groups.currency) : "";
  return `${sign}${currency}${number}${suffix}`;
}
