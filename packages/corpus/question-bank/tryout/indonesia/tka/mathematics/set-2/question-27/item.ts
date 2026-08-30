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
          label: "Der Punkt $(2,2)$ erfüllt alle Nebenbedingungen.",
        },
        {
          correctCategoryOrder: 2,
          label: "Der Punkt $(10,0)$ erfüllt alle Nebenbedingungen.",
        },
        {
          correctCategoryOrder: 2,
          label: "Der Punkt $(0,12)$ erfüllt alle Nebenbedingungen.",
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
          label: "The point $(2,2)$ satisfies every constraint.",
        },
        {
          correctCategoryOrder: 2,
          label: "The point $(10,0)$ satisfies every constraint.",
        },
        {
          correctCategoryOrder: 2,
          label: "The point $(0,12)$ satisfies every constraint.",
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
          label: "Titik $(2,2)$ memenuhi semua kendala.",
        },
        {
          correctCategoryOrder: 2,
          label: "Titik $(10,0)$ memenuhi semua kendala.",
        },
        {
          correctCategoryOrder: 2,
          label: "Titik $(0,12)$ memenuhi semua kendala.",
        },
      ],
    },
  },
};

export default item;
