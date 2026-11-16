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
          label: "$$-0.5\\text{ D}$$, $$+2.0\\text{ D}$$; $$2.0\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$-0.5\\text{ D}$$, $$+6.0\\text{ D}$$; $$15\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$+0.5\\text{ D}$$, $$-2.0\\text{ D}$$; $$40\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$-0.5\\text{ D}$$, $$+2.0\\text{ D}$$; $$40\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-0.5\\text{ D}$$, $$+2.0\\text{ D}$$; $$2.0\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$-0.5\\text{ D}$$, $$+6.0\\text{ D}$$; $$15\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$+0.5\\text{ D}$$, $$-2.0\\text{ D}$$; $$40\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$-0.5\\text{ D}$$, $$+2.0\\text{ D}$$; $$40\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
