import { describe, expect, it } from "@effect/vitest";
import { RichTextSchema } from "#contracts/assessment/inline";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState } from "#contracts/visual/catalog";
import { argumentVisuals } from "#contracts/visual/mathematics/argument";

const argument = argumentVisuals(RichTextSchema);

describe("ArgumentChainLab", () => {
  /** A card whose truth is true unless said. */
  const card = (statement: object, words: string, truth = true) => ({
    statement,
    text: words,
    truth,
  });
  const primesAreOdd = card(
    { kind: "all", predicate: "odd", subject: "prime-above-2" },
    "All prime numbers greater than 2 are odd."
  );
  const sevenIsPrime = card(
    { kind: "member", member: "7", set: "prime-above-2" },
    "7 is a prime number greater than 2."
  );
  const sevenIsOdd = card(
    { kind: "member", member: "7", set: "odd" },
    "7 is an odd number."
  );
  const lab = {
    conclusion: "open",
    description: [text("Deal a card into each open slot and test the chain.")],
    hand: [sevenIsPrime, sevenIsOdd],
    labels: {
      conclusion: "Conclusion",
      fallacies: {
        antecedent: [text("Denying the antecedent")],
        consequent: [text("Affirming the consequent")],
        middle: [text("Undistributed middle")],
      },
      form: [text("Form")],
      forms: {
        I: [text("Form I")],
        II: [text("Form II")],
        III: [text("Form III")],
      },
      hand: "Cards",
      no: [text("No")],
      premises: ["Premise 1", "Premise 2"],
      sound: [text("Sound")],
      truth: [text("Premises true")],
      unfollowed: [text("The conclusion does not follow")],
      unlinked: [text("The premises do not meet")],
      valid: [text("Valid")],
      viewLabel: "Three cards on a rail, joined by two chain links",
      yes: [text("Yes")],
    },
    premises: [primesAreOdd, "open"],
    showVerdict: true,
    title: [text("Build a form I argument")],
  };
  /** Whether the lab refuses its props with one change applied. */
  const fails = (change: object) =>
    failsStrict(argument.ArgumentChainLab.props, { ...lab, ...change });

  it("takes placed cards, open slots and a hand that fills them", () => {
    expect(decodeStrict(argument.ArgumentChainLab.props, lab)).toEqual(lab);
  });

  it("refuses no open slot, too few or too many cards, a repeated card text and a long slot name", () => {
    expect(
      fails({ conclusion: sevenIsOdd, premises: [primesAreOdd, sevenIsPrime] })
    ).toBe(true);
    expect(fails({ hand: [sevenIsPrime] })).toBe(true);
    expect(
      fails({
        hand: [
          sevenIsPrime,
          sevenIsOdd,
          card(
            { kind: "member", member: "9", set: "odd" },
            "9 is an odd number."
          ),
          card(
            { kind: "member", member: "5", set: "odd" },
            "5 is an odd number."
          ),
        ],
      })
    ).toBe(true);
    expect(
      fails({
        hand: [sevenIsPrime, { ...sevenIsOdd, text: sevenIsPrime.text }],
      })
    ).toBe(true);
    expect(
      fails({ labels: { ...lab.labels, conclusion: "The conclusion" } })
    ).toBe(true);
  });

  it("refuses a hand that deals a chain the lab cannot judge", () => {
    const sevenIsPrimeAgain = card(
      { kind: "member", member: "7", set: "prime-above-2" },
      "Seven is a prime greater than 2."
    );
    expect(fails({ hand: [sevenIsPrime, sevenIsPrimeAgain] })).toBe(true);
    const oddIsWhole = card(
      { kind: "all", predicate: "whole", subject: "odd" },
      "All odd numbers are whole numbers."
    );
    expect(fails({ hand: [oddIsWhole, sevenIsOdd] })).toBe(true);
    const rains = card(
      { kind: "claim", negated: false, statement: "rain" },
      "It is raining."
    );
    const dry = card(
      { kind: "claim", negated: true, statement: "rain" },
      "It is not raining."
    );
    expect(
      fails({
        conclusion: sevenIsOdd,
        hand: [rains, dry],
        premises: ["open", "open"],
      })
    ).toBe(true);
  });

  it("holds the verdict as answer state", () => {
    expect(answerState("ArgumentChainLab", lab)).toEqual(["showVerdict"]);
    expect(
      answerState("ArgumentChainLab", { ...lab, showVerdict: false })
    ).toEqual([]);
  });
});
