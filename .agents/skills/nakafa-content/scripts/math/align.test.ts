import { assert, it } from "@effect/vitest";

import { findAlignedFindings } from "#nakafa-content/math/align";

/** Returns the rule ids reported for one decoded math value. */
function rules(value: string): string[] {
  return findAlignedFindings(value).map(({ rule }) => rule);
}

const SPLIT_HEAD = "split-aligned-head";
const CONJUNCTION = "conjunction-in-aligned-chain";

it("flags a relation moved inside the event or radical being evaluated", () => {
  for (const value of [
    String.raw`\begin{aligned} P(S &< 7) \\ &= \frac{6}{36}\end{aligned}`,
    String.raw`\begin{aligned} P(S &> 7) \\ &= \frac{6}{36}\end{aligned}`,
    String.raw`\begin{aligned} P(S &\ne 7) \\ &= \frac{6}{36}\end{aligned}`,
    String.raw`\begin{aligned} P(S &= 7) \\ &= \frac{6}{36}\end{aligned}`,
    String.raw`\begin{aligned} \sqrt{4 &= 2} \end{aligned}`,
    String.raw`\begin{aligned} f[x &\approx 2] \end{aligned}`,
    String.raw`\begin{aligned} P\left\{X &= 1\right\} \\ &= \frac16\end{aligned}`,
  ]) {
    assert.deepEqual(rules(value), ["nested-relation-alignment"]);
  }
});

it("keeps event relations inside complete arguments and nested environments", () => {
  for (const value of [
    String.raw`\begin{aligned} P(S=7) &= \frac{6}{36} \\ &= \frac16\end{aligned}`,
    String.raw`\begin{aligned} f(x) &= \begin{cases} x & x=1 \\ 0 & x\ne1 \end{cases}\end{aligned}`,
    String.raw`\begin{aligned} f(x) &= \left(\begin{matrix} a &= b \\ c &= d \end{matrix}\right)\end{aligned}`,
    String.raw`\begin{aligned} \text{A \& B} &= C\end{aligned}`,
    String.raw`\begin{aligned} f(x) &= \left(a+b \right)\end{aligned}`,
    String.raw`\begin{aligned} P\left\{X=1\right\} &= \frac16\end{aligned}`,
  ]) {
    assert.deepEqual(rules(value), []);
  }
});

it("flags a bare aligned head whose relation starts the next row", () => {
  assert.deepEqual(
    rules(String.raw`\begin{aligned} &x \\ &= 3 \\ &= -1 \end{aligned}`),
    [SPLIT_HEAD]
  );
  assert.deepEqual(
    rules(String.raw`\begin{aligned} &S_n \\ &= a + b \end{aligned}`),
    [SPLIT_HEAD]
  );
  assert.deepEqual(
    rules(
      String.raw`\begin{aligned} &\theta \\ &= 180^\circ - 30^\circ \end{aligned}`
    ),
    [SPLIT_HEAD]
  );
  assert.deepEqual(
    rules(String.raw`\begin{aligned} &x' \\ &= 2 - 0 \end{aligned}`),
    [SPLIT_HEAD]
  );
});

it("keeps an aligned head that already carries its own relation", () => {
  assert.deepEqual(
    rules(String.raw`\begin{aligned} x &= 3 \\ &= -1 \end{aligned}`),
    []
  );
  assert.deepEqual(
    rules(
      String.raw`\begin{aligned} &x = 3 \\ &\text{or} \\ &x = -1 \end{aligned}`
    ),
    []
  );
  assert.deepEqual(
    rules(
      String.raw`\begin{aligned} &\text{Mittelpunkt} \\ &= (1, 2) \end{aligned}`
    ),
    []
  );
});

it("keeps a head that is a complete expression", () => {
  assert.deepEqual(
    rules(
      String.raw`\begin{aligned} \chi_B(t) \\ &= \det(B - t \cdot I) \end{aligned}`
    ),
    []
  );
  assert.deepEqual(
    rules(String.raw`\begin{aligned} f(x) \\ &= x^2 + 1 \end{aligned}`),
    []
  );
  assert.deepEqual(
    rules(
      String.raw`\begin{aligned} \lvert f - g \rvert_w^2 \\ &= \int_a^b 1 \, dx \end{aligned}`
    ),
    []
  );
});

it("reads aligned rows without splitting nested environments", () => {
  assert.deepEqual(
    rules(
      String.raw`\begin{aligned} &\begin{pmatrix} a \\ b \end{pmatrix} \\ &= M \end{aligned}`
    ),
    []
  );
  assert.deepEqual(
    rules(
      String.raw`\begin{aligned} \begin{cases} a \\ b \end{cases} \end{aligned}`
    ),
    []
  );
  assert.deepEqual(
    rules(
      String.raw`\begin{aligned} &x \\ &= \begin{pmatrix} a \\ b \end{pmatrix} \end{aligned}`
    ),
    [SPLIT_HEAD]
  );
});

it("flags a conjunction that joins two equations inside one chain", () => {
  assert.deepEqual(
    rules(
      String.raw`\begin{aligned} x &= 2 \text{ oder } x \\ &= -1 \end{aligned}`
    ),
    [CONJUNCTION]
  );
  assert.deepEqual(
    rules(
      String.raw`\begin{aligned} &= 3 \text{ or } x \\ &= -1 \end{aligned}`
    ),
    [CONJUNCTION]
  );
});

it("keeps a conjunction that names an alternative or stands alone", () => {
  assert.deepEqual(
    rules(
      String.raw`\begin{aligned} \theta &= 45^\circ \text{ oder } \frac{\pi}{4} \end{aligned}`
    ),
    []
  );
  assert.deepEqual(
    rules(
      String.raw`\begin{aligned} x &= 2 \\ &\text{oder} \\ &x = -1 \end{aligned}`
    ),
    []
  );
  assert.deepEqual(
    rules(String.raw`|x| = a \Rightarrow x = a \text{ or } x = -a`),
    []
  );
});

it("keeps malformed alignment environments unreported", () => {
  assert.deepEqual(rules(String.raw`\begin{aligned} &x \\ &= 1`), []);
  assert.deepEqual(rules(String.raw`\begin{aligned}\end{aligned}`), []);
  assert.deepEqual(
    rules(String.raw`\begin{aligned} a \end{cases} \end{aligned}`),
    []
  );
  assert.deepEqual(rules(String.raw`\end{aligned} &x \\ &= 1`), []);
});
