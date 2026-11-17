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
          correct: false,
          label: "$$26.4\\%$$, $$180\\text{ cm}^3$$, $$3.82\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$61.6\\%$$, $$840\\text{ cm}^3$$, $$3.95\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$61.6\\%$$, $$420\\text{ cm}^3$$, $$3.95\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$61.6\\%$$, $$420\\text{ cm}^3$$, $$2.51\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$26.4\\%$$, $$180\\text{ cm}^3$$, $$3.82\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$61.6\\%$$, $$840\\text{ cm}^3$$, $$3.95\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$61.6\\%$$, $$420\\text{ cm}^3$$, $$3.95\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$61.6\\%$$, $$420\\text{ cm}^3$$, $$2.51\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
