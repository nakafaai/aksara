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
        { correct: false, label: "Butanoic acid, $$450\\text{ cm}^3$$" },
        {
          correct: false,
          label: "2-Methylpropanoic acid, $$600\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "2-Methylpropanoic acid, $$450\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "2-Methylpropanoic acid, $$900\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Asid butanoik, $$450\\text{ cm}^3$$" },
        {
          correct: false,
          label: "Asid 2-metilpropanoik, $$600\\text{ cm}^3$$",
        },
        { correct: true, label: "Asid 2-metilpropanoik, $$450\\text{ cm}^3$$" },
        {
          correct: false,
          label: "Asid 2-metilpropanoik, $$900\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
