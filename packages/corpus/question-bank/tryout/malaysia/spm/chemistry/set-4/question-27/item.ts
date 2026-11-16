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
        {
          correct: false,
          label:
            "X is ethane, $$4.8\\text{ dm}^3$$ of it forms, and it does not react with bromine",
        },
        {
          correct: false,
          label:
            "X is ethene, $$2.4\\text{ dm}^3$$ of it forms, and it decolourises $$16\\text{ g}$$ of bromine",
        },
        {
          correct: false,
          label:
            "X is ethene, $$4.8\\text{ dm}^3$$ of it forms, and it decolourises $$16\\text{ g}$$ of bromine",
        },
        {
          correct: true,
          label:
            "X is ethene, $$4.8\\text{ dm}^3$$ of it forms, and it decolourises $$32\\text{ g}$$ of bromine",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "X ialah etana, $$4.8\\text{ dm}^3$$ terbentuk, dan ia tidak bertindak balas dengan bromin",
        },
        {
          correct: false,
          label:
            "X ialah etena, $$2.4\\text{ dm}^3$$ terbentuk, dan ia menyahwarnakan $$16\\text{ g}$$ bromin",
        },
        {
          correct: false,
          label:
            "X ialah etena, $$4.8\\text{ dm}^3$$ terbentuk, dan ia menyahwarnakan $$16\\text{ g}$$ bromin",
        },
        {
          correct: true,
          label:
            "X ialah etena, $$4.8\\text{ dm}^3$$ terbentuk, dan ia menyahwarnakan $$32\\text{ g}$$ bromin",
        },
      ],
    },
  },
};

export default item;
