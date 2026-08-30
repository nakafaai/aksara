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
          label: "Der Punkt $(3,2)$ erfüllt alle Nebenbedingungen.",
        },
        {
          correctCategoryOrder: 2,
          label: "Der Punkt $(11,0)$ erfüllt alle Nebenbedingungen.",
        },
        {
          correctCategoryOrder: 2,
          label: "Der Punkt $(0,13)$ erfüllt alle Nebenbedingungen.",
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
          label: "The point $(3,2)$ satisfies every constraint.",
        },
        {
          correctCategoryOrder: 2,
          label: "The point $(11,0)$ satisfies every constraint.",
        },
        {
          correctCategoryOrder: 2,
          label: "The point $(0,13)$ satisfies every constraint.",
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
          label: "Titik $(3,2)$ memenuhi semua kendala.",
        },
        {
          correctCategoryOrder: 2,
          label: "Titik $(11,0)$ memenuhi semua kendala.",
        },
        {
          correctCategoryOrder: 2,
          label: "Titik $(0,13)$ memenuhi semua kendala.",
        },
      ],
    },
  },
};

export default item;
