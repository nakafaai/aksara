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
          label: "$$56\\%$$",
        },
        {
          correct: true,
          label: "$$75\\%$$",
        },
        {
          correct: false,
          label: "$$83\\%$$",
        },
        {
          correct: false,
          label: "$$62\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$56\\%$$",
        },
        {
          correct: true,
          label: "$$75\\%$$",
        },
        {
          correct: false,
          label: "$$83\\%$$",
        },
        {
          correct: false,
          label: "$$62\\%$$",
        },
      ],
    },
  },
};

export default item;
