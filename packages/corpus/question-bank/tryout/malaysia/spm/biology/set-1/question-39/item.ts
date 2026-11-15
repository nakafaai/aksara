import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "ecosystem",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$900$$, $$70\\%$$",
        },
        {
          correct: true,
          label: "$$3600$$, $$70\\%$$",
        },
        {
          correct: false,
          label: "$$3600$$, $$45\\%$$",
        },
        {
          correct: false,
          label: "$$1800$$, $$70\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$900$$, $$70\\%$$",
        },
        {
          correct: true,
          label: "$$3600$$, $$70\\%$$",
        },
        {
          correct: false,
          label: "$$3600$$, $$45\\%$$",
        },
        {
          correct: false,
          label: "$$1800$$, $$70\\%$$",
        },
      ],
    },
  },
};

export default item;
