import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "environmental-sustainability",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6.5\\text{ mg dm}^{-3}$$, moderately polluted",
        },
        {
          correct: false,
          label: "$$5.0\\text{ mg dm}^{-3}$$, moderately polluted",
        },
        {
          correct: true,
          label: "$$13\\text{ mg dm}^{-3}$$, heavily polluted",
        },
        {
          correct: false,
          label: "$$23\\text{ mg dm}^{-3}$$, heavily polluted",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6.5\\text{ mg dm}^{-3}$$, tercemar sederhana",
        },
        {
          correct: false,
          label: "$$5.0\\text{ mg dm}^{-3}$$, tercemar sederhana",
        },
        {
          correct: true,
          label: "$$13\\text{ mg dm}^{-3}$$, sangat tercemar",
        },
        {
          correct: false,
          label: "$$23\\text{ mg dm}^{-3}$$, sangat tercemar",
        },
      ],
    },
  },
};

export default item;
