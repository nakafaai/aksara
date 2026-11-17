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
          label: "half of it, $$8.80\\text{ g}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "half of it, $$6.60\\text{ g}$$, $$200\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "half of it, $$6.60\\text{ g}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "one third of it, $$4.40\\text{ g}$$, $$33.3\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "separuh daripadanya, $$8.80\\text{ g}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "separuh daripadanya, $$6.60\\text{ g}$$, $$200\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "separuh daripadanya, $$6.60\\text{ g}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "satu pertiga daripadanya, $$4.40\\text{ g}$$, $$33.3\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
