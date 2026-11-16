import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "About $$64\\text{ g}$$ from each fuel" },
        {
          correct: false,
          label: "Ethanol $$88\\text{ g}$$, octane $$352\\text{ g}$$",
        },
        {
          correct: false,
          label: "Ethanol $$32\\text{ g}$$, octane $$64\\text{ g}$$",
        },
        {
          correct: false,
          label: "Ethanol $$64\\text{ g}$$, octane $$16\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Lebih kurang $$64\\text{ g}$$ daripada setiap bahan api",
        },
        {
          correct: false,
          label: "Etanol $$88\\text{ g}$$, oktana $$352\\text{ g}$$",
        },
        {
          correct: false,
          label: "Etanol $$32\\text{ g}$$, oktana $$64\\text{ g}$$",
        },
        {
          correct: false,
          label: "Etanol $$64\\text{ g}$$, oktana $$16\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
