import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "quantum-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.6 \\times 10^{-34}\\text{ J s}$$, and $$2.5\\ \\mu\\text{m}$$",
        },
        {
          correct: true,
          label: "$$6.6 \\times 10^{-34}\\text{ J s}$$, and $$700\\text{ nm}$$",
        },
        {
          correct: false,
          label: "$$4.1 \\times 10^{-15}\\text{ J s}$$, and $$700\\text{ nm}$$",
        },
        {
          correct: false,
          label: "$$6.6 \\times 10^{-34}\\text{ J s}$$, and $$550\\text{ nm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.6 \\times 10^{-34}\\text{ J s}$$, dan $$2.5\\ \\mu\\text{m}$$",
        },
        {
          correct: true,
          label: "$$6.6 \\times 10^{-34}\\text{ J s}$$, dan $$700\\text{ nm}$$",
        },
        {
          correct: false,
          label: "$$4.1 \\times 10^{-15}\\text{ J s}$$, dan $$700\\text{ nm}$$",
        },
        {
          correct: false,
          label: "$$6.6 \\times 10^{-34}\\text{ J s}$$, dan $$550\\text{ nm}$$",
        },
      ],
    },
  },
};

export default item;
