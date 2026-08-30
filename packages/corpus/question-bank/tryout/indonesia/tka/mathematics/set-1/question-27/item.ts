import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  responses: {
    de: {
      categories: ["Richtig", "Falsch"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Der Punkt $(0,0)$ erfüllt alle Nebenbedingungen.",
        },
        {
          correctCategoryOrder: 1,
          label: "Der Punkt $(1,2)$ erfüllt alle Nebenbedingungen.",
        },
        {
          correctCategoryOrder: 2,
          label: "Der Punkt $(9,0)$ erfüllt alle Nebenbedingungen.",
        },
        {
          correctCategoryOrder: 2,
          label: "Der Punkt $(0,11)$ erfüllt alle Nebenbedingungen.",
        },
      ],
    },
    en: {
      categories: ["True", "False"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "The point $(0,0)$ satisfies every constraint.",
        },
        {
          correctCategoryOrder: 1,
          label: "The point $(1,2)$ satisfies every constraint.",
        },
        {
          correctCategoryOrder: 2,
          label: "The point $(9,0)$ satisfies every constraint.",
        },
        {
          correctCategoryOrder: 2,
          label: "The point $(0,11)$ satisfies every constraint.",
        },
      ],
    },
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Titik $(0,0)$ memenuhi semua kendala.",
        },
        {
          correctCategoryOrder: 1,
          label: "Titik $(1,2)$ memenuhi semua kendala.",
        },
        {
          correctCategoryOrder: 2,
          label: "Titik $(9,0)$ memenuhi semua kendala.",
        },
        {
          correctCategoryOrder: 2,
          label: "Titik $(0,11)$ memenuhi semua kendala.",
        },
      ],
    },
  },
};

export default item;
