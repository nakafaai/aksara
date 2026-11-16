import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$54\\text{ g}$$ of carbon, and $$348\\text{ dm}^3$$ of carbon dioxide",
        },
        {
          correct: false,
          label:
            "$$109\\text{ g}$$ of carbon, and $$240\\text{ dm}^3$$ of carbon dioxide",
        },
        {
          correct: false,
          label:
            "$$109\\text{ g}$$ of carbon, and $$217\\text{ dm}^3$$ of carbon dioxide",
        },
        {
          correct: true,
          label:
            "$$109\\text{ g}$$ of carbon, and $$457\\text{ dm}^3$$ of carbon dioxide",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$54\\text{ g}$$ karbon, dan $$348\\text{ dm}^3$$ karbon dioksida",
        },
        {
          correct: false,
          label:
            "$$109\\text{ g}$$ karbon, dan $$240\\text{ dm}^3$$ karbon dioksida",
        },
        {
          correct: false,
          label:
            "$$109\\text{ g}$$ karbon, dan $$217\\text{ dm}^3$$ karbon dioksida",
        },
        {
          correct: true,
          label:
            "$$109\\text{ g}$$ karbon, dan $$457\\text{ dm}^3$$ karbon dioksida",
        },
      ],
    },
  },
};

export default item;
