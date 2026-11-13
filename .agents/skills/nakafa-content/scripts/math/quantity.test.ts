import { assert, it } from "@effect/vitest";
import { quantityMath } from "#nakafa-content/math/quantity";

it("writes Indonesian and German separators as braced dots and commas", () => {
  assert.equal(quantityMath("5.000.000", "id", ""), "5{.}000{.}000");
  assert.equal(quantityMath("2,5", "id", ""), "2{,}5");
  assert.equal(quantityMath("1.250,75", "de", ""), "1{.}250{,}75");
  assert.equal(quantityMath("31", "de", ""), "31");
});

it("writes English and Malay separators as a braced comma and a point", () => {
  assert.equal(quantityMath("1,250.5", "en", ""), "1{,}250.5");
  assert.equal(quantityMath("0.25", "ms", ""), "0.25");
});

it("leaves a number whose separators the locale cannot read", () => {
  assert.equal(quantityMath("3.5", "id", ""), undefined);
  assert.equal(quantityMath("3,5", "en", ""), undefined);
  assert.equal(quantityMath("1.2.3", "en", ""), undefined);
  assert.equal(quantityMath("cm", "en", ""), undefined);
  assert.equal(quantityMath("5 apples", "en", ""), undefined);
});

it("writes fractions, clock times, and ratios", () => {
  assert.equal(quantityMath("1/2", "id", ""), "\\frac{1}{2}");
  assert.equal(quantityMath("07.30", "id", "berangkat pukul "), "07.30");
  assert.equal(quantityMath("10:30", "en", "at "), "10{:}30");
  assert.equal(quantityMath("2:3", "en", "in the ratio "), "2:3");
  assert.equal(quantityMath("07.30", "id", "nilai "), undefined);
});

it("writes signs, currencies, and percent signs", () => {
  assert.equal(quantityMath("-5", "en", ""), "-5");
  assert.equal(quantityMath("−3", "en", ""), "-3");
  assert.equal(quantityMath("Rp5.000,00", "id", ""), "\\text{Rp}5{.}000{,}00");
  assert.equal(quantityMath("Rp. 300", "id", ""), "\\text{Rp}300");
  assert.equal(quantityMath("$1,250", "en", ""), "\\$1{,}250");
  assert.equal(quantityMath("US$4", "en", ""), "\\text{US}\\$4");
  assert.equal(quantityMath("€ 3", "de", ""), "\\text{€}3");
  assert.equal(quantityMath("12,5%", "id", ""), "12{,}5\\%");
  assert.equal(quantityMath("25 %", "de", ""), "25\\%");
});

it("writes units in text with their powers, degrees, ohms, and products", () => {
  assert.equal(quantityMath("2.500 kg", "id", ""), "2{.}500\\text{ kg}");
  assert.equal(quantityMath("5cm", "en", ""), "5\\text{ cm}");
  assert.equal(quantityMath("25 cm²", "id", ""), "25\\text{ cm}^2");
  assert.equal(quantityMath("9,8 m/s²", "id", ""), "9{,}8\\text{ m/s}^2");
  assert.equal(quantityMath("4 m^3", "en", ""), "4\\text{ m}^3");
  assert.equal(quantityMath("2 s⁻¹", "en", ""), "2\\text{ s}^{-1}");
  assert.equal(quantityMath("30°", "id", ""), "30^\\circ");
  assert.equal(quantityMath("-5 °C", "id", ""), "-5^\\circ\\text{C}");
  assert.equal(quantityMath("10 kΩ", "en", ""), "10\\text{ k}\\Omega");
  assert.equal(quantityMath("8 Ω", "en", ""), "8\\ \\Omega");
  assert.equal(quantityMath("5 N·m", "en", ""), "5\\text{ N}\\cdot\\text{m}");
  assert.equal(quantityMath("72 km/jam", "id", ""), "72\\text{ km/jam}");
});
