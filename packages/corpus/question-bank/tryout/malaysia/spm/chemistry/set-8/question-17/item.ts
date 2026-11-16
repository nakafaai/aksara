import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Hydrochloric acid $$2.50\\text{ cm}^3$$, ethanoic acid $$250\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "Hydrochloric acid $$2.50\\text{ cm}^3$$, ethanoic acid $$2.50\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "Hydrochloric acid $$250\\text{ cm}^3$$, ethanoic acid $$2.50\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "Hydrochloric acid $$2.50\\text{ cm}^3$$, ethanoic acid $$25.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Asid hidroklorik $$2.50\\text{ cm}^3$$, asid etanoik $$250\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "Asid hidroklorik $$2.50\\text{ cm}^3$$, asid etanoik $$2.50\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "Asid hidroklorik $$250\\text{ cm}^3$$, asid etanoik $$2.50\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "Asid hidroklorik $$2.50\\text{ cm}^3$$, asid etanoik $$25.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
