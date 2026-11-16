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
        { correct: false, label: "Butanoic acid, $$75.0\\text{ cm}^3$$" },
        {
          correct: false,
          label: "2-methylpropanoic acid, $$100\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "2-methylpropanoic acid, $$75.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "2-methylpropanoic acid, $$37.5\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Asid butanoik, $$75.0\\text{ cm}^3$$" },
        {
          correct: false,
          label: "Asid 2-metilpropanoik, $$100\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "Asid 2-metilpropanoik, $$75.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "Asid 2-metilpropanoik, $$37.5\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
