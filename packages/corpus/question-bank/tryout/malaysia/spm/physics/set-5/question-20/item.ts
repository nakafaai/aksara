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
        { correct: false, label: "$$+2.7\\text{ D}$$, and $$38\\text{ cm}$$" },
        { correct: false, label: "$$+3.0\\text{ D}$$, and $$34\\text{ cm}$$" },
        { correct: false, label: "$$+3.0\\text{ D}$$, and $$75\\text{ cm}$$" },
        { correct: true, label: "$$+3.0\\text{ D}$$, and $$36\\text{ cm}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$+2.7\\text{ D}$$, dan $$38\\text{ cm}$$" },
        { correct: false, label: "$$+3.0\\text{ D}$$, dan $$34\\text{ cm}$$" },
        { correct: false, label: "$$+3.0\\text{ D}$$, dan $$75\\text{ cm}$$" },
        { correct: true, label: "$$+3.0\\text{ D}$$, dan $$36\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
