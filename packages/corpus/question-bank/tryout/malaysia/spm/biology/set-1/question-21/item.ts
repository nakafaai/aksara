import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "plant-tissue-organisation-and-growth",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Day $$9$$ to day $$12$$, $$0.020\\text{ g}$$",
        },
        {
          correct: false,
          label: "Day $$6$$ to day $$9$$, $$0.20\\text{ g}$$",
        },
        {
          correct: true,
          label: "Day $$6$$ to day $$9$$, $$0.020\\text{ g}$$",
        },
        {
          correct: false,
          label: "Day $$6$$ to day $$9$$, $$0.060\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Hari ke-$$9$$ hingga hari ke-$$12$$, $$0.020\\text{ g}$$",
        },
        {
          correct: false,
          label: "Hari ke-$$6$$ hingga hari ke-$$9$$, $$0.20\\text{ g}$$",
        },
        {
          correct: true,
          label: "Hari ke-$$6$$ hingga hari ke-$$9$$, $$0.020\\text{ g}$$",
        },
        {
          correct: false,
          label: "Hari ke-$$6$$ hingga hari ke-$$9$$, $$0.060\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
