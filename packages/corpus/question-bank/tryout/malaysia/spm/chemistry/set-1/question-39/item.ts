import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$9.18\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$2.04\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$3.06\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$6.12\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$9.18\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$2.04\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$3.06\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$6.12\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
