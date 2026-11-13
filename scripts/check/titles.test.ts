import { describe, expect, it } from "@effect/vitest";
import { normalizeCopy, redundantDescriptions } from "#scripts/check/titles";

describe("normalizeCopy", () => {
  it("folds case, accents, punctuation and whitespace", () => {
    expect(normalizeCopy("  Tempé, goreng! ")).toBe("tempegoreng");
  });
});

describe("redundantDescriptions", () => {
  it("rejects a description that only repeats its title", () => {
    const source = [
      "Intro.",
      "",
      '<Card title="Tempe" description="Tempe." />',
      "",
      '<Card title={<>Gaya <InlineMath math="F" /></>} description={<>gaya  <InlineMath math="F" />!</>} />',
    ].join("\n");

    expect(redundantDescriptions(source)).toEqual([
      "3:1 Card description repeats its title",
      "5:1 Card description repeats its title",
    ]);
  });

  it("accepts a description that adds what the title does not carry", () => {
    const source =
      '<Card title="Tempe" description="Kamu lihat kedelai berubah jadi tempe." />\n';

    expect(redundantDescriptions(source)).toEqual([]);
  });

  it("leaves elements without both attributes, or with an empty title, alone", () => {
    const source = [
      '<Card title="Tempe" />',
      "",
      '<Card description="Tempe" />',
      "",
      '<Card title="." description="." />',
      "",
      "<Card title={props.title} description={props.title} />",
      "",
      '<Card title description="Tempe" />',
    ].join("\n");

    expect(redundantDescriptions(source)).toEqual([]);
  });
});
