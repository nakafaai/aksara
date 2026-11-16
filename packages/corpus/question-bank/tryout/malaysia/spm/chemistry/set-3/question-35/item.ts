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
            "$$10.2\\text{ dm}^3$$, releasing $$18.7\\text{ g}$$ of carbon dioxide",
        },
        {
          correct: false,
          label:
            "$$17.0\\text{ dm}^3$$, releasing $$31.1\\text{ g}$$ of carbon dioxide",
        },
        {
          correct: true,
          label:
            "$$28.3\\text{ dm}^3$$, releasing $$51.9\\text{ g}$$ of carbon dioxide",
        },
        {
          correct: false,
          label:
            "$$37.8\\text{ dm}^3$$, releasing $$69.2\\text{ g}$$ of carbon dioxide",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$10.2\\text{ dm}^3$$, membebaskan $$18.7\\text{ g}$$ karbon dioksida",
        },
        {
          correct: false,
          label:
            "$$17.0\\text{ dm}^3$$, membebaskan $$31.1\\text{ g}$$ karbon dioksida",
        },
        {
          correct: true,
          label:
            "$$28.3\\text{ dm}^3$$, membebaskan $$51.9\\text{ g}$$ karbon dioksida",
        },
        {
          correct: false,
          label:
            "$$37.8\\text{ dm}^3$$, membebaskan $$69.2\\text{ g}$$ karbon dioksida",
        },
      ],
    },
  },
};

export default item;
