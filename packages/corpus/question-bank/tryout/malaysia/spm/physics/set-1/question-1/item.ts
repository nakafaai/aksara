import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Q, $$-0.12\\text{ cm}$$",
        },
        {
          correct: true,
          label: "Q, $$+0.12\\text{ cm}$$",
        },
        {
          correct: false,
          label: "P, $$+0.03\\text{ cm}$$",
        },
        {
          correct: false,
          label: "R, $$+0.29\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Q, $$-0.12\\text{ cm}$$",
        },
        {
          correct: true,
          label: "Q, $$+0.12\\text{ cm}$$",
        },
        {
          correct: false,
          label: "P, $$+0.03\\text{ cm}$$",
        },
        {
          correct: false,
          label: "R, $$+0.29\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
