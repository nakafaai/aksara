import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$4.0\\text{ D}$$, and glasses of $$+3.0\\text{ D}$$",
        },
        {
          correct: false,
          label: "$$54\\text{ D}$$, and glasses of $$+4.0\\text{ D}$$",
        },
        {
          correct: false,
          label: "$$4.0\\text{ D}$$, and glasses of $$+1.0\\text{ D}$$",
        },
        {
          correct: false,
          label: "$$1.0\\text{ D}$$, and glasses of $$+4.0\\text{ D}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$4.0\\text{ D}$$, dan cermin mata $$+3.0\\text{ D}$$",
        },
        {
          correct: false,
          label: "$$54\\text{ D}$$, dan cermin mata $$+4.0\\text{ D}$$",
        },
        {
          correct: false,
          label: "$$4.0\\text{ D}$$, dan cermin mata $$+1.0\\text{ D}$$",
        },
        {
          correct: false,
          label: "$$1.0\\text{ D}$$, dan cermin mata $$+4.0\\text{ D}$$",
        },
      ],
    },
  },
};

export default item;
