import { describe, expect, it } from "@effect/vitest";
import { Array as Arr } from "effect";
import { RichTextSchema } from "#contracts/assessment/inline";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState } from "#contracts/visual/catalog";
import { counterexampleVisuals } from "#contracts/visual/mathematics/counterexample";

const counterexample = counterexampleVisuals(RichTextSchema);

describe("CounterexampleGridLab", () => {
  /** A number tile named by its value. */
  const tile = (value: number) => ({
    name: String(value),
    tile: { kind: "number", value },
  });
  const odd = { name: "Odd number", test: { kind: "odd" } };
  const prime = { name: "Prime number", test: { kind: "prime" } };
  const lab = {
    claims: [
      {
        claim: { kind: "all", predicate: prime, subject: odd },
        name: "All",
        text: "All odd numbers here are prime",
      },
      {
        claim: { kind: "some", predicate: prime, subject: odd },
        name: "Some",
        text: "Some odd numbers here are prime",
      },
      {
        claim: {
          kind: "if",
          p: { name: "More than 4", test: { kind: "above", than: 4 } },
          q: prime,
        },
        name: "If",
        text: "If a number here is more than 4, then it is prime",
      },
    ],
    description: [text("Check the tiles one at a time against the claim.")],
    labels: {
      claim: [text("The claim")],
      claims: "Claim",
      false: "False",
      none: [text("None picked")],
      picked: [text("Picked tile")],
      tile: "Tile",
      true: "True",
      verdicts: {
        breaks: [text("Counterexample")],
        fits: [text("Fits")],
        misses: [text("Not an example")],
        outside: [text("Outside the claim")],
        proves: [text("Example")],
        safe: [text("Condition false")],
      },
      viewLabel: "Number tiles in a grid behind a claim card",
    },
    showAnswer: true,
    tiles: [tile(3), tile(5), tile(7), tile(9), tile(11)],
    title: [text("One tile can settle a claim")],
  };
  /** Whether the lab refuses its props with one change applied. */
  const fails = (change: object) =>
    failsStrict(counterexample.CounterexampleGridLab.props, {
      ...lab,
      ...change,
    });

  it("takes number tiles and claims about all, some and an implication", () => {
    expect(
      decodeStrict(counterexample.CounterexampleGridLab.props, lab)
    ).toEqual(lab);
  });

  it("takes shape tiles with claims that read their shape and color", () => {
    const shapes = {
      claims: [
        {
          claim: {
            kind: "if",
            p: { name: "Square", test: { kind: "shape", shape: "square" } },
            q: { name: "Red", test: { color: "red", kind: "color" } },
          },
          name: "If",
          text: "If a shape is a square, then it is red",
        },
      ],
      tiles: [
        {
          name: "red square",
          tile: { color: "red", kind: "shape", shape: "square" },
        },
        {
          name: "blue circle",
          tile: { color: "blue", kind: "shape", shape: "circle" },
        },
      ],
    };
    expect(
      decodeStrict(counterexample.CounterexampleGridLab.props, {
        ...lab,
        ...shapes,
      })
    ).toEqual({ ...lab, ...shapes });
  });

  it("refuses mixed tiles, a test of the other kind of tile and a number too wide to print", () => {
    expect(
      fails({
        tiles: [
          tile(3),
          {
            name: "red square",
            tile: { color: "red", kind: "shape", shape: "square" },
          },
        ],
      })
    ).toBe(true);
    expect(
      fails({
        claims: [
          {
            claim: {
              kind: "all",
              predicate: { name: "Red", test: { color: "red", kind: "color" } },
            },
            name: "All",
            text: "All tiles here are red",
          },
        ],
      })
    ).toBe(true);
    expect(fails({ tiles: [tile(10_000)] })).toBe(true);
    expect(fails({ tiles: [tile(-1000)] })).toBe(true);
  });

  it("refuses more tiles or claims than fit, a repeated claim name and a claim too long for its card", () => {
    expect(fails({ tiles: Arr.map(Arr.range(1, 21), tile) })).toBe(true);
    const [first] = lab.claims;
    expect(fails({ claims: [first, first] })).toBe(true);
    expect(
      fails({
        claims: [...lab.claims, { ...first, name: "Every" }],
      })
    ).toBe(true);
    expect(fails({ claims: [{ ...first, text: "a".repeat(91) }] })).toBe(true);
  });

  it("holds the verdicts and the stamp as answer state", () => {
    expect(answerState("CounterexampleGridLab", lab)).toEqual(["showAnswer"]);
    expect(
      answerState("CounterexampleGridLab", { ...lab, showAnswer: false })
    ).toEqual([]);
  });
});
