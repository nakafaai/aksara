import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20\\,\\mu\\text{s}$$, and $$60\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$10\\,\\mu\\text{s}$$, and $$50\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$20\\,\\mu\\text{s}$$, and $$50\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$40\\,\\mu\\text{s}$$, and $$50\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20\\,\\mu\\text{s}$$, dan $$60\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$10\\,\\mu\\text{s}$$, dan $$50\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$20\\,\\mu\\text{s}$$, dan $$50\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$40\\,\\mu\\text{s}$$, dan $$50\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
