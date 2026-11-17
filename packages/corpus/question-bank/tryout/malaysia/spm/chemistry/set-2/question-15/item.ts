import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$32.5\\%$$, $$50.0\\text{ cm}^3$$, $$4.23\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$67.5\\%$$, $$50.0\\text{ cm}^3$$, $$4.23\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$67.5\\%$$, $$75.0\\text{ cm}^3$$, $$4.23\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$67.5\\%$$, $$50.0\\text{ cm}^3$$, $$3.38\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$32.5\\%$$, $$50.0\\text{ cm}^3$$, $$4.23\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$67.5\\%$$, $$50.0\\text{ cm}^3$$, $$4.23\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$67.5\\%$$, $$75.0\\text{ cm}^3$$, $$4.23\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$67.5\\%$$, $$50.0\\text{ cm}^3$$, $$3.38\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
