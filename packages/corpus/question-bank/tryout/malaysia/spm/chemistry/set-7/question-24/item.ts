import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$720\\text{ cm}^3$$, from $$+5$$ to $$+2$$",
        },
        { correct: true, label: "$$480\\text{ cm}^3$$, from $$+5$$ to $$+2$$" },
        {
          correct: false,
          label: "$$480\\text{ cm}^3$$, from $$+5$$ to $$+4$$",
        },
        {
          correct: false,
          label: "$$1920\\text{ cm}^3$$, from $$+5$$ to $$+2$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$720\\text{ cm}^3$$, daripada $$+5$$ kepada $$+2$$",
        },
        {
          correct: true,
          label: "$$480\\text{ cm}^3$$, daripada $$+5$$ kepada $$+2$$",
        },
        {
          correct: false,
          label: "$$480\\text{ cm}^3$$, daripada $$+5$$ kepada $$+4$$",
        },
        {
          correct: false,
          label: "$$1920\\text{ cm}^3$$, daripada $$+5$$ kepada $$+2$$",
        },
      ],
    },
  },
};

export default item;
