import { assert, it } from "@effect/vitest";

import { findGluedTextGroups } from "#nakafa-content/math/glue";

/** Returns the rule ids reported for one decoded math value. */
function rules(value: string): string[] {
  return findGluedTextGroups(value).map(({ rule }) => rule);
}

const GLUED = "glued-text-math";

it("flags a word welded to the symbol that follows it", () => {
  assert.deepEqual(rules(String.raw`\text{wenn} x`), [GLUED]);
  assert.deepEqual(rules(String.raw`\text{zu} 127`), [GLUED]);
  assert.deepEqual(rules(String.raw`\text{tr} A`), [GLUED]);
  assert.deepEqual(rules(String.raw`\text{oder} \frac{\pi}{4}`), [GLUED]);
  assert.deepEqual(rules(String.raw`\text{Wenn} \vec{a}`), [GLUED]);
  assert.deepEqual(rules(String.raw`\text{ so} d_1`), [GLUED]);
});

it("flags a word welded to the symbol before it", () => {
  assert.deepEqual(rules(String.raw`120 \text{Wege}`), [GLUED]);
  assert.deepEqual(rules(String.raw`\frac{\pi}{4} \text{Bogenmaß}`), [GLUED]);
  assert.deepEqual(rules(String.raw`45^\circ \text{oder} x`), [GLUED, GLUED]);
  assert.deepEqual(rules(String.raw`\mathbb{R}^m \text{Zielvektor}`), [GLUED]);
  assert.deepEqual(rules(String.raw`(1 \text{kg}) \text{m}^2`), [GLUED, GLUED]);
});

it("flags a unit word welded to a closing vertical bar", () => {
  assert.deepEqual(rules(String.raw`|k| \text{Einheiten}`), [GLUED]);
  assert.deepEqual(rules(String.raw`\text{Betrag} |x|`), [GLUED]);
  assert.deepEqual(rules(String.raw`|k| \text{ Einheiten}`), []);
});

it("flags a unit word welded to a closing parenthesis or bracket", () => {
  assert.deepEqual(rules(String.raw`d=(3{,}13 \pm 0{,}02)\text{cm}`), [GLUED]);
  assert.deepEqual(rules(String.raw`A=(7{,}70 \pm 0{,}08)\text{cm}^2`), [
    GLUED,
  ]);
  assert.deepEqual(rules(String.raw`[a]\text{Einheiten}`), [GLUED]);
});

it("keeps a spaced or non-word group after a closing delimiter", () => {
  assert.deepEqual(rules(String.raw`d=(3{,}13 \pm 0{,}02)\text{ cm}`), []);
  assert.deepEqual(rules(String.raw`A=(7{,}70 \pm 0{,}08)\text{ cm}^2`), []);
  assert.deepEqual(rules(String.raw`(3)\text{-}2`), []);
});

it("keeps an ordinal suffix welded to a closed value", () => {
  assert.deepEqual(rules(String.raw`(n)\text{th}`), []);
  assert.deepEqual(rules(String.raw`(3)\text{rd}`), []);
  assert.deepEqual(rules(String.raw`(4)\text{th}`), []);
  assert.deepEqual(rules(String.raw`(3)\text{2nd}`), []);
  assert.deepEqual(rules(String.raw`(3)\text{rd}, (4)\text{th}`), []);
});

it("flags both welded edges of one text group", () => {
  assert.deepEqual(rules(String.raw`0 \text{zu} 255`), [GLUED, GLUED]);
});

it("keeps a text group whose own space already renders", () => {
  assert.deepEqual(rules(String.raw`\text{wenn }x`), []);
  assert.deepEqual(rules(String.raw`5 \text{ kg}`), []);
  assert.deepEqual(rules(String.raw`12 \text{ ways}`), []);
});

it("flags the edge a half-spaced text group still welds", () => {
  assert.deepEqual(rules(String.raw`\text{ wenn}x`), []);
  assert.deepEqual(rules(String.raw`\text{ wenn} x`), [GLUED]);
  assert.deepEqual(rules(String.raw`\text{wenn }x`), []);
  assert.deepEqual(rules(String.raw`= \text{wenn }`), []);
  assert.deepEqual(rules(String.raw`x \text{wenn }`), [GLUED]);
});

it("keeps neighbours that typeset their own spacing", () => {
  assert.deepEqual(rules(String.raw`\text{Bogenlänge} \times r`), []);
  assert.deepEqual(rules(String.raw`\text{Maximum} - \text{Minimum}`), []);
  assert.deepEqual(rules(String.raw`\text{Zahl} < 3`), []);
  assert.deepEqual(rules(String.raw`\text{Reaktanten} \rightarrow X`), []);
  assert.deepEqual(rules(String.raw`\text{und} \quad U = D`), []);
  assert.deepEqual(rules(String.raw`a \text{ oder } b`), []);
  assert.deepEqual(
    rules(String.raw`\begin{aligned} \text{Segmentfläche} &= 1 \end{aligned}`),
    []
  );
});

it("keeps function application and tight currency notation", () => {
  assert.deepEqual(rules(String.raw`\text{Arg}(z)`), []);
  assert.deepEqual(rules(String.raw`\text{Rp}135{.}000{,}00`), []);
  assert.deepEqual(rules(String.raw`1\text{-}2`), []);
  assert.deepEqual(rules(String.raw`\text{Kopf},\text{Zahl}`), []);
});

it("ignores text groups without a word-like edge", () => {
  assert.deepEqual(rules(String.raw`\text{Radius:} r = 1`), []);
  assert.deepEqual(rules(String.raw`\frac{1}{2} \text{, also } 5k`), []);
  assert.deepEqual(rules(String.raw`\text{ } x`), []);
});

it("reads the atom on either side of a text group", () => {
  assert.deepEqual(rules(String.raw` \text{und} x`), [GLUED]);
  assert.deepEqual(rules(String.raw`1\ \text{und} 2`), [GLUED]);
  assert.deepEqual(rules(String.raw`\frac{a}{b} \text{und} c`), [GLUED, GLUED]);
  assert.deepEqual(rules(String.raw`\left( x \right) \text{und} y`), [
    GLUED,
    GLUED,
  ]);
  assert.deepEqual(rules(String.raw`\text{und} \left( x \right)`), []);
  assert.deepEqual(rules(String.raw`x^{2} \text{und} y`), [GLUED, GLUED]);
  assert.deepEqual(rules(String.raw`x_1 \text{und} y`), [GLUED, GLUED]);
  assert.deepEqual(rules(String.raw`\text{und} \alpha`), [GLUED]);
  assert.deepEqual(rules(String.raw`\alpha \text{und} x`), [GLUED, GLUED]);
  assert.deepEqual(rules(String.raw`\text{und} \,`), []);
  assert.deepEqual(rules(String.raw`\text{und} \;`), []);
  assert.deepEqual(rules(String.raw`a} \text{und} c`), [GLUED, GLUED]);
  assert.deepEqual(rules(String.raw`a={b} \text{und} c`), [GLUED, GLUED]);
  assert.deepEqual(
    rules(
      String.raw`1{a}{b}{c}{d}{e}{f}{g}{h}{i}{j}{k}{l}{m}{n}{o}{p}{q}{r} \text{und} z`
    ),
    [GLUED, GLUED]
  );
});

it("reads every atom shape that can neighbour a text group", () => {
  assert.deepEqual(rules(String.raw`x\text`), []);
  assert.deepEqual(rules(String.raw`x   \text{und} y`), [GLUED, GLUED]);
  assert.deepEqual(rules(String.raw`a={{b}} \text{und} c`), [GLUED, GLUED]);
  assert.deepEqual(rules(String.raw`{a} \text{und} b`), [GLUED, GLUED]);
  assert.deepEqual(rules(String.raw`[a] \text{und} b`), [GLUED, GLUED]);
  assert.deepEqual(rules(String.raw`\sqrt{a} \text{und} b`), [GLUED, GLUED]);
  assert.deepEqual(rules(String.raw`\text{und} \sqrt{a}`), [GLUED]);
  assert.deepEqual(rules(String.raw`\text{und}_{2} x`), []);
  assert.deepEqual(rules(String.raw`\text{und}^{2} x`), []);
});

it("keeps malformed text groups unreported", () => {
  assert.deepEqual(rules(String.raw`0 \text{zu 255`), []);
  assert.deepEqual(rules(String.raw`\text{a{b}} x`), []);
  assert.deepEqual(rules("\\text{und} \\"), []);
  assert.deepEqual(rules(String.raw`\text{und} `), []);
  assert.deepEqual(rules(String.raw`\text{und} \\ x`), []);
  assert.deepEqual(rules(String.raw`\text{und} \unknown{cmd}`), []);
});
