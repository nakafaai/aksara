import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  responses: {
    de: {
      categories: [
        [{ kind: "text", text: "Richtig" }],
        [{ kind: "text", text: "Falsch" }],
      ],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "Der Punkt " },
            { display: "inline", kind: "math", math: "(0,0)" },
            { kind: "text", text: " erfüllt alle Nebenbedingungen." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "Der Punkt " },
            { display: "inline", kind: "math", math: "(1,2)" },
            { kind: "text", text: " erfüllt alle Nebenbedingungen." },
          ],
        },
        {
          correctCategoryOrder: 2,
          label: [
            { kind: "text", text: "Der Punkt " },
            { display: "inline", kind: "math", math: "(9,0)" },
            { kind: "text", text: " erfüllt alle Nebenbedingungen." },
          ],
        },
        {
          correctCategoryOrder: 2,
          label: [
            { kind: "text", text: "Der Punkt " },
            { display: "inline", kind: "math", math: "(0,11)" },
            { kind: "text", text: " erfüllt alle Nebenbedingungen." },
          ],
        },
      ],
    },
    en: {
      categories: [
        [{ kind: "text", text: "True" }],
        [{ kind: "text", text: "False" }],
      ],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "The point " },
            { display: "inline", kind: "math", math: "(0,0)" },
            { kind: "text", text: " satisfies every constraint." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "The point " },
            { display: "inline", kind: "math", math: "(1,2)" },
            { kind: "text", text: " satisfies every constraint." },
          ],
        },
        {
          correctCategoryOrder: 2,
          label: [
            { kind: "text", text: "The point " },
            { display: "inline", kind: "math", math: "(9,0)" },
            { kind: "text", text: " satisfies every constraint." },
          ],
        },
        {
          correctCategoryOrder: 2,
          label: [
            { kind: "text", text: "The point " },
            { display: "inline", kind: "math", math: "(0,11)" },
            { kind: "text", text: " satisfies every constraint." },
          ],
        },
      ],
    },
    id: {
      categories: [
        [{ kind: "text", text: "Benar" }],
        [{ kind: "text", text: "Salah" }],
      ],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "Titik " },
            { display: "inline", kind: "math", math: "(0,0)" },
            { kind: "text", text: " memenuhi semua kendala." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "Titik " },
            { display: "inline", kind: "math", math: "(1,2)" },
            { kind: "text", text: " memenuhi semua kendala." },
          ],
        },
        {
          correctCategoryOrder: 2,
          label: [
            { kind: "text", text: "Titik " },
            { display: "inline", kind: "math", math: "(9,0)" },
            { kind: "text", text: " memenuhi semua kendala." },
          ],
        },
        {
          correctCategoryOrder: 2,
          label: [
            { kind: "text", text: "Titik " },
            { display: "inline", kind: "math", math: "(0,11)" },
            { kind: "text", text: " memenuhi semua kendala." },
          ],
        },
      ],
    },
  },
};

export default item;
