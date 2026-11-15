import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "It rises by $$4.0\\text{ cm}$$",
        },
        {
          correct: false,
          label: "It falls by $$4.0\\text{ cm}$$",
        },
        {
          correct: false,
          label: "It falls by $$2.0\\text{ cm}$$",
        },
        {
          correct: true,
          label: "It rises by $$2.0\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Naik sejauh $$4.0\\text{ cm}$$",
        },
        {
          correct: false,
          label: "Turun sejauh $$4.0\\text{ cm}$$",
        },
        {
          correct: false,
          label: "Turun sejauh $$2.0\\text{ cm}$$",
        },
        {
          correct: true,
          label: "Naik sejauh $$2.0\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
