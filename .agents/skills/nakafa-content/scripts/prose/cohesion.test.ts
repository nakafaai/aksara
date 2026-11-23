import { assert, describe, it } from "@effect/vitest";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { findCohesionFindings } from "#nakafa-content/prose/cohesion";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

/** Formats rule, tier, and line for concise assertions. */
function cohesion(source: string, locale: LessonVoiceLocale = "en"): string[] {
  return findCohesionFindings(locale, parseLessonMdx(source)).map(
    ({ blocking, line, rule }) =>
      `${rule} ${blocking ? "block" : "review"} ${line}`
  );
}

const LAB_A =
  "<VirusStructureLab title={<>Cap</>} description={<>Inspect parts.</>} footer={<>Rotate the capsid.</>} />";
const LAB_B =
  "<CellCutawayLab title={<>Cell</>} description={<>Open cell.</>} footer={<>Check the membrane.</>} />";

describe("findCohesionFindings", () => {
  it("passes cohesive sections with lead-in prose, visuals, takeaway prose, and crisp paragraphs", () => {
    const source = [
      'export const metadata = { title: "Cells", description: "Explore cell parts." };',
      "",
      "## How a cell controls entry",
      "",
      "Every cell needs nutrients inside while keeping waste out. Watch what happens when you rotate the outer shell below.",
      "",
      "<ContentStack>",
      '<BlockMath math="J = -D \\frac{dc}{dx}" />',
      LAB_A,
      "</ContentStack>",
      "",
      "Notice how small molecules slip straight through the layer while large ions wait for a channel.",
      "",
      "- Small nonpolar molecules cross directly.",
      "- Charged ions use protein gates.",
      "",
      "Now compare that outer wall with the organelles inside.",
      "",
      "<ContentBlock>",
      LAB_B,
      "</ContentBlock>",
      "",
      "The nucleus holds instructions while mitochondria release usable energy.",
    ].join("\n");

    assert.deepStrictEqual(cohesion(source, "en"), []);
  });

  it("blocks visuals missing intro prose, missing takeaway prose, and back-to-back visuals", () => {
    const noIntro = [
      "## Shell",
      "",
      LAB_A,
      "",
      "The capsid protects genetic material.",
    ].join("\n");
    assert.deepStrictEqual(cohesion(noIntro), ["visual-missing-intro block 3"]);

    const noTakeaway = [
      "## Shell",
      "",
      "Watch how the coat folds around the RNA.",
      "",
      LAB_A,
      "",
      "## Next idea",
      "",
      "Cells copy DNA before splitting.",
    ].join("\n");
    assert.deepStrictEqual(cohesion(noTakeaway), [
      "visual-missing-takeaway block 5",
    ]);

    const backToBack = [
      "## Compare structures",
      "",
      "Let's look at the two models together.",
      "",
      LAB_A,
      "",
      LAB_B,
      "",
      "Both structures control what enters and leaves.",
    ].join("\n");
    assert.deepStrictEqual(cohesion(backToBack), [
      "back-to-back-visuals block 7",
    ]);

    const atEnd = [
      "## Shell",
      "",
      "Look closely at the spike tips.",
      "",
      "<ContentBlock>",
      LAB_A,
      "</ContentBlock>",
    ].join("\n");
    assert.deepStrictEqual(cohesion(atEnd), [
      "visual-missing-takeaway block 6",
    ]);
  });

  it("blocks formulas dumped directly under a heading without plain intuition", () => {
    const source = [
      "## Frequency response",
      "",
      '<BlockMath math="|H(i\\omega)| = \\frac{1}{\\sqrt{1 + \\omega^2}}" />',
      "",
      "This ratio compares output amplitude to input amplitude.",
    ].join("\n");
    assert.deepStrictEqual(cohesion(source), ["formula-without-intro block 3"]);

    const containerMath = [
      "## Frequency response",
      "",
      "<MathContainer>",
      '<BlockMath math="y = x^2" />',
      "</MathContainer>",
      "",
      "This curve bends upward.",
    ].join("\n");
    assert.deepStrictEqual(cohesion(containerMath), [
      "formula-without-intro block 3",
    ]);
  });

  it("blocks dangling colons followed by plain prose, but allows colons before lists, formulas, or visuals", () => {
    const dangling = [
      "## Limit in economics",
      "",
      "Untuk memahami batas atas biaya, perhatikan pola berikut:",
      "",
      "Saat produksi naik terus, biaya rata-rata mendekati angka tetap.",
    ].join("\n");
    assert.deepStrictEqual(cohesion(dangling, "id"), [
      "dangling-colon block 3",
    ]);

    const beforeList = [
      "## Limit in economics",
      "",
      "Plain lead paragraph.",
      "",
      "Dua aturan ini selalu berlaku:",
      "",
      "- Biaya tetap tidak berubah.",
      "- Biaya satuan turun saat volume naik.",
    ].join("\n");
    assert.deepStrictEqual(cohesion(beforeList, "id"), []);
  });

  it("blocks unit-scaling workaround hacks across all four locales in prose and visual text", () => {
    const cases: readonly (readonly [LessonVoiceLocale, string])[] = [
      [
        "id",
        "## Tekanan darah\n\nGrafik ini menampilkan tekanan dalam satuan 2 kPa agar muat di layar.",
      ],
      [
        "id",
        '## Nilai tempat\n\nAmati grafiknya.\n\n<MathVisual title="Skala" description={<>Satu kotak tegak pada grafik bernilai 10.</>} footer={<>Lihat lonjakan batang.</>} scene={{}} />\n\nSetiap batang naik sepuluh kali lipat.',
      ],
      [
        "ms",
        "## Graf halaju\n\nGraf ini melukis bacaan dalam unit 5 supaya muat pada skrin.",
      ],
      [
        "en",
        "## Heart rate\n\nThe axis plots beats in tens of beats per minute.",
      ],
      [
        "de",
        "## Blutdruck\n\nDie Achse zeigt den Druck in Einheiten von 2 kPa.",
      ],
    ];
    for (const [locale, source] of cases) {
      const rules = cohesion(source, locale);
      assert.isTrue(
        rules.some((entry) => entry.startsWith("unit-scaling-hack block")),
        `${locale}: ${rules.join(", ")}`
      );
    }
  });

  it("blocks stiff formal textbook connectors across all four locales while ignoring quotes", () => {
    const cases: readonly (readonly [LessonVoiceLocale, string])[] = [
      ["id", "## Gaya\n\nGaya tersebut merupakan dorongan pada benda."],
      ["id", "## Gaya\n\nAdapun dua syarat gerak, yakni massa dan percepatan."],
      ["ms", "## Daya\n\nOleh yang demikian, halaju objek itu berubah."],
      [
        "en",
        "## Motion\n\nIt should be noted that velocity carries direction.",
      ],
      [
        "de",
        "## Kraft\n\nEs ist festzuhalten, dass die Masse konstant bleibt.",
      ],
    ];
    for (const [locale, source] of cases) {
      assert.isTrue(
        cohesion(source, locale).some((entry) =>
          entry.startsWith("stiff-formal-prose block")
        ),
        locale
      );
    }
    const quoted =
      '## Kutipan\n\nSumber asli menulis "hal tersebut merupakan syarat".';
    assert.deepStrictEqual(cohesion(quoted, "id"), []);
  });

  it("flags walls of text at > 60 words (review) and > 85 words (blocking)", () => {
    const sixtyFive = Array.from({ length: 65 }, () => "word").join(" ");
    const ninety = Array.from({ length: 90 }, () => "word").join(" ");

    assert.deepStrictEqual(cohesion(`## Idea\n\n${sixtyFive}.`), [
      "wall-of-text review 3",
    ]);
    assert.deepStrictEqual(cohesion(`## Idea\n\n${ninety}.`), [
      "wall-of-text block 3",
    ]);
  });

  it("handles empty trees, AgentContext, inline math, boolean visual props, support components, and code blocks cleanly", () => {
    const source = [
      "<AgentContext>Hidden note.</AgentContext>",
      "",
      "{/* comment */}",
      "",
      "## Code sample",
      "",
      'Read this loop for <InlineMath math="n" /> steps.',
      "",
      "<Callout>\n\nCheck edge cases:\n\n</Callout>",
      "",
      "<MathVisual title description={<>Scaled in tens of volts.</>} footer={<>Watch scale.</>} scene={{}} />",
      "",
      "```ts",
      "const x = 1;",
      "```",
      "",
      "The loop runs once.",
    ].join("\n");
    assert.deepStrictEqual(cohesion(source), ["unit-scaling-hack block 15"]);
    assert.deepStrictEqual(
      findCohesionFindings("en", {
        children: [
          { name: "ContentBlock", type: "mdxJsxFlowElement" },
          { type: "paragraph" },
          { name: "MathVisual", type: "mdxJsxFlowElement" },
          {
            attributes: [
              { name: "description", value: "Scaled in tens of volts." },
            ],
            name: "MathVisual",
            type: "mdxJsxFlowElement",
          },
        ],
        type: "root",
      }).map(({ line, rule }) => [line, rule]),
      [
        [1, "back-to-back-visuals"],
        [1, "visual-missing-takeaway"],
        [1, "unit-scaling-hack"],
      ]
    );
    assert.deepStrictEqual(findCohesionFindings("en", { type: "root" }), []);
  });
});
