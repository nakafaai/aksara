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
            "$$5.03\\times10^{-34}\\text{ J s}$$, $$1.26\\text{ eV}$$ and $$750\\text{ nm}$$",
        },
        {
          correct: true,
          label:
            "$$6.61\\times10^{-34}\\text{ J s}$$, $$2.00\\text{ eV}$$ and $$620\\text{ nm}$$",
        },
        {
          correct: false,
          label:
            "$$6.61\\times10^{-34}\\text{ J s}$$, $$2.00\\text{ eV}$$ and $$577\\text{ nm}$$",
        },
        {
          correct: false,
          label:
            "$$6.61\\times10^{-34}\\text{ J s}$$, $$4.20\\text{ eV}$$ and $$295\\text{ nm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$5.03\\times10^{-34}\\text{ J s}$$, $$1.26\\text{ eV}$$ dan $$750\\text{ nm}$$",
        },
        {
          correct: true,
          label:
            "$$6.61\\times10^{-34}\\text{ J s}$$, $$2.00\\text{ eV}$$ dan $$620\\text{ nm}$$",
        },
        {
          correct: false,
          label:
            "$$6.61\\times10^{-34}\\text{ J s}$$, $$2.00\\text{ eV}$$ dan $$577\\text{ nm}$$",
        },
        {
          correct: false,
          label:
            "$$6.61\\times10^{-34}\\text{ J s}$$, $$4.20\\text{ eV}$$ dan $$295\\text{ nm}$$",
        },
      ],
    },
  },
};

export default item;
